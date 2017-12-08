import Provider from "./provider";
import config from "../config";
import Data from "./store/Data";
import Repo from "./store/Repo";
import Project from "../model/Project";

const { appName } = config;

async function initializeRepo() {

    const data = await Data.inFolder( appName );
    return new Repo( data );

}

class GoogleProjects extends Provider {

    constructor() {

        super( "Projects based on Google Drive", "GoogleProjects" );
        this.repo = this.waitForLoad().then( initializeRepo );

    }

    /**
     * @async
     * Returns a list of projects stored in google drive
     * @returns {Promise<Array>} list of project names
     */
    async list() {

        const repo = await this.repo;
        return repo.listProjects();

    }

    /**
     * Builds a project object
     * Note that this isn't necessarily loaded or saved yet
     * @param {string} name The name of the project
     * @returns {Promise<Project>} project once the repo is ready
     */
    async build( name ) {

        const repo = await this.repo;
        return new Project( name, repo );

    }

}

export default new GoogleProjects();
