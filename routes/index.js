/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
  api: importRoutes('./api')
};

var authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // YOUR-AUTH0-DOMAIN name e.g https://prosper.auth0.com
        jwksUri: "{YOUR-AUTH0-DOMAIN}/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: '{YOUR-API-AUDIENCE-ATTRIBUTE}',
    issuer: '{YOUR-AUTH0-DOMAIN}',
    algorithms: ['RS256']
});


// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);

  // API
  app.get('/api/people', routes.api.people.list);
  app.get('/api/people/:id', routes.api.people.get);
  app.post('/api/people', authCheck, routes.api.people.create);
  app.put('/api/people/:id', authCheck, routes.api.people.update);
  app.delete('/api/people/:id', authCheck, routes.api.people.remove);

  app.get('/api/planets', routes.api.planet.list);
  app.get('/api/planets/:id', routes.api.planet.get);
  app.post('/api/planets', authCheck, routes.api.planet.create);
  app.put('/api/planets/:id', authCheck, routes.api.planet.update);
  app.delete('/api/planets/:id', authCheck, routes.api.planet.remove);

  app.get('/api/starships', routes.api.starship.list);
  app.get('/api/starships/:id', routes.api.starship.get);
  app.post('/api/starships', authCheck, routes.api.starship.create);
  app.put('/api/starships/:id', authCheck, routes.api.starship.update);
  app.delete('/api/starships/:id', authCheck, routes.api.starship.remove);


	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
