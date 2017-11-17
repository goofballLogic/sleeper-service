const repos = new WeakMap();

export default class Project {

    constructor( name, repo ) {

        this.name = name;
        repos[ this ] = repo;
        this.init();

    }

    init() {

        this.segments = {};

    }

    deleteSelf() {

        const repo = repos[ this ];
        const { name } = this;
        return repo.loadProject( name )
            .then( ( { segments } ) => repo.deleteProject( name, segments ) )
            .catch( ( ex ) => {

                if ( ex.code !== 404 ) throw ex;

            } );

    }

    save() {

        const metadata = { saved: Date.now() };
        return repos[ this ].saveProject( this.name, metadata, Object.keys( this.segments ) );

    }

}