const moduleAlias = require('module-alias')
module.exports = function alias() {
  moduleAlias.addAlias('react', 'preact-compat')
  moduleAlias.addAlias('react-dom', 'preact-compat')
}
