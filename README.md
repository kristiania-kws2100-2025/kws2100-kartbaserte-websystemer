# Demonstration of OpenLayers with PostGIS backend using Hono

## Creating a React + OpenLayers application

See [reference material](https://github.com/kristiania-kws2100-2025/kws2100-kartbaserte-websystemer?tab=readme-ov-file#creating-a-react-application)

1. Setup Vite + React + TypeScript + Prettier + Husky
2. Create `index.html` and `src/main.tsx`

## Setup data in Postgis

1. Use docker to run a Postgis container using `docker compose`
2. Import data from Geonorge.no using `download-cli` and `docker exec`
   - [Administrative enheter - fylker (2023)](https://kartkatalog.geonorge.no/metadata/administrative-enheter-fylker-historiske-data-2023/7284fe8e-fed6-4172-ae56-a7f7c9fd4759)
   - [Grunnskoler](https://kartkatalog.geonorge.no/metadata/grunnskoler/db4b872f-264d-434c-9574-57232f1e90d2)

## Create an API on the database using Hono

1. Create a `server` with a `package.json`
2. Install `hono`, `@hono/node-server` and `tsx`

## Deploying to Heroku

Heroku uses a Git repository as basis for deployment.
When you push your repository to Heroku git, Heroku runs
`npm install`, `npm run build` and `npm start` with a clean checkout
(so vite is not started, `node_modules` don't exist. In addition,
Heroku sets the environment variable `NODE_ENV` to `production`, which
changes the behavior of `npm install`)

We can simulate this by doing:

1. `git reset --hard`
2. `git clean -xf dist node_modules server/node_modules tmp`
3. `set NODE_ENV=production` (for Windows) or `export NODE_ENV=production` (for Mac and Linux)
4. `set PORT=5000` (for Windows) or `export PORT=5000` (for Mac and Linux)
5. `npm install --include=dev`
6. `npm run build`
7. `npm start`
8. Open `http://localhost:5000`

### We need to make some changes

- No longer serve under `/kws2100-kartbaserte-websystemer`

### Deploy to Heroku
