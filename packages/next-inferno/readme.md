# Next.js + preact

Use [Inferno](https://infernojs.org) with [Next.js](https://github.com/zeit/next.js)

## Installation

```
npm install --save @zeit/next-inferno inferno inferno-compat inferno-clone-vnode inferno-create-class inferno-create-element
```

or

```
yarn add @zeit/next-inferno inferno inferno-compat inferno-clone-vnode inferno-create-class inferno-create-element
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
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

app.prepare()
.then(() => {
  createServer(handle)
  .listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
```

Then add or change "scripts" section of your `package.json`:
```json
...
"scripts": {
  "dev": "node server.js",
  "build": "next build",
  "start": "NODE_ENV=production node server.js"
},
...
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
``