import EventEmitter from "tiny-emitter";
import local from "./local-store";

const functions = [ "on", "current", "authorize", "deauthorize" ];

export default function factory( providers ) {

    providers.forEach( p => p.verifyInterface( functions ) );
    return new service( providers );

}

const chosenKey = "chosen-identity-provider";
const state = { providers: new WeakMap() };

function findProvider( owner ) {

    const chosen = local.getItem( chosenKey );
    owner.provider = state.providers.get( owner ).find( x => x.key === chosen );

}

class service extends EventEmitter {

    constructor( providers ) {

        super();
        state.providers.set( this, providers );
        findProvider( this );

    }

    providers() {

        const asDescription = ( { key, description } ) => ( { key, description } );
        return ( state.providers.get( this ) || [] ).map( asDescription  );

    }

    select( provider ) {

        local.setItem( chosenKey, provider.key );
        findProvider( this );
        return this.current();

    }

    deselect() {

        local.removeItem( chosenKey );
        findProvider( this );
        return this.current();

    }

    current() {

        if ( !this.provider ) return Promise.reject( new Error( "No provider selected" ) );
        return this.provider.current();

    }

    signIn() {

        if ( !this.provider ) return this.current();
        const continuation = this.current.bind( this );
        return this.provider.authorize().then( continuation );

    }

    signOut() {

        if ( !this.provider ) return;
        const continuation = this.current.bind( this );
        return this.provider.deauthorize().then( continuation );

    }

}
