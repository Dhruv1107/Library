const expressJwt = require('express-jwt');
const config = require('../../dbconfig.json');
const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/mail',
            '/users/authenticate',
            '/users/register',
            '/catalog/',
            '/catalog/additem',
            '/catalog/rent',
            '/catalog/release',
            '/catalog/search',
            /^\/catalog\/rentid\/*/
        ]
    });
}

async function isRevoked(req, payload, done) {
    console.log(`payload ${payload.sub}`);

    const user = await userService.getById(payload.sub);
    
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};
