'use strict'

const functions = {
  options: {},

  initialize(options) {
    if (options) {
      this.options = options;
    }
  },

  getMarkup(code) {
    return `<div class="mermaid">\n${code}\n</div>\n`
  }
}

module.exports = {
  functions
};
