import ProviderBase from "../provider-base.js";
import config from "../config.js";
import { init } from "./shared.js";

let loadFlag = false;
let loadError;

console.log( "registering google-api-loaded listener" );

document.addEventListener( "google-api-loaded", function handleAPILoaded() {

    console.log( "Google API loaded event" );
    init( config.gapi )
        .then( () => { loadFlag = true; } )
        .catch( ex => { loadError = ex; } );

} );

export default class Provider extends ProviderBase {

    constructor( description ) {

        super( "gapi", description );

    }

    status() {

        return { loaded: loadFlag, loadError };

    }

}
