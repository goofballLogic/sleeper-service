import ProviderBase from "../provider-base.js";
import config from "../config.js";
import { init } from "./shared.js";

let loadFlag = false;
let loadError;

document.addEventListener( "google-api-loaded", function handleAPILoaded() {

    init( config.gapi )
        .then( () => { loadFlag = true; } )
        .catch( ex => { loadError = ex; } );

} );

function waitFor( condition, timeout, description ) {

    if ( timeout <= 0 ) { return Promise.reject( "Timed out" ); }
    if ( condition() ) { return Promise.resolve( true ); }
    const newTimeout = timeout - 100;
    return new Promise( ( resolve, reject ) => setTimeout(

        () => waitFor( condition, newTimeout ).then( resolve, reject ),
        100

    ) );

}

export default class Provider extends ProviderBase {

    constructor( description ) {

        super( "gapi", description );

    }

    status() {

        return { loaded: loadFlag, loadError };

    }

    waitForLoad() {

        if ( loadFlag ) { return Promise.resolve(); }
        console.log( "Provider loading...", this );
        return waitFor( () => loadFlag, 5000 ).then( () => {

            console.log( "Provider loading complete", this );

        } );

    }

}
