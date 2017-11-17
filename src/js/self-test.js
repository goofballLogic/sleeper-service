/* global document, CustomEvent, window */
/* eslint-disable no-console */

function testServices( e, services ) {

    services.capabilities.verifyProjectRepo().then( console.log.bind( console ) );
    window.x = services;

}
export default function test() {

    document.dispatchEvent( new CustomEvent( "locate-services", { detail: testServices } ) );

}
