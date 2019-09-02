'use strict'

const puppeteer = require('puppeteer')
const path = require('path')

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

  async getMarkup(code) {
    const browser = await puppeteer.launch()
    const mermaidConfig = Object.assign(this.mermaidParserDefaults, this.options)
    try {
      const page = await browser.newPage()
      const file = path.join(__dirname, 'index.html')
      await page.goto(`file://${file}`)
      const definition = code;

      const element = (await page.$$('#container'))[1];
      const divsCounts = await page.$$eval('#container', divs => divs.length);

      await page.$eval('#container', (container, definition, mermaidConfig) => {
        container.innerHTML = definition
        window.mermaid.initialize(mermaidConfig)
        window.mermaid.init(undefined, container)
      }, definition, mermaidConfig)

      const svg = await page.$eval('#container', container => container.innerHTML)

      const resultSvg = svg

      browser.close()
      return resultSvg;
    } catch ({
      str,
      hash
    }) {
      browser.close()
      return `<pre>${str}</pre>`
    }

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
