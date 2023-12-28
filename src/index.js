'use strict'

import * as platumlFunctions from './plantuml-parser.js'
import * as mermaidFunctions from './mermaid-parser.js'

export default function umlPlugin(md, options) {
  options = options || {}

  platumlFunctions.default.functions.initialize(options)
  mermaidFunctions.default.functions.initialize(options)

  const defaultRenderer = md.renderer.rules.fence.bind(md.renderer.rules)

  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const code = token.content.trim()
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
    let langName = ''

    if (info) {
      langName = info.split(/\s+/g)[0]
    }

    switch (langName) {
      case 'mermaid':
        const result = mermaidFunctions.default.getSvgSync(code)
        return result
        break
      case 'plantuml':
      case 'dot':
        return platumlFunctions.default.functions.getMarkup(code, 'uml')
        break
      case 'ditaa':
        return platumlFunctions.default.functions.getMarkup(code, 'ditaa')
        break
    }

    return defaultRenderer(tokens, idx, options, env, slf)
  }
}

/*
export default {
  umlPlugin
}
*/
