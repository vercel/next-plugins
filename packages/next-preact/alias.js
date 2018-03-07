const moduleAlias = require('module-alias')

module.exports = () => {
  moduleAlias.addAlias('react/cjs/react.production.min.js', 'preact-compat/dist/preact-compat.min.js')
  moduleAlias.addAlias('react-dom/cjs/react-dom.production.min.js', 'preact-compat/dist/preact-compat.min.js')
  moduleAlias.addAlias('react', 'preact-compat')
  moduleAlias.addAlias('react-dom', 'preact-compat')
}
