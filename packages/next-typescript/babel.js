module.exports = () => {
  return {
    presets: [require('@babel/preset-typescript'), { 
      "isTSX": true,
      "allExtensions": true
    }]
  }
}
