// Process block-level uml diagrams
//
'use strict'

import plantumlParser from 'plantuml-parser'
import mermaidParser from 'mermaid-parser'

function umlPlugin(md, options) {
  plantumlParser(options)
  mermaidParser(options)

  const defaultRenderer = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const code = token.content.trim()
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
    let langName = ''

    if (info) {
      langName = info.split(/\s+/g)[0]
    }

    switch(langName) {
      case 'mermaid':
        return mermaidParser.MermaidChart(code)
        break;
      case 'plantuml':
      case 'dot':
        return plantumlParser.getMarkup(code)
        break;
    }

    return defaultRenderer(tokens, idx, options, env, slf)
  }
}

export default {
  umlPlugin
}
