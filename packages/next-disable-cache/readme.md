# Next.js + No Babel Cache

Disable the caching feature of babel in in your Next.js project

See this [issue](https://github.com/zeit/next.js/issues/3164) for why this may be useful

## Installation

```
npm install --save @zeit/next-disable-cache
```

or

```
yarn add @zeit/next-disable-cache
```

## Usage


### Configuring Next.js

```js
// next.config.js
const withDisableCache = require('@zeit/next-disable-cache')
module.exports = withDisableCache()
```
Optionally, you can add your custom Next.js configuration as parameter

```js
// next.config.js
const withDisableCache = require('@zeit/next-disable-cache')
module.exports = withDisableCache({
  webpack(config, options) {
    return config
  }
})
```
