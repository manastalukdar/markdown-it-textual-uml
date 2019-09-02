'use strict'

import path from 'path'
import generate from 'markdown-it-testgen'
import md from 'markdown-it'
import umlPlugin from '../src/index.js'

/* eslint-env mocha */

describe('markdown-it-textual-uml: plantuml', function () {
  it('test default', function () {
    var defaultParser = md().use(umlPlugin)

    function runGenerate() {
      return new Promise((resolve) => {
        generate(
          path.join(__dirname, 'fixtures/plantuml/default.txt'), {
            header: true
          },
          defaultParser
        );
        resolve();
      })
    }
    runGenerate()
  })

  it('test png', function () {
    var pngParser = md().use(umlPlugin, {
      imageFormat: 'png'
    })

    function runGenerate() {
      return new Promise((resolve) => {
        generate(
          path.join(__dirname, 'fixtures/plantuml/png.txt'), {
            header: true
          },
          pngParser
        );
        resolve();
      })
    }
    runGenerate()
  })

  it('test server', function () {
    var parserWithCustomServer = md().use(umlPlugin, {
      server: 'http://example.com/umlPlugin'
    })

    function runGenerate() {
      return new Promise((resolve) => {
        generate(
          path.join(__dirname, 'fixtures/plantuml/server.txt'), {
            header: true
          },
          parserWithCustomServer
        );
        resolve();
      })
    }
    runGenerate()
  })
})
