/* global document, Event */
/* eslint-disable import/no-duplicates */

import React from "react";
import ReactDOM from "react-dom";
import { userFunctions } from "../func/reflection";
import { div, section, box } from "../func/html";
import { ul, li, b, sub } from "../func/html";
import { button, label, select, input } from "../func/html";
import ui from "../ui/ns";

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

function objectTest( op, data, obj ) {

    const funcs = ( typeof obj !== "undefined" && obj !== null ) ? Array.from( userFunctions( obj ) ) : [];
    if ( funcs.length ) {

        const selectTest = label( "Try: ", select( op, data, funcs ) );
        const host = div.withClass( "test-area" );
        return div( selectTest, host );

    }
    return div( "---" );

}

function summarizeService( service ) {

    if ( !service ) return section( "(nothing)" );
    return box.big(

        sub( `${service.name} provider` ),
        summarizeProvider( service ),
        objectTest( "test-service-method", { service: service.name }, service ),
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

function testArea( obj, method ) {

    if ( !method ) return "";
    const f = obj[ method ];
    const arity = f.length;
    const invokeData = { method };
    const inputs = input.text( "param" ).repeat( arity );
    return div(
        inputs || "(no parameters)",
        button( "invokeTestMethod", invokeData, "Invoke" ),
        div.withClass( "messages" ),
        div.withClass( "child-context" )
    );

}

function parseMaybeJSON( value ) {

    try {

        return JSON.parse( value );

    } catch ( _ ) {

        return value;

    }

}

function testMethod( obj, e ) {

    const method = e.target.value;
    const daddy = e.target.parentElement.parentElement;
    const host = daddy.querySelector( ".test-area" );
    if ( !host ) return;
    host.innerHTML = testArea( obj, method );
    host.object = obj;

}

const timestamp = x => `[${( new Date().toLocaleTimeString() )}] ${x}`;

function summarizeComponent( name ) {

    return box.big(

        sub( name ),
        button( "instantiate-component", { name }, "Run" ),
        div.withClass( "canvas" )

    );

}

function formatMessage( outside = [], ...inside ) {

    return outside.reduce( ( ret, outsider, i ) => `${ret}${inside[ i - 1 ]}${outsider}` );

}

export default name => ( name ? name.replace( /-./g, x => x[ 1 ].toUpperCase() ) : name );

export function instantiateComponent( services, data, e ) {

    const { name } = data;
    const Component = ui.components[ name ];
    const canvas = e.target.parentElement.querySelector( ".canvas" );
    ReactDOM.unmountComponentAtNode( canvas );
    canvas.innerHTML = `instantiating ${name}`;
    const component = React.createElement( Component, { services, formatMessage } );
    ReactDOM.render( component, canvas );

}

export function summarizeComponents() {

    return Object.keys( ui.components ).map( key => summarizeComponent( key, ui.components[ key ] ) );

}

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

export function testObjectMethod( services, data, e ) {

    const grandad = e.target.parentElement.parentElement.parentElement;
    return testMethod( grandad.object, e );

}

export function testServiceMethod( services, data, e ) {

    const service = opService( services, data );
    return testMethod( service, e );

}

export async function invokeTestMethod( services, data, e ) {

    const daddy = e.target.parentElement.parentElement;
    const obj = daddy.object;
    if ( !obj ) throw new Error( "No test object" );
    const method = obj[ data.method ];
    if ( !method ) throw new Error( `Method not found: ${data.method}` );
    const parameters = Array
        .from( daddy.querySelectorAll( "input[type=text]" ) )
        .map( x => parseMaybeJSON( x.value ) );
    const messageHost = e.target.parentElement.querySelector( ".messages" );

    if ( messageHost ) messageHost.innerHTML = timestamp( "Running...<br />" );
    const child = daddy.querySelector( ".child-context" );
    child.innerHTML = "";
    try {

        console.log( "Applying", parameters, "to", method, "on", obj );
        const result = await method.apply( obj, parameters );
        console.log( result );
        if ( messageHost ) messageHost.innerHTML += timestamp( JSON.stringify( result ) );

        child.innerHTML = objectTest( "test-object-method", {}, result );
        child.object = result;

    } catch ( ex ) {

        console.error( ex );
        if ( messageHost ) messageHost.innerHTML += ex.stack;

    }

}

