'use strict'

import plantumlParser from './plantuml-parser.js'
// import mermaidParser from './mermaid-parser.js'

function umlPlugin(md, options) {
  plantumlParser(options)
  //mermaidParser(options)

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
        //return mermaidParser.mermaidChart(code)
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
