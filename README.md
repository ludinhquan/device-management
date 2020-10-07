## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

## Run the application

```sh
npm start
```

or:

```sh
npm run dev // for development
```

You can also run `node .` to skip the build step.

Open http://127.0.0.1:3000 in your browser.

## Swagger documents

```sh
https://127.0.0.1:3000/explorer
```

## Rebuild the project

To incrementally build the project:

```
npm run build
```

To force a full build by cleaning up cached artifacts:

```
npm run clean
npm run build
```

## Fix code style and formatting issues

If `eslint` and `prettier` are enabled for this project, you can use the
following commands to check code style and formatting issues.

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

## Other useful commands

- `npm run openapi-spec`: Generate OpenAPI spec into a file
