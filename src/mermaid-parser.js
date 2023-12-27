'use strict'

import Mermaid from 'mermaid'
import Murmur from './murmurhash3_gc.js'

const functions = {
  options: {},

  initialize(options) {
    if (options) {
      this.options = options
      Object.assign(MermaidPlugIn.default, options)
    }
    MermaidPlugIn()
  },

  getMarkup(code) {
    return `<pre class="mermaid">\n${code}\n</pre>\n`
  },
}

const MermaidPlugIn = () => {
  Mermaid.initialize(MermaidPlugIn.default)
}

MermaidPlugIn.default = {
  startOnLoad: false,
  securityLevel: 'true',
  theme: 'default',
  flowchart: {
    htmlLabels: false,
    useMaxWidth: true,
  },
  dictionary: {
    token: 'mermaid',
  },
}

const htmlEntities = (str) =>
  String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function removeTripleBackticks(inputString) {
  if (inputString.endsWith('```')) {
    // Remove the last 3 characters
    return inputString.slice(0, -3)
  } else {
    // String doesn't end with "```", return as is
    return inputString
  }
}

async function awaitRender(code) {
  code = removeTripleBackticks(code)
  var needsUniqueId = 'render' + Murmur(code, 42).toString()
  const { svgCode } = await Mermaid.mermaidAPI.render(needsUniqueId, code)
  return `<div>\n${svgCode}\n</div>`
}

const MermaidChart = (code) => {
  try {
    awaitRender(code)
    /*.then(function (result) {
      return result
    })*/
    //const type = Mermaid.detectType(code)
    //console.log(type)
    //console.log('svgCode: ' + svgCode)
    //return `<pre class="mermaid">${code}</pre>`
  } catch (err) {
    return `<pre>${htmlEntities(err.name)}: ${htmlEntities(err.message)}</pre>`
  }
}

export default {
  functions,
  MermaidChart,
  MermaidPlugIn,
  awaitRender,
}
