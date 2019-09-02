'use strict'

const mermaid = require('mermaid')

const functions = {
  options: {},

  mermaidParserDefaults: {
    startOnLoad: false,
    theme: 'default',
    flowchart: {
      htmlLabels: false,
      useMaxWidth: true
    }
  },

  initialize(options) {
    if (options) {
      this.options = options;
    }

    mermaid.initialize(Object.assign(this.mermaidParserDefaults, options))
  },

  getMarkup(code) {
    try {
      var needsUniqueId = 'render' + (Math.floor(Math.random() * 10000)).toString()
      mermaid.mermaidAPI.render(needsUniqueId, code, sc => {
        code = sc
      })
      return `<div class="mermaid">${code}</div>`
    } catch ({
      str,
      hash
    }) {
      return `<pre>${str}</pre>`
    }
  }
}

export default {
  functions
};
