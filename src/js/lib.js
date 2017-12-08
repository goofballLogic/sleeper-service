/* global document */
import "babel-polyfill";
import Identity from "./services/identity";
import Capabilities from "./services/capabilities";
import Projects from "./services/projects";

import gapiIdentity from "./gapi/GoogleIdentity";
import gapiCapabilities from "./gapi/GoogleCapabilities";
import gapiProjects from "./gapi/GoogleProjects";

document.addEventListener( "locate-services", ( e ) => {

    e.detail( null, {

        identity: new Identity( [ gapiIdentity ] ),
        capabilities: new Capabilities( [ gapiCapabilities ] ),
        projects: new Projects( [ gapiProjects ] )

    } );

} );