import { logError } from "../../diagnostics";

const filename = name => `${name}_project.json`;

export default class Repo {

    constructor( data ) {

        this.data = data;

    }

    createProject( name ) {

        const project = [];
        return this.data.save( filename( name ), project, { overwrite: false } );

    }

    trashProject( name ) {

        return this.data.permDelete( filename( name ) );

    }

    listProjects() {

        return this.data.list().then( () => {

            logError( new Error( "Not sure what to do here" ) );

        } );

    }

}
