'use strict'

const path = require('path')
const fs = require('fs')
const childProcess = require('child_process');

const tempDir = path.join(__dirname, 'temp', 'mermaid')
const outputFile = path.join(tempDir, 'output.data')
const puppeteerScript = path.join(__dirname, './mermaid-puppeteer.js')

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
    if (!fs.existsSync(tempDir)){
      fs.mkdirSync(tempDir);
    }
    const optionsFile = path.join(tempDir, 'options.data')
    // overwrites existing file
    fs.writeFileSync(optionsFile, JSON.stringify(this.options))
  },

  getMarkup(code) {

    const codeFile = path.join(tempDir, 'code.data')
    if (!fs.existsSync(tempDir)){
      fs.mkdirSync(tempDir);
    }
     // overwrites existing file
     fs.writeFileSync(codeFile, code)

     /*runScript(puppeteerScript, function (err) {
      if (err) throw err;
      console.log('finished running mermaid-puppeteer.js');
    });*/

    childProcess.execSync('node ' + puppeteerScript)

    const output = fs.readFileSync(outputFile, 'utf-8')
    return '<div class="mermaid" data-processed="true">\n' + output + '\n</div>\n'
  }
}

// https://stackoverflow.com/a/22649812/420827
function runScript(scriptPath, callback) {

  // keep track of whether callback has been invoked to prevent multiple invocations
  var invoked = false;

  var process = childProcess.fork(scriptPath);

  // listen for errors as they may prevent the exit event from firing
  process.on('error', function (err) {
      if (invoked) return;
      invoked = true;
      callback(err);
  });

  // execute the callback once the process has finished running
  process.on('exit', function (code) {
      if (invoked) return;
      invoked = true;
      var err = code === 0 ? null : new Error('exit code ' + code);
      callback(err);
  });

}

module.exports = {
  functions
};
