const reactCompat = require('preact-compat')
const createContext = require('preact-context')

reactCompat.createContext = createContext.createContext

module.exports = reactCompat
