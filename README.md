## Setup and install

- [Nodejs](https://nodejs.org/en/): v10.13 or higher
- [Yarn](https://classic.yarnpkg.com/lang/en/): v1.x.x
- [Docker](https://www.docker.com/)

## Before clone

On window: Run command

```bash

git config --global core.eol lf
git config --global core.autocrlf false

```

### Environment Variables

- `DATABASE_PORT`: `number` default `5432`
- `DATABASE_HOST`: `string` default `localhost`
- `DATABASE_USER`: `string`
- `DATABASE_PASSWORD`: `string`
- `DATABASE_NAME`: `string`
- `DATABASE_SYNC`: `true` | `false`
- `DATABASE_LOGGING`: `true` | `false`
- `JWT_SECRET`: `string`
- `DASHBOARD_DOMAIN`: `string`
- `WEB_DOMAIN`: `string`

## Development Available Scripts

In the project directory, you can run:

### `yarn typeorm:migration:create {migration_name}`

Create a migration.<br>

### `yarn migration:run`

Run all the migration files.<br>

### `yarn start:dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>

### `yarn build`

Builds the app for production to the `.next` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `yarn start:prod`

Start production
