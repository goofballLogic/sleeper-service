/* global fetch */

import Provider from "./provider";
import Data from "./store/Data";
import config from "../config";
import { log, logError } from "../diagnostics";
import projects from "./GoogleProjects";

const { appName } = config;
const storageVerifications = new WeakMap();
const projectsVerifications = new WeakMap();
const cachedVerification = ( owner, verifications, verify ) =>
    verifications.get( owner ) ||
    verifications.set( owner, verify() ).get( owner );

const testNamePrefix = `__test_${appName}`;
const sameItems = ( as, bs ) => as.length === bs.length && as.every( x => ~bs.indexOf( x ) );
const sameJSON = ( a, b ) => JSON.stringify( a ) === JSON.stringify( b );
const suffix = ( x, suffixes ) => suffixes.map( p => `${x}__${p}` );

function expect409Error( err ) {

    if ( err.code !== 409 ) {

        throw new Error( `Expected a 409 rejection of non-overwrite request, but got ${err}` );

    }

}

function promiseAllTruthy( promises ) {

    return Promise.all( promises.map( p => p.catch( logError ) ) ).then( ( results ) => {

        const fails = results.map( ( x, i ) => {

            if ( x ) return null;
            return promises[ i ];

        } ).filter( x => x );
        return fails.length ? Promise.reject( fails ) : Promise.resolve();

    } );

}

function verifyCanStore( data, testName, testContent ) {

    const overwriteTestName = `${testName}-preexisting`;
    return promiseAllTruthy( [

        data.save( testName, testContent )
            .then( () => data.load( testName ) )
            .then( content => sameJSON( testContent, content ) ),

        data.save( overwriteTestName, 42 )
            .then( () => data.save( overwriteTestName, 42, { overwrite: false } ) )
            .then( () => {

                throw new Error( "Failed to reject non-overwrite request" );

            } )
            .catch( expect409Error )
            .then( () => true )

    ] ).catch( () => false );

}

function deleteListing( data, listing ) {

    return promiseAllTruthy( listing.map( x => data.permDelete( x ) ) );

}

function generateDummies( data, names ) {

    return promiseAllTruthy( names.map( x => data.save( x, "hello, dummy" ) ) );

}

function verifyDataCanList( data, testName ) {

    const listTestName = `${testName}__list`;
    const listTestNames = suffix( listTestName, [ 1, 2, 3 ] );
    return data.list( listTestName )
        .then( listing => deleteListing( data, listing ) )
        .then( () => generateDummies( data, listTestNames ) )
        .then( () => data.list( listTestName ) )
        .then( listing => sameItems( listing.map( x => x.name ), listTestNames ) );

}

function verifyDataCanDelete( data, testName ) {

    const deleteTestName = `${testName}__delete`;
    return data.save( deleteTestName, "stuff" )
        .then( fileSpec => data.permDelete( fileSpec ).then( () => data.load( fileSpec ) ) )
        .catch( err => logError( err ) || Promise.resolve( err.code === 404 ) );

}

function deleteAll( data, testName ) {

    return data.list( testName )
        .then( listing => promiseAllTruthy( listing.map( x => data.permDelete( x ) ) ) );

}

function verifyData( data, testName, testContent ) {

    const dataTestName = `${testName}__data`;
    const result = {
        canList: undefined,
        canStore: undefined,
        canDelete: undefined,
        canGet: undefined,
    };
    return verifyCanStore( data, dataTestName, testContent )
        .then( ( canStore ) => {

            result.canStore = result.canGet = canStore;
            if ( !canStore ) return null;
            return Promise.all( [

                verifyDataCanList( data, dataTestName ),
                verifyDataCanDelete( data, dataTestName )

            ] ).then( ( [ canList, canDelete ] ) => {

                result.canList = canList;
                result.canDelete = canDelete;

            } );

        } )
        .then( () => result );

}

const equalsJSON = ( x, y ) => JSON.stringify( x ) === JSON.stringify( y );

