const moduleAlias = require('module-alias')

module.exports = () => {
  moduleAlias.addAlias('react', 'inferno-compat')
  moduleAlias.addAlias('react-dom', 'inferno-compat')
  moduleAlias.addAlias('react-dom/server', 'inferno-server')
}
