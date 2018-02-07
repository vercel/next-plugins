# Next.js + Webpack Bundle Analyzer

Use `webpack-bundle-analyzer` in your Next.js project

## Installation

```
npm install --save @zeit/next-bundle-analyzer
```

or

```
yarn add @zeit/next-bundle-analyzer
```

### Usage with @zeit/next-css and environment variables

Create a next.config.js (and make sure you have next-css set up)

```js
const withCSS = require("@zeit/next-css");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = withBundleAnalyzer({
  ...withCSS({
    cssModules: true
  }),
  serverBundleAnalyzerPlugin:
    ["server", "both"].includes(process.env.BUNDLE_ANALYZE) &&
    new BundleAnalyzerPlugin({
      analyzerMode: "server",
      analyzerPort: 8888,
      openAnalyzer: true
    }),
  browserBundleAnalyzerPlugin:
    ["browser", "both"].includes(process.env.BUNDLE_ANALYZE) &&
    new BundleAnalyzerPlugin({
      analyzerMode: "server",
      analyzerPort: 8889,
      openAnalyzer: true
    })
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

# Build and and analyze neither server nor browser
yarn build
```

If you choose both then two different browser windows will open. One will be for the server bundle, one for the browser bundle.

The plugin itself is zero config so it does not look at environment variables and will always run unless you set either browserBundleAnalyzerPlugin or serverBundleAnalyzerPlugin to false in the config. The above example shows you how to do this using environment variables.
