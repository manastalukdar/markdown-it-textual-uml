'use strict'

import Mermaid from 'mermaid'
import Murmur from './murmurhash3_gc.js'
import fs from 'fs'
import { run } from '@mermaid-js/mermaid-cli'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fsPromises = fs.promises

const functions = {
  options: {},

  initialize(options) {
    if (options) {
      this.options = options
      //Object.assign(MermaidPlugIn.default, options)
    }
    //MermaidPlugIn()
  },

  getMarkup(code) {
    return `<div class="mermaid">\n${code}\n</div>\n`
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

function writeToFile(contents, file) {
  fs.writeFile(file, contents, (err) => {
    if (err) {
      console.error(err)
    }
    //console.log(file)
    console.log('File written successfully.')
  })
}

async function readFromFile(file) {
  try {
    const data = await fsPromises.readFile(file, 'utf8')
    return data
  } catch (error) {
    console.error(error)
  }
}

function deleteFilesAndDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rm(
      dirPath,
      {
        recursive: true,
        force: true,
      },
      (err) => {
        if (err) {
          // File deletion failed
          console.error(err.message)
          return
        }
        console.log('Files deleted successfully.')
      },
    )
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function getSvg(code) {
  const dirPath = path.join(__dirname, '/temp/mermaid-parser')
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, {
      recursive: true,
    })
  }
  code = removeTripleBackticks(code)
  const inputFile = path.join(dirPath, 'mermaid.mmd')
  const outputFile = path.join(dirPath, 'output.svg')
  writeToFile(code, inputFile)
  await run(
    inputFile,
    outputFile, // {optional options},
  )
  await sleep(5000)
  const fileData = await readFromFile(outputFile)
  deleteFilesAndDir(dirPath)
  return fileData //`<div>\n${svgCode}\n</div>`
}

async function getSvgWrapper(code) {
  const result = await getSvg(code)
  return result
}

async function awaitRender(code) {
  code = removeTripleBackticks(code)
  const mermaidGraph = `<div class="mermaid">\n${code}\n</div>`
  var needsUniqueId = 'render' + Murmur(code, 42).toString()
  const { svgCode } = await Mermaid.mermaidAPI.render(needsUniqueId, code)
  mermaidGraph.innerHTML = svgCode
  //console.log(svgCode)
  return mermaidGraph //`<div>\n${svgCode}\n</div>`
}

const MermaidChart = (code) => {
  try {
    awaitRender(code)
    //return `<pre class="mermaid">${code}</pre>`
  } catch (err) {
    return `<pre>${htmlEntities(err.name)}: ${htmlEntities(err.message)}</pre>`
  }
}

export default {
  functions,
  //MermaidChart,
  //MermaidPlugIn,
  getSvg,
  //getSvgWrapper,
}
