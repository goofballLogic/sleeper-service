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
     * @return {Promise<void>} Promise of saved project
     */
    async saveProject( name, metadata, segments = {}, removedSegments = [] ) {

        const index = Object.keys( segments ).reduce( ( acc, key ) => Object.assign( acc, {

            [ key ]: asSegmentFilename( name, key )

        } ), {} );
        const project = { index, metadata };
        await this.data.save( filename( name ), project, { overwrite: true } );
        const segmentSaves = Object.keys( index ).map( name =>

            this.data.save( index[ name ], segments[ name ], { overwrite: true } )

        );
        await Promise.all( segmentSaves );
console.log( "removed", removedSegments );
        const segmentDeletes = removedSegments.map( key =>

            this.data.permDelete( asSegmentFilename( name, key ) )

        );
        await Promise.all( segmentDeletes );

    }

    /**
     * Load a project with the specified name
     * @param {string} name of the project
     * @return {object} Promise of project { {object} metadata, {array} segments }
     */
    async loadProject( name ) {

        const { metadata, index } = await this.data.load( filename( name ) );
        const segmentLoads = Object.keys( index ).map( name => this.data.load( index[ name ] ) );
        const loaded = await Promise.all( segmentLoads );
        const segments = Object.keys( index ).reduce( ( acc, name, i ) => ( {

            ...acc,
            [ name ]: loaded[ i ]

        } ), { } );
        return { metadata: metadata || {}, segments };

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
