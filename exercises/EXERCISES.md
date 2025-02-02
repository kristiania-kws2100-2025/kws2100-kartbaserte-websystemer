# KWS2100 Kartbaserte Websystemer Exercises

## Exercise 1
###  Display a map in React

<details>

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
### Developing, verifying and deploying an application with Github

<details>

The goal of this exercise is the following:

- You should be able to display a React application in the web browser
- When you make a change to the application, you should see this change automatically
- The resulting application should be built with vite to a distribution folder
- You should be able to push changes to the web
- When you introduce an error, you don't want to break a working website
- You want to avoid introducing errors in the first place
- You should be able to cooperate with your team in a structured way

In the exercise, we will follow the official [Thinking in React](https://react.dev/learn/thinking-in-react) tutorial, and add TypeScript, GitHub and code reviews.

### Step 1: Create and commit a simple React application

1. [Create a new repository](https://github.com/new) on GitHub
2. In IntelliJ, select ☰ > File > New Project from Version Control and copy your new GitHub repo as the URL 
3. Create the `package.json` files for your React application and a dev-script
   1. `npm init -y`
   2. `npm i -D vite`
   3. `npm i react react-dom`
   4. `npm pkg set scripts.dev=vite`
4. Open `package.json` in IntelliJ and press the green "play button" by "dev"
5. Click on the URL in the console output to open a 404 page to the app
6. Create `index.html` (ideally, you use the `doc` template, but this is the minimal code needed)
    ```html
    <div id="root"></div>
    <script src="src/main.jsx" type="module"></script>
    ```
7. Create `src/main.jsx`:
    ```jsx
    import {createRoot} from "react-dom/client";
    import React from "react";

    createRoot(document.getElementById("root")).render(<h1>Hello World</h1>);
   ```
8. Commit and push the code

### Start collaboration

1. Join up with another student and share their project. One student should create a new IntelliJ project from the repository of the other (see step 2)
2. Add a GitHub Action New workflow at GitHub.com. Search for the Node.js template
3. This workflow will fail because you are missing a `test` script
4. Add a test script to execute [Prettier](https://prettier.io/)
   1. `npm i -D prettier`
   2. `npm pkg set scripts.test="prettier --check ."`
5. Run `npm test` locally. This is the same as what GitHub will run. This will fail because your code formatting isn't pretty yes
6. Run `npx prettier --write .` to fix your code formatting
7. Commit to Git and push
8. The project should now build with GitHub

To avoid commiting with errors, you should install the Prettier IntelliJ plugin:

1. Open IntelliJ Settings, go to Plugins, search for and install Prettier
2. Open IntelliJ Settings, go to Languages & Frameworks > JavaScript > Prettier and enable the prettier configuration (either Automatic or Manual)
3. Open your `package.json`-file, right click and select Apply Prettier Code Style Rules

### Deploy your application with GitHub pages

There is one tricky step to deployment. When your repository is named for example `https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer`,
GitHub pages will deploy to `https://kristiania-kws2100-2025.github.io/kws2100-kartbaserte-websystemer`. By default your JavaScript will be loaded from files like `/asset.js`, but GitHub pages will move this file to a subdirectory. To fix, this you have to instruct Vite to locate your application in a subdirectory, by specifying the `base` configuration property.

1. Create a `vite.config.js` file that specifies your base path:
   ```js
    import { defineConfig } from "vite";
    
    export default defineConfig({
      // Change "/my-repo" to be the name of your GitHub repository. For example
      // when my code is at https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/
      // I should have `base: "/kws2100-kartbaserte-websystemer"`
      base: "/my-repo",
    });
   ```
2. Add a build script:
   - `npm pkg set scripts.build="vite build"`
3. Test this out by running `npm run build`. This should create some files under `dist/`. Add `dist/` to `.gitignore`
4. Add GitHub pages deployment scripts to your workflow file (under `.github/workflows/`)
   ```yaml
   # Most of the file is unchanged
   
   steps:
      # ...
      # keep the existing steps and add the following
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
      - uses: actions/deploy-pages@v4
   ```
5. You also have to give your workflow permissions to update GitHub pages for your project:
   ```yaml
   # Most of the file is unchanged
   
    # Add to the job section (under the jobs: keyword, at the same level as `steps` and `runs-on`)
    permissions:
      id-token: write
      pages: write
   ```
6. Turn on GitHub pages in your repository on GitHub: Under Settings > Pages, update Build and deployment > Source to be "GitHub Actions"
7. Commit and push the changes to `package.json`, `vite.config.js`, `.gitignore` and your workflow under `.github/workflows/`

Your project should now be deployed and available on the web.

### Do some React development

Follow the official [Thinking in React](https://react.dev/learn/thinking-in-react) tutorial, and add TypeScript, GitHub and code reviews.

1. You can copy the code from "Step 2: Build a static version in React" into a file named `App.jsx`, but add the React import line to the top:
   - `import React from "react"`
2. Update `main.jsx` to use `App.jsx`
    ```jsx
    import { createRoot } from "react-dom/client";
    import React from "react";
    import App from "./App";
    
    createRoot(document.getElementById("root")).render(<App />);
   ```
3. When you have gotten the code to work locally, you can commit and push and the application should update

### Introduce TypeScript on a branch

1. In IntelliJ: Go to the Git view ☰ > View > Tool Windows > Git
2. Right-click the `main` branch in the Git Windows and select "New branch from main..."
3. Enter a branch name
4. Install TypeScript: `npm i -D typescript`
5. Setup TypeScript's `tsconfig.json`-file: `npx tsc --init --jsx react`
6. Format `tsconfig.json`-file: `npx prettier --write tsconfig.json`
7. Add TypeScript checking to the `npm test`: `npm pkg set scripts.test="tsc --noEmit && prettier --check ."`
8. Rename `src/App.jsx` to `src/App.tsx`

You now get a lot of errors when you run `npm test`. Here is how to fix them:

1. Install the TypeScript definitions for React and React-DOM: `npm install -D @types/react @types/react-dom`
2. Define the TypeScript types in `App.tsx`. `function ProductCategoryRow`:
   ```tsx
   function ProductCategoryRow({ category }: { category: ReactNode }) {
      return (
        <tr>
          <th colSpan={2}>{category}</th>
        </tr>
      );
   }
   ```
3. For `function ProductRow`, you need to define the Product type based on PRODUCTS:
   ```tsx
   type Product = (typeof PRODUCTS)[number];

   function ProductRow({ product }: { product: Product }) {
     // ..
   }
   ```
4. `function ProductTable`:
   ```tsx
   function ProductTable({ products }: { products: Product[] }) {
     const rows: ReactNode[] = [];
     let lastCategory: ReactNode = null;
     // ..
   }
   ```
5. `function FilterableProductTable`:
   ```tsx
   function FilterableProductTable({ products }: { products: Product[] }) {
    // ...
   }
   ```
6. `npm test` should now run without error
7. Rename `main.tsx` and update the reference to this in `index.html`. This should leave you with one simple issue to fix
8. Commit and push the branch
9. In GitHub go to Pull requests and press New pull request
10. The other developer can now view the pull request, comment and ultimately merge the pull request into main
11. GitHub Actions will build the project based on which trigger (`on`) rules you have defined. You should try to customize this to only deploy when the pull request is merged
12. To avoid commiting changes with TypeScript errors, you can install [Husky](https://typicode.github.io/husky/) which runs `npm test` for you before each commit
    1. `npm install -D husky`
    2. `npx husky init`

### Develop a feature on a branch

1. Create a new branch (as in the last step)
2. Develop the [FilterableProductTable](https://react.dev/learn/thinking-in-react#step-3-find-the-minimal-but-complete-representation-of-ui-state) feature in the React tutorial
3. Commit and push as normal
4. Create a pull request, do a code review and merge the pull request

### Implement multiple languages by using TypeScript

The browser lets you determine the users preferred language by using `navigator.language` (when the user changes this, you can detect this by listening to `"languagechange"`).

You can use this to localize the texts in the UI by using React's context mechanism together with TypeScript. The details are left as part of the exercise, but here is an example of the effect we want:

```tsx
function SearchBar(/* ... parameter definition ... */) {
  const applicationText = useContext(ApplicationTextContext);
  return (
    <form>
      <input
        // ...  other attributes
        placeholder={applicationText.actions.searchPlaceholder}
      />
      <label>
        <input
            // ... other attributes
        />
        {applicationText.actions.onlyShowStock}
      </label>
    </form>
  );
}
```


</details>

## Exercise 3
### Interact with polygon elements

<details>

### Be prepared:

1. Make sure you have solved [exercise 1](#exercise-1) before your start. You need to have a working React application that displays kommuner on a map
2. You don't have to have published an application to the Internet with [exercise 2](#exercise-2), but it can be fun to show your work if you can

### Interactions with the map

- The user should be able to focus on their own position
- The user should be able to toggle display of kommune layer on and off
- When the user clicks on the map with kommuner on, an overlay should show the name of the clicked feature

Optional (this will probably be the topic for a later lecture)
  
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

## Exercise 4
### Change the background layer of your map

<details>

### Preparations

1. Create a repository in your GitHub account and clone into IntelliJ
2. [Create a React Application](../README.md#creating-a-react-application) as described in the reference material
3. Add a minimal [`index.html`](../README.md#minimal-indexhtml) and [`src/main.tsx`](../README.md#minimal-srcmaintsx) file
4. Optionally, add [`.vite.config.ts`](../README.md#minimal-viteconfigts) and [`.github/workflows/publish-to-pages.yaml`](../README.md#minimal-githubworkflowspublish-to-github-pagesyml)
   to deploy your application to GitHub pages
5. [Add a basic OpenLayers Map](../README.md#creating-a-openlayers-map-in-react) to your application

You should now have a basic OpenLayers application

### The goal of the exercise

Implement a select that lets you pick between OpenStreetMap, Stadia, Ortophoto of Norway and an Arctic map.

### How to do it

1. Change `layers` so it's a React state instead of a property to initialize the `Map` object
   ```tsx
   const osmLayer = new TileLayer({source: new OSM()});
   
   export function Application() {
     // 
     const [baseLayer, setBaseLayer] = useState<Layer>(osmLayer);
     useEffect(() => map.setLayers([baseLayer]), [baseLayer]);
     // ... the current implementation goes here
   }
   ```
2. Implement a `<select />` that calls `setBaseLayer` to change the background layer. You can use
   [StadiaMaps](https://openlayers.org/en/latest/apidoc//module-ol_source_StadiaMaps-StadiaMaps.html)
   `const statiaLayer = new TileLayer({ source: new StadiaMaps({ layer: "alidade_smooth_dark" }) })` as the other
   layer
3. Implement an `<option>` in the select that uses [kartverkets topo background layer](https://kartkatalog.geonorge.no/metadata/topografisk-norgeskart-wmts--cache/8f381180-1a47-4453-bee7-9a3d64843efa)
   (note: this may be slow!). You must load the map definitions using the definition of the map, so you need some extra loading code:
   ```tsx
    import { optionsFromCapabilities } from "ol/source/WMTS";
    import { WMTSCapabilities } from "ol/format";
    const parser = new WMTSCapabilities();
    const kartverketTopoLayer = new TileLayer();
    fetch("https://cache.kartverket.no/v1/wmts/1.0.0/WMTSCapabilities.xml").then(
      async function (response) {
        const result = parser.read(await response.text());
        const options = optionsFromCapabilities(result, {
          layer: "toporaster",
          matrixSet: "webmercator",
        });
        kartverketTopoLayer.setSource(new WMTS(options!));
      },
    ); 
   ```
4. Implement an `<option>` for [aerial photos of Norway](https://kartkatalog.geonorge.no/metadata/norge-i-bilder-wmts-euref89-utm33/072662f8-41c9-4e9a-a55a-343dee0c3f84).
   **This is trickier than the last step**. The URL is `http://opencache.statkart.no/gatekeeper/gk/gk.open_nib_utm33_wmts_v2?SERVICE=WMTS&REQUEST=GetCapabilities`,
  `{ layer: "Nibcache_UTM33_EUREF89_v2", matrixSet: "default028mm", }`. However, this map has a projection that isn't supported by OpenLayers by default.
  In order to add projections support:
    - `npm install proj4`
    - `npm install -D @types/proj4`
    - Import proj4 in your code: `import proj4 from "proj4";`
    - Add the following code to define the projection: `proj4.defs([["EPSG:25833", "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"]])`
      (I got this from [EPSG.io](https://epsg.io/25833))
    - Add the projection definitions to OpenLayers: `register(proj4);`
5. Implement an `<option>` for [a polar projection](https://arctic-sdi.org/services/topografic-basemap/). For unknown
   reasons, the WMTS definition of this map doesn't support Cross-Origin Resource Sharing so you can't request it in your
   application. Instead, download the XML-file and save it as `public/wmts/arctic-sdi.xml`.
    - Use the options `{ layer: "arctic_cascading", matrixSet: "3575", }`
    - Add the projection definition to the `proj4.defs` call: `["EPSG:3575", "+proj=laea +lat_0=90 +lon_0=10 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs +type=crs"]`
6. The arctic map looks unimpressive and somewhat strange. This is because the OpenLayers view currently is 
   Mercator-projection. It reshapes the arctic conic tiles to the Mercator cylindrical projection. To fix this, we need
   OpenLayers to change the view when the projection changes.
    - Instead of initializing the `view` option when creating the map, convert the view to `useState`:
      `const [view, setView] = useState(new View({ center: [10.8, 59.9], zoom: 7 }));`
    - Update the map view when the view is replaced: `useEffect(() => map.setView(view), [view])`
    - Pass the `setView` variable to the BaseLayerSelect: `<BaseLayerSelect setBaseLayer={setBaseLayer} setView={setView} />`
    - In the BaseLayerSelect, update the view when a new baseLayer is selected: 
      `useEffect(() => setView((v) => new View({ center: v.getCenter(), zoom: v.getZoom(), projection: selectedLayer.getSource()?.getProjection() }), [selectedLayer])`

### Additional task: Combine selecting a base layer with adding additional layers

In [exercise 3](#exercise-3) you added checkboxes for adding municipalities and schools to the map. Try to combine
the additional layers with the base layer selection.

### Additional task: Change the background map based on the user color theme

By using `window.matchMedia("(prefers-color-scheme: dark)")` you can determine whether the
user has enabled a dark color theme. You can `addEventListener` to the result of this call to
be updated when the user changes their settings.

Can you variate the Stadia map theme between for example `alidade_smooth_dark` and `alidade_smooth` based on the
user's preferences?


</details>

## Exercise 5
#### Reading vector layers from a database

<details open>
The goals of this exercise is to use the old administrative borders to select a list of schools to show on a map.

Use the following sources:

- [Administrative enheter - fylker (2023)](https://kartkatalog.geonorge.no/metadata/administrative-enheter-fylker-historiske-data-2023/7284fe8e-fed6-4172-ae56-a7f7c9fd4759)
- [Grunnskoler](https://kartkatalog.geonorge.no/metadata/grunnskoler/db4b872f-264d-434c-9574-57232f1e90d2)

**Instructions:**

### Preparations

You can continue on a previous repository or add a new one

1. Create a repository in your GitHub account and clone into IntelliJ
2. [Create a React Application](../README.md#creating-a-react-application) as described in the reference material
3. Add a minimal [`index.html`](../README.md#minimal-indexhtml) and [`src/main.tsx`](../README.md#minimal-srcmaintsx) file
4. Optionally, add [`.vite.config.ts`](../README.md#minimal-viteconfigts) and [`.github/workflows/publish-to-pages.yaml`](../README.md#minimal-githubworkflowspublish-to-github-pagesyml)
   to deploy your application to GitHub pages
5. [Add a basic OpenLayers Map](../README.md#creating-a-openlayers-map-in-react) to your application

### Install the datasets into PostgreSQL

In order to query datasets, you need to have a database server. The easiest option is to do this with Docker.

1. If you haven't already done so, install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Create a `docker-compose.yaml` file defining your docker dependencies
   ```yaml
    services:
      postgis:
        container_name: postgis
        image: postgis/postgis
        environment:
          POSTGRES_PASSWORD: "postgres"
          POSTGRES_HOST_AUTH_METHOD: "trust"
        ports:
          - "5432:5432"
   ```
3. Start Postgis by running `docker compose up --detach` (you can also add a command to do this in your `package.json`)
4. Download the school dataset (I got the URL from [Geonorge](https://kartkatalog.geonorge.no/metadata/grunnskoler/db4b872f-264d-434c-9574-57232f1e90d2):
   * Install the `download` NPM command for your scripts: `npm install -D download-cli`
   * `npm pkg set scripts.db:schools="npm run db:schools:download && npm run db:schools:import"`
   * `npm pkg set scripts.db:schools:download="download --extract --out tmp/ https://nedlasting.geonorge.no/geonorge/Befolkning/Grunnskoler/PostGIS/Befolkning_0000_Norge_25833_Grunnskoler_PostGIS.zip"`
   * `npm pkg set scripts.db:schools:import="docker exec -i /postgis /usr/bin/psql --user postgres < tmp/Befolkning_0000_Norge_25833_Grunnskoler_PostGIS.sql"`
   * `npm run db:schools`
5. You can now add Postgresql as a data source in IntelliJ. Be sure to include the skole_* schema.
6. You can now experiment with querying for schools
7. Repeat step 4 for [the old county boundaries](https://kartkatalog.geonorge.no/metadata/administrative-enheter-fylker-historiske-data-2023/7284fe8e-fed6-4172-ae56-a7f7c9fd4759)

### Creating a server application with Hono

1. Create a directory to hold the server: `mkdir server`
2. Go into the server directory: `cd server`
3. Create a new package.json for the server: `npm init -y`
4. Install the server library: `npm install hono @hono/node-server`
5. Install Typescript executor to run ts files from in a Node application: `npm install -D tsx`
6. Create a start script for the server: `npm pkg set scripts.dev="tsx --watch server.ts"`

Create a minimal `server/server.ts` file:

```typescript
import { Hono } from "hono";
import { serve } from "@hono/node-server";
const app = new Hono();
app.get("/api/hello", async (c) => {
  return c.text("Hello World!");
});
serve(app);
```
Start the server by running `npm run dev` in the `server/`-directory and check the results at http://localhost:3000/api/hello

#### Serve GeoJSON from Hono

This is the hardest part and some assembly is necessary:

1. You have to update `vite.config.ts` to point to the Hono server
2. You have to change the Vector Layer source to use a Hono-served URL
3. You have to create a `app.get` endpoint in Hono that returns a FeatureCollection

See the [lecture reference code](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer/tree/reference/05)
for hints


</details>



## Exercise 6
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
