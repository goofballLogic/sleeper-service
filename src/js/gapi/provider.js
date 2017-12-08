/* global document */
import ProviderBase from "../provider-base";
import config from "../config";
import { init } from "./shared";
import { log } from "../diagnostics";

let loadFlag = false;
let loadError;

if ( typeof document === "undefined" ) throw new Error( "document is undefined" );
document.addEventListener( "google-api-loaded", () => {

    init( config.gapi )
        .then( () => {

            loadFlag = true;

        } )
        .catch( ( ex ) => {

            loadError = ex;

        } );

} );

function waitFor( condition, timeout, description ) {

    if ( timeout <= 0 ) return Promise.reject( new Error( `Timed out ${description}` ) );
    if ( condition() ) return Promise.resolve( true );
    const newTimeout = timeout - 100;
    return new Promise( ( resolve, reject ) => setTimeout(

        () => waitFor( condition, newTimeout, description ).then( resolve, reject ),
        100

    ) );

}

export default class Provider extends ProviderBase {

    constructor( description, name ) {

        super( "gapi", description, name );

    }

    status() { // eslint-disable-line class-methods-use-this

        return { loaded: loadFlag, loadError };

    }

    waitForLoad() {

        if ( loadFlag ) return Promise.resolve();
        log( "Provider loading...", this );
        return waitFor( () => loadFlag, 5000 ).then( () => {

            log( "Provider loading complete", this );

        } );

    }

}
