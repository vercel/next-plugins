# Next.js + Typescript + Awesome typescript loader

Use [Typescript](https://www.typescriptlang.org/) with [Next.js](https://github.com/zeit/next.js) with [Awesome typescipt loader](https://github.com/s-panferov/awesome-typescript-loader)

## Installation

```
npm install --save @zeit/next-awesome-typescript typescript
```

or

```
yarn add @zeit/next-awesome-typescript typescript
```

## Usage

Create a `next.config.js` in your project

```js
// next.config.js
const withTypescript = require('@zeit/next-awesome-typescript')
module.exports = withAwesomeTypescript()
```

Create a `tsconfig.json` in your project

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "jsx": "preserve",
    "allowJs": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "removeComments": false,
    "preserveConstEnums": true,
    "sourceMap": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "typeRoots": [
      "./node_modules/@types"
    ],
    "lib": [
      "dom",
      "es2015",
      "es2016"
    ]
  }
}
```

You can pass options to `awesome-typescript-loader` as a first argument

```js
// next.config.js
const withAwesomeTypescript = require('@zeit/next-awesome-typescript')
const options = {
  useCheckerPlugin: false,
  loaderOptions: {
    errorsAsWarnings: true
  }
}
module.exports = withAwesomeTypescript(options)
```

Optionally you can add your custom Next.js configuration as second parameter

```js
// next.config.js
const withAwesomeTypescript = require('@zeit/next-awesome-typescript')
const options = {}
const nextConfiguration = {
  webpack: () => ({})
}
module.exports = withAwesomeTypescript(options, nextConfiguration)
```
