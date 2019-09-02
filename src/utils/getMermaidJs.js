var fs = require('fs')
var path = require('path')

fs.copyFile(
  path.join(__dirname, '../../node_modules/mermaid/dist/mermaid.min.js'),
  path.join(__dirname, '../mermaid.min.js'), (err) => {
    if (err) throw err;
    console.log('source was copied to destination');
  });
