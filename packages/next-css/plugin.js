const { Template } = require('webpack')
const { ConcatSource } = require('webpack-sources')

function NextCSSPlugin() {}

NextCSSPlugin.prototype.apply = function(compiler) {
  compiler.hooks.compilation.tap('NextCSSPlugin', compilation => {
    const { mainTemplate, moduleTemplates } = compilation
    moduleTemplates.javascript.hooks.render.intercept({
      register(tapInfo) {
        if (tapInfo.name === 'PagesPluginRenderPageRegister') {
          const originalMethod = tapInfo.fn
          tapInfo.fn = (moduleSourcePostModule, module, options) => {
            const { chunk } = options
            if (chunk.entryModule !== module) {
              return moduleSourcePostModule
            }

            const files = chunk.files.filter(file => /\.css$/.test(file))
            let source = moduleSourcePostModule
            if (files.length > 0) {
              source = new ConcatSource(
                Template.indent([
                  'window.__NEXT_CSS_LOADED_CHUNKS__ = window.__NEXT_CSS_LOADED_CHUNKS__ || {};',
                  `if (window.__NEXT_CSS_LOADED_CHUNKS__[${chunk.id}] !== 0) {`,
                  Template.indent([
                    `window.__NEXT_CSS_LOADED_CHUNKS__[${
                      chunk.id
                    }] = new Promise(function(resolve, reject) {`,
                    Template.indent([
                      `var href = ${JSON.stringify(files[0])};`,
                      `var fullhref = ${mainTemplate.requireFn}.p + href;`,
                      'var existingLinkTags = document.getElementsByTagName("link");',
                      'for(var i = 0; i < existingLinkTags.length; i++) {',
                      Template.indent([
                        'var tag = existingLinkTags[i];',
                        'var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");',
                        'if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();'
                      ]),
                      '}',
                      'var existingStyleTags = document.getElementsByTagName("style");',
                      'var existingStyleTags = document.getElementsByTagName("style");',
                      'for(var i = 0; i < existingStyleTags.length; i++) {',
                      Template.indent([
                        'var tag = existingStyleTags[i];',
                        'var dataHref = tag.getAttribute("data-href");',
                        'if(dataHref === href || dataHref === fullhref) return resolve();'
                      ]),
                      '}',
                      'var linkTag = document.createElement("link");',
                      'linkTag.rel = "stylesheet";',
                      'linkTag.type = "text/css";',
                      'linkTag.onload = resolve;',
                      'linkTag.onerror = function(event) {',
                      Template.indent([
                        'var request = event && event.target && event.target.src || fullhref;',
                        'var err = new Error("Loading CSS " + href + " failed.\\n(" + request + ")");',
                        'err.request = request;',
                        'reject(err);'
                      ]),
                      '};',
                      'linkTag.href = fullhref;',
                      'var head = document.getElementsByTagName("head")[0];',
                      'head.appendChild(linkTag);'
                    ]),
                    '})',
                    Template.indent([
                      '.then(function() {',
                      Template.indent([
                        `window.__NEXT_CSS_LOADED_CHUNKS__[${chunk.id}] = 0;`
                      ]),
                      '})'
                    ])
                  ]),
                  '}',
                  ''
                ]),
                moduleSourcePostModule
              )
            }
            return originalMethod(source, module, options)
          }
        }
        return tapInfo
      }
    })
  })
}

module.exports = NextCSSPlugin
