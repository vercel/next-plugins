const moduleAlias = require('module-alias')

module.exports = () => {
  moduleAlias.addAlias('react', __dirname + '/preact-compat')
  moduleAlias.addAlias('react-dom', 'preact-compat')
}
