const path = require('path')
const moduleAlias = require('module-alias')

module.exports = () => {
  moduleAlias.addAlias('react', path.resolve(__dirname, './preact-compat.js'))
  moduleAlias.addAlias('react-dom', 'preact-compat')
}
