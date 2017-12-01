const repos = new WeakMap();
const segmentsForProject = new WeakMap();
const removedSegmentsForProject = new WeakMap();

const clone = x => ( typeof x === "undefined" ? undefined : JSON.parse( JSON.stringify( x ) ) );

export default class Project {

    constructor( name, repo ) {

        this.name = name;
        repos.set( this, repo );
        segmentsForProject.set( this, {} );
        removedSegmentsForProject.set( this, [] );

    }

    async deleteSelf() {

        const repo = repos.get( this );
        const { name } = this;
        try {

            const { segments } = await repo.loadProject( name );
            return repo.deleteProject( name, segments );

        } catch ( ex ) {

            if ( ex.code !== 404 ) throw ex;
            return Promise.resolve();

        }

    }

    removeSegment( name ) {

        const segments = segmentsForProject.get( this );

        if ( name in segments ) {

            const removedSegments = removedSegmentsForProject.get( this );
            removedSegments.push( name );
            delete segments[ name ];

        }

    }

    segment( name, maybeData ) {

        const segments = segmentsForProject.get( this );
        if ( typeof maybeData !== "undefined" ) {

            segments[ name ] = clone( maybeData );

        }
        return clone( segments[ name ] );

    }

    async save() {

        const repo = repos.get( this );
        const segments = segmentsForProject.get( this );
        const removedSegments = removedSegmentsForProject.get( this );

        const metadata = { saved: Date.now() };
        await repo.saveProject( this.name, metadata, clone( segments ), clone( removedSegments ) );
        removedSegmentsForProject.set( this, [] );

    }

    async load() {

        const repo = repos.get( this );
        const { segments } = await repo.loadProject( this.name );
        segmentsForProject.set( this, clone( segments ) );

    }

}