/* eslint-disable new-cap */
const STYLE_COMPONENT = '_NextCSS'
const STYLE_MODULE = '@zeit/next-css/inline-style'

module.exports = function({ types: t }) {
  return {
    visitor: {
      Program: {
        enter(path, state) {
          if (!state.opts.pattern) {
            state.opts.pattern = /\.css$/
          }
          if (typeof state.opts.pattern === 'string') {
            state.opts.pattern = new RegExp(state.opts.pattern)
          }
          state.imports = []
          state.isStyleModuleImported = false
        },
        exit({ node, scope }, state) {
          if (
            state.imports.length === 0 ||
            scope.hasBinding(STYLE_COMPONENT) ||
            state.isStyleModuleImported
          ) {
            return
          }

          node.body.unshift(
            t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier(STYLE_COMPONENT))],
              t.stringLiteral(STYLE_MODULE)
            )
          )
        }
      },
      ImportDeclaration(path, state) {
        const source = path.get('source').node.value
        if (source === STYLE_MODULE) {
          state.isStyleModuleImported = true
        } else if (state.opts.pattern.test(source)) {
          const specifiers = path.get('specifiers')
          if (specifiers.length === 0) {
            path.replaceWith(
              t.importDeclaration(
                [
                  t.importDefaultSpecifier(
                    path.scope.generateUidIdentifier('globalStyles')
                  )
                ],
                t.stringLiteral(source)
              )
            )
            return
          }
          for (const specifier of specifiers) {
            if (t.isImportDefaultSpecifier(specifier)) {
              state.imports.push(specifier.get('local').node.name)
              return
            }
          }

          const id = path.scope.generateUidIdentifier('css')
          path.replaceWith(
            t.importDeclaration(
              [t.importDefaultSpecifier(id), ...path.node.specifiers],
              t.stringLiteral(source)
            )
          )
        }
      },
      CallExpression(path, state) {
        if (
          path.get('callee').node.name !== 'require' ||
          t.isVariableDeclarator(path.parent)
        ) {
          return
        }
        const source = path.get('arguments')[0].node.value
        if (state.opts.pattern.test(source)) {
          path.parentPath.replaceWith(
            t.variableDeclaration('var', [
              t.variableDeclarator(
                path.scope.generateUidIdentifier('globalStyles'),
                t.callExpression(t.identifier('require'), [
                  t.stringLiteral(source)
                ])
              )
            ])
          )
        }
      },
      VariableDeclarator(path, state) {
        const subpath = path.get('init')
        if (
          !subpath.isCallExpression() ||
          subpath.get('callee').node.name !== 'require'
        ) {
          return
        }
        const source = subpath.get('arguments')[0].node.value
        if (source === STYLE_MODULE) {
          state.isStyleModuleImported = true
        } else if (state.opts.pattern.test(source)) {
          state.imports.push(path.get('id').node.name)
        }
      },
      JSXElement(path, state) {
        if (
          state.imports.length === 0 ||
          t.isJSXElement(path.parent) ||
          path.get('openingElement').node.name.name === STYLE_COMPONENT ||
          state.isStyleModuleImported
        ) {
          return
        }
        const openingNode = path.get('openingElement').node
        const hoistProps = []
        const ownProps = openingNode.attributes.reduce((props, prop) => {
          if (
            t.isJSXAttribute(prop) &&
            ['key'].indexOf(prop.name.name) !== -1
          ) {
            hoistProps.push(prop)
          } else {
            props.push(prop)
          }
          return props
        }, [])
        openingNode.attributes = ownProps

        path.replaceWith(
          t.jSXElement(
            t.jSXOpeningElement(t.jSXIdentifier(STYLE_COMPONENT), [
              ...hoistProps,
              t.jSXAttribute(
                t.jSXIdentifier('css'),
                t.jSXExpressionContainer(
                  t.arrayExpression(
                    state.imports.map(importId => t.Identifier(importId))
                  )
                )
              )
            ]),
            t.jSXClosingElement(t.jSXIdentifier(STYLE_COMPONENT)),
            [t.jSXText('\n'), path.node, t.jSXText('\n')],
            false
          )
        )
      }
    }
  }
}
