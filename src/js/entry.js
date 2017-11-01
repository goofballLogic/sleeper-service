import Identity from "./services/identity.js";
import Capabilities from "./services/capabilities.js";

import gapi_identity from "./gapi/identity.js";
import gapi_capabilities from "./gapi/capabilities.js";

document.addEventListener( "locate-services", e => {

    e.detail( null, {

        identity: new Identity( [ gapi_identity ] ),
        capabilities: new Capabilities( [ gapi_capabilities ] )

    } );

} );
