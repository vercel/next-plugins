# Next.js + Source Maps

Generate source maps during production build in your Next.js project

## Installation

```
npm install --save @zeit/next-source-maps
```

or

```
yarn add @zeit/next-source-maps
```

### Usage with environment variables

Create a next.config.js (and make sure you have next-css set up)

```js
// next.config.js
const withSourceMaps = require('@zeit/next-source-maps')
module.exports = withSourceMaps({
  webpack(config, options) {
    return config
  }
})
```

Then you can run a regular build command:

```bash
npm run build
```
