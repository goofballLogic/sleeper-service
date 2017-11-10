export default class Repo {

    constructor( data ) {

        this.data = data;

    }

    createProject( name ) {

        const project = [];
        console.log( "Creating", name );
        return this.data.save( `${name}_project.json`, project, { overwrite: false } );

    }

    trashProject( name ) {

    }

    listProjects() {

        return this.data.list().then( something => {

            console.log( "Something", something );

        } );

    }

}
