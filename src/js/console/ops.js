/* global document, Event */
/* eslint-disable import/no-duplicates */

import { userFunctions } from "../func/reflection";
import { div, section, box } from "../func/html";
import { ul, li, b, sub } from "../func/html";
import { button, label, select } from "../func/html";

function selectProviderButton( service, provider ) {

    const data = { service: service.name, provider: provider.name };
    return button( "select-provider", data, provider.name || "??" );

}

function availableProviders( service ) {

    if ( !service ) return "???";
    return ul( true, service.providers().filter( x => x ).map( x => li( selectProviderButton( service, x ) ) ) );

}

function summarizeProvider( service ) {

    const { provider } = service;
    if ( !provider ) return b( "(none)" );
    return b( `${provider.description} ( ${provider.name} ) ${button( "deselect-provider", { service: service.name }, " X " )}` );

}

function serviceMethods( service ) {

    if ( !service ) return undefined;
    const selectTest = label( "Test: ", select( "test-service-method", { service: service.name }, Array.from( userFunctions( service ) ) ) );
    const host = div.withClass( "test-area" );
    return div( selectTest, host );

}

function summarizeService( service ) {

    if ( !service ) return section( "(nothing)" );
    return box.big(

        sub( `${service.name} provider` ),
        summarizeProvider( service ),
        serviceMethods( service ),
        `Available: ${availableProviders( service )}`

    );

}

function opService( services, data ) {

    const service = Object.values( services ).find( x => x.name === data.service );
    if ( !service ) throw new Error( `Service not known: ${data.service}` );
    return service;

}

function opServiceProvider( services, data ) {

    const service = opService( services, data );
    const provider = data.provider ?
        service.providers().find( x => x.name === data.provider ) :
        service.provider;

    if ( !provider ) throw new Error( `Unknown/unspecified provider: ${data.provider}` );
    return { service, provider };

}

function opServiceMethod( services, data ) {

    const service = opService( services, data );
    const method = data.method ? service[ data.method ] : undefined;
    return { service, method };

}

function testArea( service, method ) {

    if ( !method ) return "";
    const f = service[ method ];
    const arity = f.length;
    const invokeData = { service: service.name, method };
    return div(
        button( "invokeTestMethod", invokeData, "Invoke" ),
        div.withClass( "messages" )
    );

}

export default name => ( name ? name.replace( /-./g, x => x[ 1 ].toUpperCase() ) : name );

export function summarizeServices( services ) {

    return Object.values( services ).map( summarizeService ).join( "" );

}

export function selectProvider( services, data ) {

    const { service, provider } = opServiceProvider( services, data );
    service.select( provider );
    document.dispatchEvent( new Event( "redraw" ) );

}

export function deselectProvider( services, data ) {

    const service = opService( services, data );
    service.deselect();
    document.dispatchEvent( new Event( "redraw" ) );

}

export function testServiceMethod( services, data, e ) {

    const service = opService( services, data );
    const method = e.target.value;
    const host = e.target.parentElement.parentElement.querySelector( ".test-area" );
    if ( !host ) return;
    host.innerHTML = testArea( service, method );

}

export async function invokeTestMethod( services, data, e ) {

    const { service, method } = opServiceMethod( services, data );
    const parameters = Array
        .from( e.target.parentElement.querySelectorAll( "input[type=text]" ) )
        .map( x => JSON.parse( x.value ) );
    const messageHost = e.target.parentElement.querySelector( ".messages" );
    const timestamp = x => `[${( new Date().toLocaleTimeString() )}] ${x}`;
    if ( messageHost ) messageHost.innerHTML = timestamp( "Running...<br />" );
    try {

        const result = await method.apply( service, parameters );
        console.log( result );
        if ( messageHost ) messageHost.innerHTML += timestamp( JSON.stringify( result ) );

    } catch ( ex ) {

        console.error( ex );
        if ( messageHost ) messageHost.innerHTML += ex.stack;

    }

}

