// Process block-level uml diagrams
//
'use strict'

import deflate from './lib/deflate.js'

const functions = {
  options: {},

  initialize(options) {
    if (options) {
      this.options = options
    }
  },

  getMarkup(code, diagramName) {
    const srcVal = this.generateSource(code, diagramName, this.options)
    return '<img src="' + srcVal + '" alt="uml diagram">\n'
  },

  generateSource(umlCode, diagramMarker, pluginOptions) {
    const imageFormat = pluginOptions.imageFormat || 'svg'
    const server = pluginOptions.server || 'https://www.plantuml.com/plantuml'
    const zippedCode = deflate.encode64(
      deflate.zip_deflate(
        unescape(
          encodeURIComponent(
            '@start' +
              diagramMarker +
              '\n' +
              umlCode +
              '\n@end' +
              diagramMarker,
          ),
        ),
      ),
      9,
    )
    return server + '/' + imageFormat + '/' + zippedCode
  },
}

export default {
  functions,
}