async function verifyProjectsOperations() {

    const repoTestName = `${testNamePrefix}__repo`;
    const result = {

        canListProjects: undefined,
        canCreateProjects: undefined,
        canDeleteProjects: undefined,
        canSaveData: undefined,
        canLoadData: undefined,
        canDeleteData: undefined

    };
    const buildTestProjects = suffix( repoTestName, [ 1, 2 ] ).map( x => projects.build( x ) );
    const testProjects = await Promise.all( buildTestProjects );
    const recreateTestProjects = testProjects.map( x => x.deleteSelf().then( () => x.save() ) );
    try {

        // (re)create all test projects
        await Promise.all( recreateTestProjects );

        // check the listing shows the projects
        result.canListProjects = false;
        const listing = await projects.list();
        result.canListProjects = testProjects.every( p => ~listing.indexOf( p.name ) );
        if ( !result.canListProjects ) throw new Error( "Can't list/create projects" );
        result.canCreateProjects = true;

        // delete one of them and check it's gone
        await testProjects[ 0 ].deleteSelf();
        const newListing = await projects.list();
        result.canDeleteProjects = !~newListing.indexOf( testProjects[ 0 ].name );
        if ( !result.canDeleteProjects ) throw new Error( "Can't delete projects" );

        // add a segment to the remaining one
        const remoaner = testProjects[ 1 ];
        remoaner.segment( "eu", { sentiment: "bye-bye" } );
        remoaner.segment( "uk", { sentiment: "hmmmm" } );
        remoaner.segment( "world", { sentiment: "hello" } );
        remoaner.removeSegment( "world" );
        result.canSaveData = false;
        await remoaner.save();
        result.canSaveData = undefined;

        // build and load a duplicate project
        const remoaner2 = await projects.build( remoaner.name );
        result.canLoadData = false;
        await remoaner2.load();
        result.canLoadData = undefined;
        result.canLoadData = ( typeof remoaner2.segment( "world" ) === "undefined" )
            && equalsJSON( remoaner2.segment( "uk" ), remoaner.segment( "uk" ) )
            && equalsJSON( remoaner2.segment( "eu" ), remoaner.segment( "eu" ) );
        result.canSaveData = result.canLoadData;
        if ( !result.canSaveData ) throw new Error( "Save and/or Load data didn't work" );

        // delete one of the segments, save, then reload the original project
        result.canDeleteData = false;
        remoaner2.removeSegment( "uk" );
        remoaner2.removeSegment( "eu" );
        remoaner2.segment( "eu", { sentiment: "hello again!" } );
        await remoaner2.save();
        await remoaner.load();
        result.canDeleteData = ( typeof remoaner.segment( "uk" ) === "undefined" )
            && equalsJSON( remoaner.segment( "eu" ), remoaner2.segment( "eu" ) );
        if ( !result.canDeleteData ) throw new Error( "Delete data didn't work" );

    } catch ( ex ) {

        logError( ex );
        result.ex = ex;

    }
    return result;

}

async function cleanupTestStorage( data, testName ) {

    try {

        await deleteAll( data, testName );

    } catch ( err ) {

        logError( "Cleaning up after self test", err );

    }

}

const verifyStorage = owner => cachedVerification( owner, storageVerifications, async () => {

    let data;
    try {

        await owner.waitForLoad();
        data = await Data.inFolder( appName );
        const testData = await fetch( "/public/data/notshaka.json" ).then( res => res.json() );
        return await verifyData( data, testNamePrefix, testData ).catch( logError );

    } finally {

        log( "Verify all storage complete - cleaning up test storage" );
        await cleanupTestStorage( data, testNamePrefix );

    }

} );

const verifyProjects = owner => cachedVerification( owner, projectsVerifications, async () => {

    let data;
    try {

        await owner.waitForLoad();
        data = await Data.inFolder( appName );
        return await verifyProjectsOperations( projects, testNamePrefix ).catch( logError );

    } finally {

        log( "Verify projects complete - cleaning up test storage", owner );
        await cleanupTestStorage( data, testNamePrefix );

    }

} );

class GoogleCapabilities extends Provider {

    constructor() {

        super( "Your Google Drive storage" );

    }

    async clear() {

        await storageVerifications.delete( this );

    }

    async verifyList() {

        const { canList } = await verifyStorage( this );
        return !!canList;

    }

    async verifyStore() {

        const { canStore } = await verifyStorage( this );
        return !!canStore;

    }

    async verifyGet() {

        const { canGet } = await verifyStorage( this );
        return !!canGet;

    }

    async verifyDelete() {

        const { canDelete } = await verifyStorage( this );
        return !!canDelete;

    }

    async verifyProjects() {

        return verifyProjects( this );

    }

}

export default new GoogleCapabilities();