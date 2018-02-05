# Next.js + Typescript

Use [Graphql](http://graphql.org/) files with [Next.js](https://github.com/zeit/next.js)

## Installation

```sh
npm install --save @zeit/next-graphql
```

or

```sh
yarn add @zeit/next-graphql
```

## Usage

Create a `next.config.js` in your project

```js
// next.config.js
const withGraphql = require('@zeit/next-graphql')
module.exports = withGraphql()
```

Optionally you can add your custom Next.js configuration as parameter

```js
// next.config.js
const withGraphql = require('@zeit/next-graphql')
module.exports = withGraphql({
  webpack(config, options) {
    return config
  }
})
```
