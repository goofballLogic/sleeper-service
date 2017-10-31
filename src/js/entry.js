import identityFactory from "./services/identity.js";
import gapi_identity from "./gapi/identity.js";

document.addEventListener( "locate-services", e => {
    
    e.detail( null, {
        
        identity: identityFactory( [ gapi_identity ] )
        
    } );
    
} );
