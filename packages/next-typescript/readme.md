# Next.js + Typescript

Use [Typescript](https://www.typescriptlang.org/) with [Next.js](https://github.com/zeit/next.js)

> This plugin uses `ts-loader`. If you want to load your files through `awesome-typescript-loader`, e.g. for performance reasons, you can use [`next-awesome-typescript` plugin](https://github.com/saitonakamura/next-awesome-typescript)

## Installation

```
npm install --save @zeit/next-typescript typescript
```

or

```
yarn add @zeit/next-typescript typescript
```

## Usage

Create a `next.config.js` in your project

```js
// next.config.js
const withTypescript = require('@zeit/next-typescript')
module.exports = withTypescript()
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

Optionally you can add your custom Next.js configuration as parameter

```js
// next.config.js
const withTypescript = require('@zeit/next-typescript')
module.exports = withTypescript({
  webpack(config, options) {
    return config
  },
  typescriptLoaderOptions: {
    transpileOnly: false
  }
})
```

### Type checking

If your IDE or code editor don't provide satisfying TypeScript support, or you want to see error list in console output, you can use ``fork-ts-checker-webpack-plugin`](https://github.com/Realytics/fork-ts-checker-webpack-plugin). It will not increase compile time because it forks type checking in a separate process

```js
// next.config.js
const withTypescript = require("@zeit/next-typescript")
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withTypescript({
  webpack(config, options) {
    // Do not run type checking twice:
    if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin())
    
    return config
  }
})
```
