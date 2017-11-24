/* global document, CustomEvent, window */
/* eslint-disable no-console */

async function testServices( e, services ) {

    services.capabilities.verifyProjectRepo().then( console.log.bind( console ) );
    window.x = services;
    window.testProject = await services.projects.build( "test" );

}
export default function test() {

    document.dispatchEvent( new CustomEvent( "locate-services", { detail: testServices } ) );

}
