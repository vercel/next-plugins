const findUp = require('find-up')

module.exports = (
  config,
  extractPlugin,
  { cssModules = false, cssLoaderOptions = {}, dev, isServer, loaders = [] }
) => {
  const postcssConfig = findUp.sync('postcss.config.js', {
    cwd: config.context
  })
  let postcssLoader

  if (postcssConfig) {
    postcssLoader = {
      loader: 'postcss-loader',
      options: {
        config: {
          path: postcssConfig
        }
      }
    }
  }

  const cssLoader = {
    loader: isServer ? 'css-loader/locals' : 'css-loader',
    options: Object.assign(
      {},
      {
        modules: cssModules,
        minimize: !dev,
        sourceMap: dev,
        importLoaders: loaders.length + (postcssLoader ? 1 : 0)
      },
      cssLoaderOptions
    )
  }

  // When not using css modules we don't transpile on the server
  if (isServer && !cssLoader.options.modules) {
    return ['ignore-loader']
  }

  // When on the server and using css modules we transpile the css
  if (isServer && cssLoader.options.modules) {
    return [cssLoader, postcssLoader, ...loaders].filter(Boolean)
  }

  return [
    dev && 'extracted-loader',
    ...extractPlugin.extract({
      use: [cssLoader, postcssLoader, ...loaders].filter(Boolean)
    })
  ].filter(Boolean)
}
