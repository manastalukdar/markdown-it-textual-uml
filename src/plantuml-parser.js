// Process block-level uml diagrams
//
'use strict'

function plantumlParser(md, options) {

  function generateSourceDefault(umlCode, pluginOptions) {
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

  const umlTypes = ['plantuml', 'dot'];

  const umlType = options.umlType || 'plantuml'
  // const openMarker = options.openMarker || '@startuml'
  const openMarker = options.openMarker || '```' + umlType
  const openChar = openMarker.charCodeAt(0)
  // const closeMarker = options.closeMarker || '@enduml'
  const closeMarker = options.closeMarker || '```'
  const closeChar = closeMarker.charCodeAt(0)
  const render = options.render || md.renderer.rules.image
  const generateSource = options.generateSource || generateSourceDefault

  function uml(state, startLine, endLine, silent) {
    let nextLine
    let i
    let autoClosed = false
    let start = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]

    // Check out the first character quickly,
    // this should filter out most of non-uml blocks
    //
    if (openChar !== state.src.charCodeAt(start)) {
      return false
    }

    // Check out the rest of the marker string
    //
    for (i = 0; i < openMarker.length; ++i) {
      if (openMarker[i] !== state.src[start + i]) {
        return false
      }
    }

    const markup = state.src.slice(start, start + i)
    const params = state.src.slice(start + i, max)

    // Since start is found, we can report success here in validation mode
    //
    if (silent) {
      return true
    }

    // Search for the end of the block
    //
    nextLine = startLine

    for (;;) {
      nextLine++
      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break
      }

      start = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]

      if (start < max && state.sCount[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break
      }

      if (closeChar !== state.src.charCodeAt(start)) {
        // didn't find the closing fence
        continue
      }

      if (state.sCount[nextLine] > state.sCount[startLine]) {
        // closing fence should not be indented with respect of opening fence
        continue
      }

      let closeMarkerMatched = true
      for (i = 0; i < closeMarker.length; ++i) {
        if (closeMarker[i] !== state.src[start + i]) {
          closeMarkerMatched = false
          break
        }
      }

      if (!closeMarkerMatched) {
        continue
      }

      // make sure tail has spaces only
      if (state.skipSpaces(start + i) < max) {
        continue
      }

      // found!
      autoClosed = true
      break
    }

    const contents = state.src
      .split('\n')
      .slice(startLine + 1, nextLine)
      .join('\n')

    // We generate a token list for the alt property, to mimic what the image parser does.
    const altToken = []
    // Remove leading space if any.
    const alt = params ? params.slice(1) : 'uml diagram'
    state.md.inline.parse(alt, state.md, state.env, altToken)

    const token = state.push('uml_diagram', 'img', 0)
    // alt is constructed from children. No point in populating it here.
    token.attrs = [['src', generateSource(contents, options)], ['alt', '']]
    token.block = true
    token.children = altToken
    token.info = params
    token.map = [startLine, nextLine]
    token.markup = markup

    state.line = nextLine + (autoClosed ? 1 : 0)

    return true
  }

  md.block.ruler.before('fence', 'uml_diagram', uml, {
    alt: ['paragraph', 'reference', 'blockquote', 'list']
  })
  md.renderer.rules.uml_diagram = render
}

export default {
  plantumlParser
}
