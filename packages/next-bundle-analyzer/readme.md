# Next.js + Webpack Bundle Analyzer

Use `webpack-bundle-analyzer` in your Next.js project

📢 **This repo is now deprecated and has been moved to [@next/bundle-analyzer](https://github.com/zeit/next.js/tree/canary/packages/next-bundle-analyzer)**

## Installation

```
npm install --save @zeit/next-bundle-analyzer
```

or

```
yarn add @zeit/next-bundle-analyzer
```

### Usage with environment variables

Create a next.config.js (and make sure you have next-bundle-analyzer set up)

```js
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

module.exports = withBundleAnalyzer({
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  }
});
```

Then you can run one of these commands:

```bash
# Build and analyze the back end server bundle
BUNDLE_ANALYZE=server yarn build

# Build and analyze the front end browser bundle
BUNDLE_ANALYZE=browser yarn build

# Build and analyze both server and browser
BUNDLE_ANALYZE=both yarn build

# Build and analyze neither server nor browser
yarn build
```

If you choose both then two different browser windows will open. One will be for the server bundle, one for the browser bundle.
