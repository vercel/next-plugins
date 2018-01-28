# Next.js + Typescript

Use [preact](https://preactjs.com/) with [Next.js](https://github.com/zeit/next.js)

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
  }
})
```
