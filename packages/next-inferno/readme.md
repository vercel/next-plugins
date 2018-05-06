# Next.js + inferno

Use [inferno](https://infernojs.org/) with [Next.js](https://github.com/zeit/next.js)

## Installation

```
npm install --save @zeit/next-inferno inferno inferno-compat inferno-server inferno-clone-vnode inferno-create-class inferno-create-element
```

or

```
yarn add @zeit/next-inferno inferno inferno-compat inferno-server inferno-clone-vnode inferno-create-class inferno-create-element
```

## Usage

Create a `next.config.js` in your project

```js
// next.config.js
const withInferno = require('@zeit/next-inferno')
module.exports = withInferno()
```

Then create a `server.js`

```js
// server.js
require('@zeit/next-inferno/alias')()
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
const withInferno = require('@zeit/next-inferno')
module.exports = withInferno({
  webpack(config, options) {
    return config
  }
})
```
