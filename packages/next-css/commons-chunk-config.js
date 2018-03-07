module.exports = (config, test = /\.css$/) => {
  // Extend the default CommonsChunkPlugin config
  config.plugins = config.plugins.map(plugin => {
    if (
      plugin.constructor.name === 'CommonsChunkPlugin' &&
      (plugin.filenameTemplate === 'commons.js' || plugin.filenameTemplate === 'main.js')
    ) {
      const defaultMinChunks = plugin.minChunks
      plugin.minChunks = (module, count) => {
        // Move all styles to commons chunk so they can be extracted to a single file
        if (module.resource && module.resource.match(test)) {
          return true
        }
        // Use default minChunks function for non-style modules
        return defaultMinChunks(module, count)
      }
    }
    return plugin
  })
  return config
}
