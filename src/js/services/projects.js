import Service from "./service";

const requiredFunctions = [ "list", "build" ];
const chosenKey = "chosen-projects-provider";

export default class ProjectsService extends Service {

    constructor( providers ) {

        super( providers, chosenKey, requiredFunctions, "Projects" );

    }

    async list() {

        return ( await this.ensureProvider() ).list();

    }

    async build( name ) {

        return ( await this.ensureProvider() ).build( name );

    }

}