# Next.js + preact

Use [preact](https://preactjs.com/) with [Next.js](https://github.com/zeit/next.js)

## Installation

```
npm install --save @zeit/next-preact preact preact-compat
```

or

```
yarn add @zeit/next-preact preact preact-compat
```

## Usage

Create a `next.config.js` in your project

```js
// next.config.js
const withPreact = require('@zeit/next-preact')
module.exports = withPreact()
```

Then create a `server.js`

```js
// server.js
require('@zeit/next-preact/alias')()
const { createServer } = require('http')
const next = require('next')


const app = next({ dev: process.env.NODE_ENV !== 'production' })
const port = process.env.PORT || 3000
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  createServer(handle)
  .listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
```

Optionally you can add your custom Next.js configuration as parameter

```js
// next.config.js
const withPreact = require('@zeit/next-preact')
module.exports = withPreact({
  webpack(config, options) {
    return config
  }
})
```
