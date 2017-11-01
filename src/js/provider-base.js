import EventEmitter from "tiny-emitter";

export default class Provider extends EventEmitter {

    constructor( key, description ) {

        super();
        this.name = this.constructor.name;
        this.key = key;
        this.description = description;

    }

    verifyInterface( functions ) {

        functions.forEach( func => {

            const maybeFunction = this[ func ];
            if ( typeof maybeFunction !== "function" ) {

                const provider = this.constructor.name;
                throw new Error( `Provider ${provider} does not provide function '${func}' (${maybeFunction})` );

            }

        } );

    }

    describe() {

        const { key, name, description } = this;
        return { key, name, description };

    }

}
