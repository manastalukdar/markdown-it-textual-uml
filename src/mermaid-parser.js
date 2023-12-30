'use strict'

const functions = {
  options: {},

  initialize(options) {
    if (options) {
      this.options = options
    }
  },

  getMarkup(code) {
    let content = removeTripleBackticks(code)
    return `<pre><div class="mermaid">\n${content}\n</div></pre>\n`
  },
}

function removeTripleBackticks(inputString) {
  if (inputString.endsWith('```')) {
    // Remove the last 3 characters
    return inputString.slice(0, -3)
  } else {
    // String doesn't end with "```", return as is
    return inputString
  }
}

export default {
  functions,
}
