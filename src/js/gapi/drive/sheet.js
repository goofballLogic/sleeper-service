import Table from "./table.js";

const files = new WeakMap();

export default class Sheet {

    constructor( fileSpec ) {

        files.set( this, fileSpec );

    }

    listTables() {

        return Promise.reject( "Not implenented" );

    }

    deleteTable( name ) {

        return Promise.reject( "Not implemented" );

    }

    createTable( name, schema ) {

        return Promise.reject( "Not imlemented" );

    }

    findTable( name ) {

console.log( name );
        return Promise.reject( "Not implemented" );

    }

}
