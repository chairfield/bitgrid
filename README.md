I'm working towards an application to display simple documents stored in MongoDB on a Leaflet map served by Node with Express as the routing framework. In addition to the full application stack, I've configured commits to this repository to be automatically picked up by Codeship, built, and deployed to a VA datacenter run by Nodejitsu. So go ahead, try it out at:
http://bitgrid.jit.su

Click anywhere on the map, enter a name, and click submit to push your new named nothing into the MongoLabs-hosted database.

Known issue: The submit button does not yet refresh the page as-is, instead redirecting the user to an internal page.
