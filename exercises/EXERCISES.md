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

<details open>

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
   1. `npm i -D vite`
   2. `npm i react react-dom`
   3. `npm pkg set scripts.dev=vite`
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

There is one tricky step to deployment - your application must run on `https://<your github username>.github.io/<your repository name>`.
For this to work, you must run it locally at `http://localhost:5173/<your repository name>`.

1. Create a `vite.config.js` file that specifies your base path:
   ```js
    import { defineConfig } from "vite";
    
    export default defineConfig({
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
2. Install TypeScript: `npm i -D typescript`
3. Setup TypeScript's `tsconfig.json`-file: `npx tsc --init --jsx react`
4. Format `tsconfig.json`-file: `npx prettier --write tsconfig.json`
5. Add TypeScript checking to the `npm test`: `npm pkg set scripts.test="tsc --noEmit && prettier --check ."`
6. Rename `src/App.jsx` to `src/App.tsx`

You now get a lot of errors when you run `npm test`. Here is how to fix them:

1. Install the TypeScript definitions for React and React-DOM: `npm install -D @types/react @types/react-dom`
2. Define the TypeScript types in `App.tsx`. A good place to start is with defining the type of PRODUCTS:
   ```tsx
   type Product = (typeof PRODUCTS)[number];

   function FilterableProductTable({ products }: { products: Product[] }) {
    // ...
   }
   ```
3. `function ProductRow`:
   ```tsx
   function ProductRow({ product }: { product: Product }) {
     // ..
   }
   ```
4. `function ProductCategoryRow`:
   ```tsx
   function ProductCategoryRow({ category }: { category: ReactNode }) {
     // ..
   }
   ```
5. `function ProductCategoryRow`:
   ```tsx
   function ProductTable({ products }: { products: Product[] }) {
     const rows: ReactNode[] = [];
     let lastCategory: ReactNode = null;
     // ..
   }
   ```
6. `npm test` should now run without error
7. Rename `main.tsx` and update the reference to this in `index.html`. This should leave you with one simple issue to fix
8. Commit and push the branch
9. In GitHub go to Pull requests and press New pull request
10. The other developer can now view the pull request, comment and ultimately merge the pull request into main
11. GitHub Actions will build the project based on which trigger (`on`) rules you have defined. You should try to customize this to only deploy when the pull request is merged

### Develop a feature on a branch

1. Create a new branch (as in the last step)
2. Right-click the `main` branch in the Git Windows and select "New branch from main..."
3. Enter a branch name
4. Develop the [FilterableProductTable](https://react.dev/learn/thinking-in-react#step-3-find-the-minimal-but-complete-representation-of-ui-state) feature in the React tutorial
5. Commit and push as normal
6. Create a pull request, do a code review and merge the pull request

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

## Exercise 4
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
