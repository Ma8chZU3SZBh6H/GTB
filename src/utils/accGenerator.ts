import {adjectives, animals, names, starWars, uniqueNamesGenerator} from "unique-names-generator";

function accGenerator(){
    const email = uniqueNamesGenerator({dictionaries: [adjectives, starWars, animals]}).replace(/[^A-z]+/g, '');
    const firstName = uniqueNamesGenerator({ dictionaries: [names] });
    const lastName = uniqueNamesGenerator({ dictionaries: [names] });
    const password = `Slabotka${new Date().getTime().toString(36) + Math.random().toString(36).slice(2)}0`;
    return {
        email,
        firstName,
        lastName,
        password
    }
}

export default accGenerator;