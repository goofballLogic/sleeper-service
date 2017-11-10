/* global fetch */

import Provider from "./provider.js";
import Data from "./drive/Data.js";
import Repo from "./Repo.js";
import config from "../config.js";

const { appName } = config;
const storageVerifications = new WeakMap();

const sameItems = ( as, bs ) => as.length === bs.length && as.every( x => ~bs.indexOf( x ) );
const sameJSON = ( a, b ) => JSON.stringify( a ) === JSON.stringify( b );
const postfix = ( x, postfixes ) => postfixes.map( p => `${x}__${p}` );

function verifyCanStore( data, testName, testContent ) {

    return data.save( testName, testContent )
        .then( () => data.load( testName ) )
        .then( content => sameJSON( testContent, content ) );

}

function verifyDataCanList( data, testName ) {

    const listTestName = `${testName}__list`;
    const listTestNames = postfix( listTestName, [ 1, 2, 3 ] );
    return data.list( listTestName )
        .then( listing => Promise.all( listing.map( x => data.permDelete( x ) ) ) )
        .then( () => Promise.all( listTestNames.map( x => data.save( x ) ) ) )
        .then( () => data.list( listTestName ) )
        .then( listing => sameItems( listing, listTestNames ) );

}

function verifyDataCanDelete( data, testName ) {

    const deleteTestName = `${testName}__delete`;
    return data.save( deleteTestName, "stuff" )
        .then( () => data.permDelete( deleteTestName ) )
        .then( () => data.load( deleteTestName ) )
        .catch( err => Promise.resolve( err.code === 404 ) );

}

function deleteAll( data, testName ) {

    return data.list( testName )
        .then( listing => Promise.all( listing.map( x => data.permDelete( x ) ) ) );

}

function verifyData( data, testName, testContent ) {

    testName += "__data";
    const result = { canList: undefined, canStore: undefined, canDelete: undefined, canGet: undefined };
    return verifyCanStore( data, testName, testContent )
        .then( canStore => {

            result.canStore = result.canGet = canStore;
            if ( !canStore ) { return; }
            return Promise.all( [

                verifyDataCanList( data, testName ),
                verifyDataCanDelete( data, testName )

            ] );

        } )
        .then( () => result );

}

function verifyRepo( repo, testName ) {

    testName += "__repo";
    const result = { canListProjects: undefined };
    const testProjects = postfix( testName, [ 1, 2 ] );
    return Promise.all( testProjects.map( x => repo.trashProject( x ) ) )
        .then( () => Promise.all( testProjects.map( x => repo.createProject( x ) ) ) )
        .then( () => repo.listProjects() )
        .then( listing => {

            result.canListProjects = testProjects.every( testProject => ~listing.indexOf( testProject ) );

        } )
        .catch( ex => { result.ex = ex; } )
        .then( () => result );

}

function verifyStorage( data, repo, testName, testContent ) {

    return Promise.all( [

        verifyData( data, testName, testContent ),
        verifyRepo( repo, testName )

    ] ).then( ( [ dataResults, repoResults ] ) => {

        deleteAll( data, testName ).catch( err => console.error( "Cleaning up after self test", err ) );
        return { data: dataResults, repo: repoResults };

    } );

}

function initStorageVerifications( owner ) {

    const fetchTestData = fetch( "/public/data/notshaka.json" ).then( res => res.json() );
    const buildData = Data.inFolder( appName );
    const buildRepo = buildData.then( d => new Repo( d ) );
    const testName = `__temp_testing_${appName}`;
    console.log( "Verify all storage...", owner );
    return Promise.all( [ buildData, buildRepo, fetchTestData ] )
        .then( ( [ data, repo, testData ] ) => verifyStorage( data, repo, testName, testData ) )
        .then( verification => storageVerifications.set( owner, verification ) )
        .then( () => {

            console.log( "Verify all storage complete", owner );
            return storageVerifications.get( owner );

        } );

}

function verifyAllStorage( owner ) {

    return owner.waitForLoad().then( () =>

        storageVerifications.get( owner )
        ||
        storageVerifications.set( owner, initStorageVerifications( owner ) ).get( owner )

    );

}

class GoogleCapabilities extends Provider {

    constructor() {

        super( "Your Google Drive storage" );

    }

    clear() {

        storageVerifications.delete( this );
        return Promise.resolve();

    }

    verifyList() { return verifyAllStorage( this ).then( ( { data } ) => !!data.canList ); }

    verifyStore() { return verifyAllStorage( this ).then( ( { data } ) => !!data.canStore ); }

    verifyGet() { return verifyAllStorage( this ).then( ( { data } ) => !!data.canGet ); }

    verifyDelete() { return verifyAllStorage( this ).then( ( { data } ) => !!data.canDelete ); }

    verifyProjects() { return verifyAllStorage( this ).then( ( { repo } ) => console.log( repo ) || !!repo.canListProjects ); }

}

export default new GoogleCapabilities();