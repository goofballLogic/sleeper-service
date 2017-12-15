/* global document CustomEvent, Event */

// import selfTest from "./self-test";
import opify, * as ops from "./ops";

function enop( dataOp, data, services, e ) {

    const op = opify( dataOp );
    if ( !op ) return undefined;
    if ( op in ops ) return ops[ op ]( services, data, e );
    console.warn( `Unhandled op: ${op}` );
    return undefined;

}

function redraw( services ) {

    for ( const host of [ ...document.querySelectorAll( "[data-op]" ) ] ) {

        host.innerHTML = enop( host.dataset.op, host.dataset, services );

    }

}

function invokeHandler( services, e ) {

    const { handler } = e.target.dataset;
    if ( !handler ) return false;
    return enop( handler, e.target.dataset, services, e );

}

function invokeClickHandler( services, e ) {

    if ( e && e.target && e.target.tagName === "SELECT" ) return;
    if ( invokeHandler( services, e ) && e ) e.preventDefault();

}

function bootstrap( err, services ) {


    if ( err ) console.error( err ); else {

        document.addEventListener( "click", e => invokeClickHandler( services, e ) );
        document.addEventListener( "change", e => invokeHandler( services, e ) );
        document.addEventListener( "redraw", () => redraw( services ) );
        document.dispatchEvent( new Event( "redraw" ) );

    }

}
document.dispatchEvent( new CustomEvent( "locate-services", { detail: bootstrap } ) );