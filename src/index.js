// Process block-level uml diagrams
//
'use strict'

import plantumlParser from 'plantuml-parser'
import mermaidParser from 'mermaid-parser'

function umlPlugin(md, options) {
  plantumlParser(md, options)
  mermaidParser(md)
}

export default {
  umlPlugin
}
