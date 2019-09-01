'use strict'

const plantumlParser = require('./plantuml-parser.js').default
//import mermaidParser from './mermaid-parser.js'

module.exports = function umlPlugin(md, options) {
  plantumlParser.functions.initialize(options)
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
        return plantumlParser.functions.getMarkup(code, 'uml')
        break;
      case 'ditaa':
        return plantumlParser.functions.getMarkup(code, 'ditaa')
        break;
    }

    return defaultRenderer(tokens, idx, options, env, slf)
  }
}

/*
export default {
  umlPlugin
}
*/
