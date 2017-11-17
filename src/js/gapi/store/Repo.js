const filename = name => `${name}_project.json`;
const asSegmentFilename = ( name, key ) => `${name}__${key}.json`;
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
     * Save a project with the specified name, metadata and segments (hash of key-values)
     * @param {string} name of the project
     * @param {object} metadata to save in the main project file
     * @param {object} segments hash of key-value pairs to save, each in its own file
     * @return {object} Promise of saved project
     */
    saveProject( name, metadata, segments = {} ) {

        const index = {};
        Object.keys( segments ).forEach( ( key ) => {

            index[ key ] = asSegmentFilename( name, key );

        } );
        const project = { index, metadata };
        return this.data.save( filename( name ), project, { overwrite: true } );

    }

    /**
     * Load a project with the specified name
     * @param {string} name of the project
     * @return {object} Promise of project { {object} metadata, {array} segments }
     */
    loadProject( name ) {

        return this.data.load( filename( name ) )
            .then( ( { metadata, index } ) => ( {

                metadata: metadata || {},
                segments: Object.keys( index || {} )

            } ) );

    }

    /**
     * Delete a project with the specified name
     * @param {string} name of the project to delete
     * @return {object} Promise of deletion
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
