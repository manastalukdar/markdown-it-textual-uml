'use strict';

//import assert from 'assert';
//import markdownIt from 'markdown-it';
//import markdownItMermaid from '../src';

var path = require('path');
var generate = require('markdown-it-testgen');
import md from 'markdown-it'
import umlPlugin from '../src/index.js'

/*eslint-env mocha*/

describe('markdown-it-textual-uml', function () {
  var defaultParser = md().use(umlPlugin);

  generate(
    path.join(__dirname, 'fixtures/test.txt'),
    { header: true },
    defaultParser
  );

  /*generate(
    path.join(__dirname, 'fixtures/default.txt'),
    { header: true },
    defaultParser
  );

  var ditaaParser = md().use(
    umlPlugin,
    {
      openMarker: '@startditaa',
      closeMarker: '@endditaa',
      diagramName: 'ditaa'
    }
  );

  generate(
    path.join(__dirname, 'fixtures/ditaa.txt'),
    { header: true },
    ditaaParser
  );

  var pngParser = md().use(umlPlugin, { imageFormat: 'png' });

  generate(
    path.join(__dirname, 'fixtures/png.txt'),
    { header: true },
    pngParser
  );

  var parserWithCustomServer = md().use(umlPlugin, { server: 'http://example.com/umlPlugin' });

  generate(
    path.join(__dirname, 'fixtures/server.txt'),
    { header: true },
    parserWithCustomServer
  );*/
});


/* const mdi = markdownIt()
mdi.use(markdownItMermaid);

assert(mdi.render('# Hello world').trim() === '<h1>Hello world</h1>', '# Hello world')
assert(mdi.render('Hello world').trim() === '<p>Hello world</p>', 'Hello world')

console.log(mdi.render(`\`\`\`mermaid
graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[Car]
\`\`\``))
*/
// console.log(mdi.render(`\`\`\`
// graph TD
//     A[Christmas] -->|Get money| B(Go shopping)
//     B --> C{Let me think}
//     C -->|One| D[Laptop]
//     C -->|Two| E[iPhone]
//     C -->|Three| F[Car]
// \`\`\``))
// console.log(mdi.render(`\`\`\`
// graph TD
//     A[Christmas] -->|Get money| B(Go shopping)
//     B ----> C{Let me think}
//     C -->|One| D[Laptop]
//     C -->|Two| E[iPhone]
//     C -->|Three| F[Car]
// \`\`\``))

// assert(mdi.render(`\`\`\`mermaid
// graph TD
//     A[Christmas] -->|Get money| B(Go shopping)
//     B --> C{Let me think}
//     C -->|One| D[Laptop]
//     C -->|Two| E[iPhone]
//     C -->|Three| F[Car]
// \`\`\``).indexOf('class="mermaid"') > -1)
// assert(mdi.render(`\`\`\`
// graph TD
//     A[Christmas] -->|Get money| B(Go shopping)
//     B --> C{Let me think}
//     C -->|One| D[Laptop]
//     C -->|Two| E[iPhone]
//     C -->|Three| F[Car]
// \`\`\``).indexOf('class="mermaid"') > -1)
// assert(mdi.render(`\`\`\`
// graph TD
//     A[Christmas] -->|Get money| B(Go shopping)
//     B ----> C{Let me think}
//     C -->|One| D[Laptop]
//     C -->|Two| E[iPhone]
//     C -->|Three| F[Car]
// \`\`\``).indexOf('<pre>Parse error') > -1)
