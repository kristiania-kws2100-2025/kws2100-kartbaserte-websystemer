# KWS2100 Kartbaserte Websystemer Exercises

## Exercise 1
###  Display a map in React

<details open>

Create a React application that displays information on a map

1. If you're using IntelliJ, I recommend creating a new Empty project for your application
2. Use [Vite](https://vitejs.dev/guide/) to create a React + Typescript application
   * `npm install --save-dev vite && npm install react react-dom`
   * `npm pkg set scripts.dev="vite"`
   * Create `index.html` (critical line `<script src="src/main.tsx" type="module"></script>`)
   * Create `src/main.tsx` (critical line: `createRoot(document.getElementById("root")).render(<h1>Hello World</h1>)`)
3. Verify that you can make changes and see them displayed in the web page
   * If you want, you can deploy the application to GitHub pages now
4. Replace the App component with a component that uses OpenLayers to display a map
   * See [reference material](../README.md#creating-a-openlayers-map-in-react)
5. Add [fylker in Norway](https://github.com/robhop/fylker-og-kommuner/blob/main/Fylker-M.geojson) as a vector layer
   * Place the file in `public/geojson/fylker.json`
   * Add a layer to the map layers array: `new VectorLayer({source: new VectorSource({url: "/geojson/fylker.json", format: new GeoJSON()})})`
6. (Optional) Style the vector layer
7. (Optional) Change the style on hover
8. (Optional) Add schools from https://kart.dsb.no/ (Sårbare objekter > Videregående skoler)
9. (Optional) Deploy to GitHub pages

## Tips:

- In order to display a map with OpenLayers, you have to create a Map object with a View and at least one layer.
  The view must have center and zoom
- You can use `new OSM()` (for Open Street Maps) as your first layer
- Make sure you call the OpenLayers function `useGeographic()` at the top of your file. Otherwise, positions will be
  displayed as meters from the equator instead of degrees latitude and longitude
- If things are working weird, make sure you have `import {Map} from "ol"`, as there is a core JavaScript object that
  is also called `Map`. Also, avoid calling your React component ~~`Map`~~ (as I once did and struggled with for a
  long time)
- A common error is for the map `<div>` to have zero size. Make sure you style it with `height` and `width`

For a solution, check out [the reference code for lecture 1](https://github.com/kristiania-kws2100-2024/kristiania-kws2100-2024.github.io/tree/reference/01)

</details>


## Exercise 2
### Deploy your map application to Heroku

<details>

### Be prepared:

1. Make sure you have solved [exercise 1](#exercise-1) before your start. You need to have a working React application
2. Create a backend [Hono](https://hono.dev/docs/getting-started/nodejs) application to serve the React code (see the lecture video)
3. Make sure you are signed up for [GitHub Student Developer Pack](https://education.github.com/pack) so you don't have to pay for the hosting
4. Read through the documentation about [Heroku for GitHub Students](https://www.heroku.com/github-students) so you understand how to avoid cloud bills

Your application structure should look like this:

```
<root-directory>/
  client/
    dist/            # The output from the build process - generated by vite (add to .gitignore)
    node_modules/    # The local copy of dependencies - generated by npm (add to .gitignore)
    src/main.jsx     # The starting point for React
    package.json     # Contains scripts to run and dependencies
    index.html       # The starting point for the client code
    vite.config.js   # Configuration for Vite, contains React plugin and proxy settings
  server/
    node_modules/    # The local copy of dependencies - generated by npm (add to .gitignore)
    package.json     # Contains scripts to run and dependencies
    server.js        # The starting point for the server
  node_modules/    # The local copy of dependencies - generated by npm (add to .gitignore)
  package.json       # Scripts to run both client and server in combination
```

### Make your application ready for Heroku

1. Make sure `npm run build` at the top level works correctly (it should install `node_modules` and build `client/dist`)
2. Make sure `npm start` at the top level works correctly (it should start the server so you can access the React
   application at http://localhost:3000)
3. Make sure `server/server.js` lets Heroku specify the port. The listen statement should look like this:
   `app.listen(process.env.PORT || 3000)`
4. Create a repository on GitHub and push your code there

### Create the Heroku app

1. Go to the [Heroku Dashboard](https://dashboard.heroku.com/apps)
2. Select New > Create New App
3. Under Deployment for your new app, select Heroku Git as Deployment Method
4. Download the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
5. From the command line, push your repository to Heroku
    1. `heroku login`
    2. `heroku git:remote -a <app name>`
    3. `git push heroku`
    4. `heroku open` (optional: opens a web browser to your Heroku application)
    5. `heroku logs --tail` (optional): See the logs from Heroku in your console
6. You can see the deployment log under Activity in the Heroku Dashboard for your app and the runtime log under More > View logs
7. Share the link to your repositories to your classmates on
   [Mattermost](https://mattermost.kristiania.no/it2022/channels/pg6301-webutvikling-og-api-design)

</details>

## Exercise 3
### Interact with polygon elements

<details>

### Be prepared:

1. Make sure you have solved [exercise 1](#exercise-1) before your start. You need to have a working React application that displays kommuner on a map
2. You don't have to have created a Heroku application, but it can be fun to show your work if you have

### Interactions with the map

- The user should be able to focus on their own position
- The user should be able to toggle display of kommune layer on and off
- When the user clicks on the map with kommuner on, an overlay should show the name of the clicked feature
- The system should show a list of features in an aside
- When the user changes the view, the list of features in the aside should reflect what the user sees
- When the user hovers on a feature in the map, the feature should be highlighted in the aside
- When the user hovers on a feature in the aside, the feature should be highlighted in the map

## Tips:

- In order to display a map with OpenLayers, you have to create a Map object with a View and at least one layer.
  The view must have center and zoom
- You can use `new OSM()` (for Open Street Maps) as your first layer
- Make sure you call the OpenLayers function `useGeographic()` at the top of your file. Otherwise, positions will be
  displayed as meters from the equator instead of degrees latitude and longitude
- If things are working weird, make sure you have `import {Map} from "ol"`, as there is a core JavaScript object that
  is also called `Map`. Also, avoid calling your React component ~~`Map`~~ (as I once did and struggled with for a
  long time)
- To deal with clicks, use `map.on` to add an event handler (and `map.un` to remove it) and use
  `layer.getSource().getFeaturesAtCoordinate()` to find the clicked feature

</details>