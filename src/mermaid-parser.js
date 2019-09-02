'use strict'

const puppeteer = require('puppeteer')

// const mermaid = require('mermaid')

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

    // mermaid.initialize(Object.assign(this.mermaidParserDefaults, options))
  },

  getMarkup(code) {
    console.log(code)
  },

  async getMarkup1(code) {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto(`file://${path.join(__dirname, 'index.html')}`)
      const definition = code;

      await page.$eval('#container', (container, definition) => {
        container.innerHTML = definition
        window.mermaid.initialize(Object.assign(this.mermaidParserDefaults, this.options))
        window.mermaid.init(undefined, container)
      }, definition)

      const svg = await page.$eval('#container', container => container.innerHTML)

      const resultSvg = container.innerHTML;

      browser.close()

      return resultSvg;

    /*try {
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
    }*/
  }
}

module.exports = {
  functions
};
