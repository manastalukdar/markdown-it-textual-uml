// Process block-level uml diagrams
//
'use strict'

function plantumlParser(options) {

  function getMarkup(code) {
    srcVal = generateSource(code, options)
    return `<img src=$(srcVal) alt="uml diagram">`
  }

  function generateSource(umlCode, pluginOptions) {
    const imageFormat = pluginOptions.imageFormat || 'svg'
    const diagramName = pluginOptions.diagramName || 'uml'
    const server = pluginOptions.server || 'https://www.plantuml.com/plantuml'
    const deflate = require('./lib/deflate.js')
    const zippedCode = deflate.encode64(
      deflate.zip_deflate(
        unescape(
          encodeURIComponent(
            '@start' + diagramName + '\n' + umlCode + '\n@end' + diagramName
          )
        ),
        9
      )
    )

    return server + '/' + imageFormat + '/' + zippedCode
  }

  options = options || {}
}

export default {
  plantumlParser
}
