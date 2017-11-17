import Service from "./service";

const requiredFunctions = [ "list" ];
const chosenKey = "chosen-projects-provider";

export default class ProjectsService extends Service {

    constructor( providers ) {

        super( providers, chosenKey, requiredFunctions );

    }

}