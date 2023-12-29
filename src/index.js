//https://github.com/markdown-it/markdown-it/issues/256

import * as platumlFunctions from './plantuml-parser.js'
import * as mermaidFunctions from './mermaid-parser.js'

const md = require('markdown-it')()

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

function getTokens(input) {
  let env = {}
  let tokens = md.parse(input, env)
  return tokens
}

async function processTokens(tokens) {
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
}

function umlPlugin(tokens, env, (err) => {
  if (err) {
    console.error(err)
  }
  // here you will have modified tokens (and may be env) as you need



  output = md.renderer.render(tokens, md.options, env)
})
