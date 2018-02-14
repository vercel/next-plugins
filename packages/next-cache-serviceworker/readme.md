# Next.js + Cache Service Worker

Create a cache servie worker for your  Next.js project

## Installation

```
npm install --save @zeit/next-cache-serviceworker
```

or

```
yarn add @zeit/next-cache-serviceworker
```

## Usage

You can pass:

* cacheId, default `nextjscache`, to spefic the name of the cache
* runtimeCaching, default `[]`, to spefic the name of the type of the caching sistem (`networkFirst`, `fastest`)
* staticFileGlobs, default `['static']`,  to spefic the path of the static files to cache

```js
// next.config.js
const withCacheSW = require('@zeit/next-cache-serviceworker')
module.exports = withCacheSW({
  cacheId, 'mynicecachev1',
  runtimeCaching: [
    {
      handler: 'fastest',
      urlPattern: /[.](png|jpg|css)/
    },
    {
      handler: 'networkFirst',
      urlPattern: /^http.*/
    }
  ],
  staticFileGlobs: [
    'static/**/*'
  ],
})
```

### Production usage

In production the service worker will be `minified` 

### General Usage

You also need to activate the `sw.js` that will be created into `/static/sw.js`

I'd also recommend serving the serviceworker directly from your server's `/sw.js` route with a specific route to make it work on all the paths of your application
