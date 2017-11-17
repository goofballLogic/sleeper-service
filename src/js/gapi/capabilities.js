/* global fetch */

import Provider from "./provider";
import Data from "./store/Data";
import Repo from "./store/Repo";
import config from "../config";
import { log, logError } from "../diagnostics";

const { appName } = config;
const storageVerifications = new WeakMap();

const sameItems = ( as, bs ) => as.length === bs.length && as.every( x => ~bs.indexOf( x ) );
const sameJSON = ( a, b ) => JSON.stringify( a ) === JSON.stringify( b );
const postfix = ( x, postfixes ) => postfixes.map( p => `${x}__${p}` );

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
    const listTestNames = postfix( listTestName, [ 1, 2, 3 ] );
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

function verifyRepo( repo, testName ) {

    const repoTestName = `${testName}__repo`;
    const result = {

        canListProjects: undefined,
        canCreateProjects: undefined,
        canDeleteProjects: undefined,

    };
    const testProjects = postfix( repoTestName, [ 1, 2 ] );
    return Promise.all( testProjects.map( x => repo.deleteProject( x ) ) )
        .then( () => Promise.all( testProjects.map( x => repo.createProject( x ) ) ) )
        .then( () => repo.listProjects() )
        .then( ( listing ) => {

            result.canListProjects = testProjects.every( x => ~listing.indexOf( x ) );
            if ( !result.canListProjects ) throw new Error( "Can't list/create projects" );
            result.canCreateProjects = true;

        } )
        .then( () => repo.deleteProject( testProjects[ 0 ] )
            .then( () => repo.listProjects() )
            .then( ( listing ) => {

                result.canDeleteProjects = !~listing.indexOf( testProjects[ 0 ] );

            } ) )
        .catch( ( ex ) => {

            logError( ex );
            result.ex = ex;

        } )
        .then( () => result );

}

function verifyStorage( data, repo, testName, testContent ) {

    function cleanup() {

        deleteAll( data, testName ).catch( err => logError( "Cleaning up after self test", err ) );

    }
    return Promise.all( [

        verifyData( data, testName, testContent ),
        verifyRepo( repo, testName )

    ] ).then( ( [ dataResults, repoResults ] ) => {

        cleanup();
        return { data: dataResults, repo: repoResults };

    } ).catch( ( ex ) => {

        cleanup();
        throw ex;

    } );

}

function initStorageVerifications( owner ) {

    const fetchTestData = fetch( "/public/data/notshaka.json" ).then( res => res.json() );
    const buildData = Data.inFolder( appName );
    const buildRepo = buildData.then( d => new Repo( d ) );
    const testName = `__temp_testing_${appName}`;
    log( "Verify all storage...", owner );
    return Promise.all( [ buildData, buildRepo, fetchTestData ] )
        .then( ( [ data, repo, testData ] ) => verifyStorage( data, repo, testName, testData ) )
        .then( verification => storageVerifications.set( owner, verification ) )
        .then( () => {

            log( "Verify all storage complete", owner );
            return storageVerifications.get( owner );

        } );

}

function verifyAllStorage( owner ) {

    return owner.waitForLoad().then( () =>

        storageVerifications.get( owner )
        ||
        storageVerifications.set( owner, initStorageVerifications( owner ) ).get( owner )

    ); // eslint-disable-line function-paren-newline

}

class GoogleCapabilities extends Provider {

    constructor() {

        super( "Your Google Drive storage" );

    }

    clear() {

        storageVerifications.delete( this );
        return Promise.resolve();

    }

    verifyList() {

        return verifyAllStorage( this ).then( ( { data } ) => !!data.canList );

    }

    verifyStore() {

        return verifyAllStorage( this ).then( ( { data } ) => !!data.canStore );

    }

    verifyGet() {

        return verifyAllStorage( this ).then( ( { data } ) => !!data.canGet );

    }

    verifyDelete() {

        return verifyAllStorage( this ).then( ( { data } ) => !!data.canDelete );

    }

    verifyProjects() {

        return verifyAllStorage( this ).then( ( { repo } ) => repo );

    }

}

export default new GoogleCapabilities();