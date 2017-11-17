/* global document */

import Identity from "./services/identity";
import Capabilities from "./services/capabilities";

import gapiIdentity from "./gapi/identity";
import gapiCapabilities from "./gapi/capabilities";

if ( typeof document === "undefined" ) throw new Error( "document is not defined" );

document.addEventListener( "locate-services", ( e ) => {

    e.detail( null, {

        identity: new Identity( [ gapiIdentity ] ),
        capabilities: new Capabilities( [ gapiCapabilities ] )

    } );

} );
