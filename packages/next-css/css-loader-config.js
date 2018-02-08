function getPostCssLoader(cwd) {
  // We require inside the function to not load at startup
  const postcssConfig = require('find-up').sync('postcss.config.js', {
    cwd
  })

  if (postcssConfig) {
    return {
      loader: 'postcss-loader',
      options: {
        config: {
          path: postcssConfig
        }
      }
    }
  }

  return false
}

module.exports = (
  config,
  extractPlugin,
  { cssToString = false, cssModules = false, dev, isServer, loaders = [] }
) => {
  // When not using css modules we don't transpile on the server
  if (isServer && !cssToString && !cssModules) {
    return ['ignore-loader']
  }

  config.externals = config.externals.map(external => {
    if (typeof external === 'function') {
      return (context, request, callback) => {
        if (request.match(/node_modules[/\\]css-loader/)) {
          return callback()
        }

        return external(context, request, callback)
      }
    }
    return external
  })

  const postcssLoader = getPostCssLoader(config.context)

  const cssLoader = {
    loader: !cssToString && isServer ? 'css-loader/locals' : 'css-loader',
    options: {
      modules: cssModules,
      minimize: !dev,
      sourceMap: dev,
      importLoaders: loaders.length + (postcssLoader ? 1 : 0)
    }
  }

  const appliedLoaders = [cssLoader, postcssLoader, ...loaders].filter(Boolean)

  // When using css.toString() we apply the loaders in dev + production and don't extract the css.
  // Because it's server rendered.
  if (cssToString) {
    return appliedLoaders
  }

  // When on the server and using css modules we transpile the css
  if (isServer && cssLoader.options.modules) {
    return appliedLoaders
  }

  const extractTextOptions = {
    use: appliedLoaders
  }

  // Use style-loader in development in the client bundle
  extractTextOptions.fallback = {
    loader: 'style-loader',
    options: {
      sourceMap: dev
    }
  }

  return extractPlugin.extract(extractTextOptions)
}
