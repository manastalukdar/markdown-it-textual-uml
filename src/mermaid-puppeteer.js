const puppeteer = require('puppeteer');
const fs = require('fs')
const path = require('path');

(async () => {
  const browser = await puppeteer.launch()
  try {
    const tempDir = path.join(__dirname, 'temp', 'mermaid')
    const codeFile = path.join(tempDir, 'code.data')
    const optionsFile = path.join(tempDir, 'options.data')
    const outputFile = path.join(tempDir, 'output.data')

    if (!fs.existsSync(tempDir)){
      throw err;
    }

    const code = fs.readFileSync(codeFile, 'utf-8')
    const options = JSON.parse(fs.readFileSync(optionsFile, 'utf-8'))

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

    await page.$eval('#container', (container, code, mermaidConfig) => {
      container.innerHTML = code
      window.mermaid.initialize(mermaidConfig)
      window.mermaid.init(undefined, container)
    }, code, mermaidConfig)

    const svg = await page.$eval('#container', container => container.innerHTML)

    // overwrites existing file
    fs.writeFileSync(outputFile, svg)

    await browser.close()
  }
  catch(err) {
    await browser.close()
    console.log(err)
  }
})();
