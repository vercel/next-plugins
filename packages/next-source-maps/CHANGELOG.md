# 0.1.0

## Features
- Ability to change source-map type ([#255](https://github.com/zeit/next-plugins/pull/255))

## Breaking Changes
- Plugin now needs to be called once. (Optionally with the pluginOptions object.)
  `const withSourceMaps = require('@zeit/next-source-maps')()` or
  `const withSourceMaps = require('@zeit/next-source-maps')({devtool})`
