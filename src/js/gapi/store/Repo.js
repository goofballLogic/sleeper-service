const filename = name => `${name}_project.json`;
const filenamePattern = /^(.*)_project\.json$/;

export default class Repo {

    /**
     * Makes a project repository for the given data repository
     * @param {object} data the data repository
     */
    constructor( data ) {

        this.data = data;

    }

    /**
     * Create a project with the specified name
     * @param {string} name the name of the project
     * @return {object} Promise to create the proejct
     */
    createProject( name ) {

        const project = [];
        return this.data.save( filename( name ), project, { overwrite: false } );

    }

    /**
     * Permanently deletes the named project
     * @param {string} name the name of the project
     * @return {object} Promise to delete the project
     */
    deleteProject( name ) {

        return this.data.permDelete( filename( name ) );

    }

    /**
     * Lists the projects in this repository
     * @return {object} Promise of listing of project names
     */
    listProjects() {

        return this.data.list().then( listing => listing
            .map( ( { name } ) => filenamePattern.exec( name ) )
            .filter( x => x )
            .map( ( [ , name ] ) => name ) );

    }

}
