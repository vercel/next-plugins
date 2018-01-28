const path = require('path')
const findUp = require('find-up')
module.exports = (config, extractPlugin, {cssModules = false, dev, isServer}) => {    
  const cssLoader = {
    loader: isServer ? 'css-loader/locals' : 'css-loader',
    options: {
      modules: cssModules,
      minimize: !dev,
      sourceMap: dev,
      importLoaders: 1
    }
  }

  const postcssConfig = findUp.sync('postcss.config.js', {cwd: config.context})  
  let postcssLoader = false

  if(postcssConfig) {
    postcssLoader = {
      loader: 'postcss-loader',
      options: {
        config: {
          path: postcssConfig
        }
      }
    }
  }

  function cssLoaderConfig (loader = false) {
    // When not using css modules we don't transpile on the server
    if(isServer && !cssLoader.options.modules) {
      return ['ignore-loader']
    }

    // When on the server and using css modules we transpile the css
    if(isServer && cssLoader.options.modules) {
      return [
        cssLoader,
        postcssLoader,
        loader
      ].filter(Boolean)
    }

    return extractPlugin.extract({
      use: [cssLoader, postcssLoader, loader].filter(Boolean),
      // Use style-loader in development
      fallback: {
        loader: 'style-loader',
        options: {
          sourceMap: dev,
          importLoaders: 1
        }
      }
    })
  }

  return cssLoaderConfig
}