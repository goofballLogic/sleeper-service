/* global fetch */

import Provider from "./provider.js";
import Data from "./drive/Data.js";
import config from "../config.js";

const { appName } = config;
const verifications = new WeakMap();

function verify( data, testName, testContent ) {

console.log( arguments );
    const isTestFile = f => f.name === testName;
    let canList = undefined;
    let canStore = undefined;
    let canDelete = undefined;
    let canGet = undefined;
    return data.save( testName, testContent )
        .then( () => data.load( testName ) )
        .then( content => JSON.stringify( testContent ) === JSON.stringify( content ) )
        .then( stored => {

            canGet = stored;
            canStore = stored;
            if ( !stored ) { return; }
            return data.list()
                .then( files => { canList = !!files.find( isTestFile ); } )
                .then( () => data.trash( testName ) )
                .then( () => data.load( testName ) )
                .catch( err => { canDelete = err.code === 404; } );

        } )
        .then( () => ( { canList, canStore, canDelete, canGet } ) );

}

function initVerification( owner ) {

    const fetchTestData = fetch( "/public/data/notshaka.json" ).then( res => res.json() );
    const buildRepo = Data.inFolder( appName );
    const testName = `__temp_testing_${appName}`;
    return Promise.all( [ buildRepo, fetchTestData ] )
        .then( ( [ repo, testData ] ) => verify( repo, testName, testData ) )
        .then( verification => verifications.set( owner, verification ) )
        .then( () => verifications.get( owner ) );

}

function verifyAll( owner ) {

    return Promise.resolve().then( () =>

        verifications.get( owner )
        ||
        verifications.set( owner, initVerification( owner ) ).get( owner )

    );

}

class GoogleCapabilities extends Provider {

    constructor() {

        super( "Your Google Drive storage" );

    }

    clear() {

        return Promise.resolve()
            .then( () => verifications.delete( this ) )
            .then( () => this );

    }

    verifyList() { return verifyAll( this ).then( v => v && v.canList ); }

    verifyStore() { return verifyAll( this ).then( v => v && v.canStore ); }

    verifyGet() { return verifyAll( this ).then( v => v && v.canGet ); }

    verifyDelete() { return verifyAll( this ).then( v => v && v.canDelete ); }

}

export default new GoogleCapabilities();