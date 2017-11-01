import Service from "./service.js";

const requiredFunctions = [ "current", "authorize", "deauthorize" ];
const chosenKey = "chosen-identity-provider";

export default class IdentityService extends Service {

    constructor( providers ) {

        super( providers, chosenKey, requiredFunctions );

    }

    current() {

        return this.ensureProvider().then( p => p.current() );

    }

    signIn() {

        return this.ensureProvider().then( p => p.authorize() ).then( () => this.current() );

    }

    signOut() {

        return this.ensureProvider().then( p => p.deauthorize() ).then( () => this.current() );

    }

}
