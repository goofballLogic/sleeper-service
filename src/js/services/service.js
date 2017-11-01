import EventEmitter from "tiny-emitter";
import local from "./local-store";

const providers = new WeakMap();
const chosenKeys = new WeakMap();

function findProvider( owner ) {

    const chosenKey = chosenKeys.get( owner );
    const chosen = local.getItem( chosenKey );
    owner.provider = providers.get( owner ).find( x => x.key === chosen );

}

export default class Service extends EventEmitter {

    constructor( availableProviders, chosenKey, requiredFunctions ) {

        super();
        availableProviders.forEach( p => p.verifyInterface( requiredFunctions ) );
        providers.set( this, availableProviders );
        chosenKeys.set( this, chosenKey );
        findProvider( this );

    }

    providers() {

        return ( providers.get( this ) || [] ).map( p => p.describe() );

    }

    ensureProvider() {

        if ( !this.provider ) return Promise.reject( new Error( "No provider selected" ) );
        return Promise.resolve( this.provider );

    }

    select( provider ) {

        const chosenKey = chosenKeys.get( this );
        local.setItem( chosenKey, provider.key );
        findProvider( this );

    }

    deselect() {

        const chosenKey = chosenKeys.get( this );
        local.removeItem( chosenKey );
        findProvider( this );

    }

}
