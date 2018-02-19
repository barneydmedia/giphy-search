# Giphy Search Frontend
This was a fun interview exercise that I did for a company called WireWheel. The basic idea is that a user should be able to use the SPA to search for gifs through the Giphy API, this app does that and adds pagination. It also uses a custom Bootstrap theme for slick/responsive looks.

## Dev Info
To run the Express server, in the project root directory:

```
npm install && npm run start
```

Or for dev work:

```
npm install -g nodemon && npm install && nodemon ./bin/www
```

To run dev for the Vue app:

```
cd vue-app && npm install && npm run dev
```

and build to the public folder with:

```
npm run build
```

NOTE: You'll need to manually update the script name references in `views/scripts.pug`
