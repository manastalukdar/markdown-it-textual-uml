const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch()
  try {

    const options = {}

    const mermaidParserDefaults = {
      startOnLoad: false,
      theme: 'default',
      flowchart: {
        htmlLabels: false,
        useMaxWidth: true
      }
    }

    const mermaidConfig = Object.assign(mermaidParserDefaults, options)
    const page = await browser.newPage()
    const file = path.join(__dirname, 'index.html')
    await page.goto(`file://${file}`)
    const definition =
      `graph TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;`;

    const element = (await page.$$('#container'))[1];
    const divsCounts = await page.$$eval('#container', divs => divs.length);

    await page.$eval('#container', (container, definition, mermaidConfig) => {
      container.innerHTML = definition
      window.mermaid.initialize(mermaidConfig)
      window.mermaid.init(undefined, container)
    }, definition, mermaidConfig)

    const svg = await page.$eval('#container', container => container.innerHTML)

    console.log('svg:', svg);

    await browser.close()
  }
  catch(err) {
    await browser.close()
    console.log(err)
  }
})();
