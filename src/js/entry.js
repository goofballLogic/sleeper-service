/* global document */

import Identity from "./services/identity";
import Capabilities from "./services/capabilities";
import Projects from "./services/projects";

import gapiIdentity from "./gapi/identity";
import gapiCapabilities from "./gapi/capabilities";
import gapiProjects from "./gapi/projects";

import selfTest from "./self-test";

if ( typeof document === "undefined" ) throw new Error( "document is not defined" );

document.addEventListener( "locate-services", ( e ) => {

    e.detail( null, {

        identity: new Identity( [ gapiIdentity ] ),
        capabilities: new Capabilities( [ gapiCapabilities ] ),
        projects: new Projects( [ gapiProjects ] )

    } );

} );

selfTest();