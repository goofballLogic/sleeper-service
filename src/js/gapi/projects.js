/* global gapi */

import Provider from "./provider";

class Projects extends Provider {

    constructor() {

        super( "Projects based on google drive" );

    }

    /**
     * Returns a list of projects stored in google drive
     * @returns {object} Promise of list of project names
     */
    list() {

        throw new Error( "Not implemented" );

    }

}

export default new Projects();
