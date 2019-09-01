'use strict';

var path = require('path');
var generate = require('markdown-it-testgen');
import md from 'markdown-it'
import umlPlugin from '../src/index.js'

/*eslint-env mocha*/

describe('markdown-it-textual-uml: ditaa - default', function () {
  it('test ditaa', function(done) {
    var ditaaParser = md().use(umlPlugin);

    generate(
      path.join(__dirname, 'fixtures/ditaa/default.txt'),
      { header: true },
      ditaaParser
    );
    done();
  });
});
