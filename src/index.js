import * as platumlFunctions from './plantuml-parser.js'
import * as mermaidFunctions from './mermaid-parser.js'

function removeTripleBackticks(inputString) {
  if (inputString.endsWith('```')) {
    // Remove the last 3 characters
    return inputString.slice(0, -3)
  } else {
    // String doesn't end with "```", return as is
    return inputString
  }
}

async function getMermaidSvg(code) {
  const data = await mermaidFunctions.default.getSvgAsync(code)
  return data
}

export default function umlPlugin(md, options) {
  options = options || {}

  platumlFunctions.default.functions.initialize(options)
  mermaidFunctions.default.functions.initialize(options)

  md.core.ruler.push('umlPlugin', async (state) => {
    const tokens = state.tokens

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if (token.type === 'fence') {
        const content = token.content.trim()
        const code = removeTripleBackticks(content)
        const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
        let langName = ''
        if (info) {
          langName = info.split(/\s+/g)[0]
        }
        console.log('langName: ' + langName)
        // Check if the language is a specific one where you want to perform async operations
        switch (langName) {
          case 'mermaid':
            return await getMermaidSvg(code)
            break
          case 'plantuml':
          case 'dot':
            return platumlFunctions.default.functions.getMarkup(code, 'uml')
            break
          case 'ditaa':
            return platumlFunctions.default.functions.getMarkup(code, 'ditaa')
            break
        }
      }
    }

    return Promise.resolve()
  })
}
