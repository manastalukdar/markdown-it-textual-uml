'use strict';

import path from 'path';
import generate from 'markdown-it-testgen';
import md from 'markdown-it'
import umlPlugin from '../src/index.js'

/*eslint-env mocha*/

describe('markdown-it-textual-uml: ditaa', function () {

  it('test ditaa', function() {
    var ditaaParser = md().use(umlPlugin);

    function runGenerate() {
      return new Promise((resolve) => {
        generate(
          path.join(__dirname, 'fixtures/ditaa/default.txt'),
          { header: true },
          ditaaParser
        );
        resolve();
      })
    }
    runGenerate()
  });
});
