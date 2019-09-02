'use strict'

import assert from 'assert'
import path from 'path'
import generate from 'markdown-it-testgen'
import md from 'markdown-it'
import umlPlugin from '../src/index.js'

describe('markdown-it-textual-uml: mermaid', function() {
  /*it('test sanity', function () {
    md().use(umlPlugin);
    assert(md().render('# Hello world').trim() === '<h1>Hello world</h1>', '# Hello world')
    assert(md().render('Hello world').trim() === '<p>Hello world</p>', 'Hello world')
  });

  it('test logging', function () {
    console.log(md().render(`\`\`\`mermaid
    graph TD
        A[Christmas] -->|Get money| B(Go shopping)
        B --> C{Let me think}
        C -->|One| D[Laptop]
        C -->|Two| E[iPhone]
        C -->|Three| F[Car]
    \`\`\``));
  });*/

  it('test default', function() {
    var defaultParser = md().use(umlPlugin)

    function runGenerate() {
      return new Promise((resolve) => {
        generate(
          path.join(__dirname, 'fixtures/mermaid/default.txt'), {
            header: true
          },
          defaultParser
        );
        resolve();
      })
    }
    runGenerate();
  })
})

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
