/* eslint-env jest */
'use strict';
const path = require('path');
const reaver = require('reaver');
const {extractCss} = require('../src/css.js');
const {read, checkAndDelete, strip} = require('./helper');
const inline = require('..');

jest.setTimeout(20000);

test('Inline css', async () => {
  const html = await read('fixtures/index.html');
  const css = await read('fixtures/critical.css');
  const expected = await read('expected/index-inlined-async-minified-final.html');
  const out = inline(html, css, {polyfill: true});
  expect(strip(out.toString())).toBe(strip(expected));
});

test('Inline css with media=print', async () => {
  const html = await read('fixtures/index.html');
  const css = await read('fixtures/critical.css');
  const expected = await read('expected/index-inlined-async-minified-final-print.html');
  const out = inline(html, css, {polyfill: false});
  expect(strip(out.toString())).toBe(strip(expected));
});

test('Inline in head if no stylesheets are there', async () => {
  const html = await read('fixtures/index-nostyle.html');
  const css = await read('fixtures/critical.css');

  const expected = await read('expected/index-nostyle.html');
  const out = inline(html, css, {polyfill: true});

  expect(strip(out.toString('utf-8'))).toBe(strip(expected));
});

test('Inline absolute css', async () => {
  const html = await read('fixtures/index-absolute.html');
  const css = await read('fixtures/critical.css');

  const expected = await read('expected/index-inlined-absolute.html');
  const out = inline(html, css, {polyfill: true});

  expect(strip(out.toString('utf-8'))).toBe(strip(expected));
});

test('Inline absolute css with media=print', async () => {
  const html = await read('fixtures/index-absolute.html');
  const css = await read('fixtures/critical.css');

  const expected = await read('expected/index-inlined-absolute-print.html');
  const out = inline(html, css, {polyfill: false});

  expect(strip(out.toString('utf-8'))).toBe(strip(expected));
});

test('Inline and minify css', async () => {
  const html = await read('fixtures/index.html');
  const css = await read('fixtures/critical.css');

  const expected = await read('expected/index-inlined-async-minified-final.html');
  const out = inline(html, css, {polyfill: true});

  expect(strip(out.toString('utf-8'))).toBe(strip(expected));
});

test('Inline and minify css with media=print', async () => {
  const html = await read('fixtures/index.html');
  const css = await read('fixtures/critical.css');

  const expected = await read('expected/index-inlined-async-minified-final-print.html');
  const out = inline(html, css, {polyfill: false});

  expect(strip(out.toString('utf-8'))).toBe(strip(expected));
});

test('Inline and extract css', async () => {
  const html = await read('fixtures/cartoon.html');
  const css = await read('fixtures/critical.css');
  const expected = await read('expected/cartoon-expected-minified.html');

  const styles = await Promise.all([
    read('fixtures/css/cartoon.css'),
    read('fixtures/bower_components/bootstrap/dist/css/bootstrap.css'),
  ]);

  const reved = [
    reaver.rev('fixtures/css/cartoon.css', extractCss(styles[0], css)),
    reaver.rev('fixtures/bower_components/bootstrap/dist/css/bootstrap.css', extractCss(styles[1], css)),
  ];

  const out = inline(html, css, {
    extract: true,
    polyfill: true,
    basePath: 'test/fixtures',
  });

  expect(out.toString('utf8')).toMatch(path.basename(reved[0]));
  expect(out.toString('utf8')).toMatch(path.basename(reved[1]));
  expect(checkAndDelete(reved[0])).toBe(true);
  expect(checkAndDelete(reved[1])).toBe(true);
  expect(strip(out.toString('utf8'))).toBe(strip(expected));
});

test('Inline and extract css with media=print', async () => {
  const html = await read('fixtures/cartoon.html');
  const css = await read('fixtures/critical.css');
  const expected = await read('expected/cartoon-expected-minified-print.html');

  const styles = await Promise.all([
    read('fixtures/css/cartoon.css'),
    read('fixtures/bower_components/bootstrap/dist/css/bootstrap.css'),
  ]);

  const reved = [
    reaver.rev('fixtures/css/cartoon.css', extractCss(styles[0], css)),
    reaver.rev('fixtures/bower_components/bootstrap/dist/css/bootstrap.css', extractCss(styles[1], css)),
  ];

  const out = inline(html, css, {
    extract: true,
    polyfill: false,
    basePath: 'test/fixtures',
  });

  expect(out.toString('utf8')).toMatch(path.basename(reved[0]));
  expect(out.toString('utf8')).toMatch(path.basename(reved[1]));
  expect(checkAndDelete(reved[0])).toBe(true);
  expect(checkAndDelete(reved[1])).toBe(true);
  expect(strip(out.toString('utf8'))).toBe(strip(expected));
});

test('Extract and minify css', async () => {
  const html = await read('fixtures/cartoon.html');
  const css = await read('fixtures/critical.css');
  const expected = await read('expected/cartoon-expected-minified.html');

  const styles = await Promise.all([
    read('fixtures/css/cartoon.css'),
    read('fixtures/bower_components/bootstrap/dist/css/bootstrap.css'),
  ]);

  const reved = [
    reaver.rev('fixtures/css/cartoon.css', extractCss(styles[0], css)),
    reaver.rev('fixtures/bower_components/bootstrap/dist/css/bootstrap.css', extractCss(styles[1], css)),
  ];

  const out = inline(html, css, {
    extract: true,
    polyfill: true,
    basePath: 'test/fixtures',
  });

  expect(out.toString('utf8')).toMatch(path.basename(reved[0]));
  expect(out.toString('utf8')).toMatch(path.basename(reved[1]));
  expect(checkAndDelete(reved[0])).toBe(true);
  expect(checkAndDelete(reved[1])).toBe(true);
  expect(strip(out.toString('utf8'))).toBe(strip(expected));
});

test('Extract and minify css with media=print', async () => {
  const html = await read('fixtures/cartoon.html');
  const css = await read('fixtures/critical.css');
  const expected = await read('expected/cartoon-expected-minified-print.html');

  const styles = await Promise.all([
    read('fixtures/css/cartoon.css'),
    read('fixtures/bower_components/bootstrap/dist/css/bootstrap.css'),
  ]);

  const reved = [
    reaver.rev('fixtures/css/cartoon.css', extractCss(styles[0], css)),
    reaver.rev('fixtures/bower_components/bootstrap/dist/css/bootstrap.css', extractCss(styles[1], css)),
  ];

  const out = inline(html, css, {
    extract: true,
    polyfill: false,
    basePath: 'test/fixtures',
  });

  expect(out.toString('utf8')).toMatch(path.basename(reved[0]));
  expect(out.toString('utf8')).toMatch(path.basename(reved[1]));
  expect(checkAndDelete(reved[0])).toBe(true);
  expect(checkAndDelete(reved[1])).toBe(true);
  expect(strip(out.toString('utf8'))).toBe(strip(expected));
});

test('Extract and minify css with alternative noscript option', async () => {
  const html = await read('fixtures/cartoon.html');
  const css = await read('fixtures/critical.css');
  const expected = await read('expected/cartoon-expected-minified-alt.html');

  const styles = await Promise.all([
    read('fixtures/css/cartoon.css'),
    read('fixtures/bower_components/bootstrap/dist/css/bootstrap.css'),
  ]);

  const reved = [
    reaver.rev('fixtures/css/cartoon.css', extractCss(styles[0], css)),
    reaver.rev('fixtures/bower_components/bootstrap/dist/css/bootstrap.css', extractCss(styles[1], css)),
  ];

  const out = inline(html, css, {
    extract: true,
    polyfill: true,
    noscript: 'head',
    basePath: 'test/fixtures',
  });

  expect(out.toString('utf8')).toMatch(path.basename(reved[0]));
  expect(out.toString('utf8')).toMatch(path.basename(reved[1]));
  expect(checkAndDelete(reved[0])).toBe(true);
  expect(checkAndDelete(reved[1])).toBe(true);
  expect(strip(out.toString('utf8'))).toBe(strip(expected));
});

test('Extract and minify css with alternative noscript option with media=print', async () => {
  const html = await read('fixtures/cartoon.html');
  const css = await read('fixtures/critical.css');
  const expected = await read('expected/cartoon-expected-minified-alt-print.html');

  const styles = await Promise.all([
    read('fixtures/css/cartoon.css'),
    read('fixtures/bower_components/bootstrap/dist/css/bootstrap.css'),
  ]);

  const reved = [
    reaver.rev('fixtures/css/cartoon.css', extractCss(styles[0], css)),
    reaver.rev('fixtures/bower_components/bootstrap/dist/css/bootstrap.css', extractCss(styles[1], css)),
  ];

  const out = inline(html, css, {
    extract: true,
    polyfill: false,
    noscript: 'head',
    basePath: 'test/fixtures',
  });

  expect(out.toString('utf8')).toMatch(path.basename(reved[0]));
  expect(out.toString('utf8')).toMatch(path.basename(reved[1]));
  expect(checkAndDelete(reved[0])).toBe(true);
  expect(checkAndDelete(reved[1])).toBe(true);
  expect(strip(out.toString('utf8'))).toBe(strip(expected));
});

test('Inline and extract css correctly with absolute paths', async () => {
  const html = await read('fixtures/cartoon-absolute.html');
  const css = await read('fixtures/critical.css');
  const expected = await read('expected/cartoon-absolute-expected.html');

  const styles = await Promise.all([
    read('fixtures/css/cartoon.css'),
    read('fixtures/bower_components/bootstrap/dist/css/bootstrap.css'),
  ]);

  const reved = [
    reaver.rev('fixtures/css/cartoon.css', extractCss(styles[0], css)),
    reaver.rev('fixtures/bower_components/bootstrap/dist/css/bootstrap.css', extractCss(styles[1], css)),
  ];

  const out = inline(html, css, {
    polyfill: true,
    extract: true,
    basePath: 'test/fixtures',
  });

  expect(out.toString('utf8')).toMatch(path.basename(reved[0]));
  expect(out.toString('utf8')).toMatch(path.basename(reved[1]));
  expect(checkAndDelete(reved[0])).toBe(true);
  expect(checkAndDelete(reved[1])).toBe(true);
  expect(strip(out.toString('utf8'))).toBe(strip(expected));
});

test('Inline and extract css correctly with absolute paths with media=print', async () => {
  const html = await read('fixtures/cartoon-absolute.html');
  const css = await read('fixtures/critical.css');
  const expected = await read('expected/cartoon-absolute-expected-print.html');

  const styles = await Promise.all([
    read('fixtures/css/cartoon.css'),
    read('fixtures/bower_components/bootstrap/dist/css/bootstrap.css'),
  ]);

  const reved = [
    reaver.rev('fixtures/css/cartoon.css', extractCss(styles[0], css)),
    reaver.rev('fixtures/bower_components/bootstrap/dist/css/bootstrap.css', extractCss(styles[1], css)),
  ];

  const out = inline(html, css, {
    polyfill: false,
    extract: true,
    basePath: 'test/fixtures',
  });

  expect(out.toString('utf8')).toMatch(path.basename(reved[0]));
  expect(out.toString('utf8')).toMatch(path.basename(reved[1]));
  expect(checkAndDelete(reved[0])).toBe(true);
  expect(checkAndDelete(reved[1])).toBe(true);
  expect(strip(out.toString('utf8'))).toBe(strip(expected));
});

test('Does not strip of svg closing tags', async () => {
  const html = await read('fixtures/entities.html');
  const out = inline(html, '', {polyfill: true});

  expect(strip(out.toString('utf-8'))).toBe(strip(html));
});

test('Does not strip svg closing tags test 2', async () => {
  const html = await read('fixtures/svg.html');
  const expected = await read('expected/test-svg.html');
  const css = 'html{font-size:16;}';
  const out = inline(html, css, {polyfill: true});

  expect(strip(out.toString('utf-8'))).toBe(strip(expected));
});

test('Also preload external urls', async () => {
  function strip2(string) {
    return string.replace(/\s+/gm, '');
  }

  const html = await read('fixtures/external.html');
  const expected = await read('expected/external-expected.html');
  const css = await read('fixtures/critical.css');
  const out = inline(html, css, {polyfill: true});
  expect(strip2(out.toString('utf-8'))).toBe(strip2(expected));
});

test('Also preload external urls with media=print', async () => {
  function strip2(string) {
    return string.replace(/\s+/gm, '');
  }

  const html = await read('fixtures/external.html');
  const expected = await read('expected/external-expected-print.html');
  const css = await read('fixtures/critical.css');
  const out = inline(html, css, {polyfill: false, preload: true});
  expect(strip2(out.toString('utf-8'))).toBe(strip2(expected));
});

test("Don't try to extract for external urls", async () => {
  const html = await read('fixtures/external.html');
  const css = await read('fixtures/critical.css');
  const expected = await read('expected/external-extract-expected.html');

  const styles = await Promise.all([
    read('fixtures/css/main.css'),
    read('fixtures/bower_components/bootstrap/dist/css/bootstrap.css'),
  ]);

  const reved = [
    reaver.rev('fixtures/css/main.css', extractCss(styles[0], css)),
    reaver.rev('fixtures/bower_components/bootstrap/dist/css/bootstrap.css', extractCss(styles[1], css)),
  ];

  const out = inline(html, css, {
    extract: true,
    polyfill: true,
    basePath: 'test/fixtures',
  });
  expect(out.toString('utf8')).toMatch(path.basename(reved[0]));
  expect(out.toString('utf8')).toMatch(path.basename(reved[1]));
  expect(checkAndDelete(reved[0])).toBe(true);
  expect(checkAndDelete(reved[1])).toBe(true);
  expect(strip(out.toString('utf8'))).toBe(strip(expected));
});

test("Don't try to extract for external urls (with media=print)", async () => {
  const html = await read('fixtures/external.html');
  const css = await read('fixtures/critical.css');
  const expected = await read('expected/external-extract-expected-print.html');

  const styles = await Promise.all([
    read('fixtures/css/main.css'),
    read('fixtures/bower_components/bootstrap/dist/css/bootstrap.css'),
  ]);

  const reved = [
    reaver.rev('fixtures/css/main.css', extractCss(styles[0], css)),
    reaver.rev('fixtures/bower_components/bootstrap/dist/css/bootstrap.css', extractCss(styles[1], css)),
  ];

  const out = inline(html, css, {
    extract: true,
    polyfill: false,
    basePath: 'test/fixtures',
  });
  expect(out.toString('utf8')).toMatch(path.basename(reved[0]));
  expect(out.toString('utf8')).toMatch(path.basename(reved[1]));
  expect(checkAndDelete(reved[0])).toBe(true);
  expect(checkAndDelete(reved[1])).toBe(true);
  expect(strip(out.toString('utf8'))).toBe(strip(expected));
});

test('Keep self closing svg elements', async () => {
  const html = await read('fixtures/entities2.html');
  const out = inline(html, '', {polyfill: true});
  expect(strip(out.toString('utf-8'))).toBe(strip(html));
});

test('Respect ignore option with string array', async () => {
  function strip2(string) {
    return string.replace(/\s+/gm, '');
  }

  const html = await read('fixtures/external.html');
  const expected = await read('expected/external-ignore-expected.html');
  const css = await read('fixtures/critical.css');
  const out = inline(html, css, {
    polyfill: true,
    ignore: ['bower_components/bootstrap/dist/css/bootstrap.css'],
  });

  expect(strip2(out.toString('utf-8'))).toBe(strip2(expected));
});

test('Respect ignore option with string array  (with media=print)', async () => {
  function strip2(string) {
    return string.replace(/\s+/gm, '');
  }

  const html = await read('fixtures/external.html');
  const expected = await read('expected/external-ignore-expected-print.html');
  const css = await read('fixtures/critical.css');
  const out = inline(html, css, {
    polyfill: false,
    ignore: ['bower_components/bootstrap/dist/css/bootstrap.css'],
  });

  expect(strip2(out.toString('utf-8'))).toBe(strip2(expected));
});

test('Respect single ignore option with string', async () => {
  function strip2(string) {
    return string.replace(/\s+/gm, '');
  }

  const html = await read('fixtures/external.html');
  const expected = await read('expected/external-ignore-expected.html');
  const css = await read('fixtures/critical.css');
  const out = inline(html, css, {
    polyfill: true,
    ignore: 'bower_components/bootstrap/dist/css/bootstrap.css',
  });

  expect(strip2(out.toString('utf-8'))).toBe(strip2(expected));
});

test('Respect single ignore option with string (with media=print)', async () => {
  function strip2(string) {
    return string.replace(/\s+/gm, '');
  }

  const html = await read('fixtures/external.html');
  const expected = await read('expected/external-ignore-expected-print.html');
  const css = await read('fixtures/critical.css');
  const out = inline(html, css, {
    polyfill: false,
    ignore: 'bower_components/bootstrap/dist/css/bootstrap.css',
  });

  expect(strip2(out.toString('utf-8'))).toBe(strip2(expected));
});

test('Respect ignore option with RegExp array', async () => {
  function strip2(string) {
    return string.replace(/\s+/gm, '');
  }

  const html = await read('fixtures/external.html');
  const expected = await read('expected/external-ignore-expected.html');
  const css = await read('fixtures/critical.css');
  const out = inline(html, css, {
    polyfill: true,
    ignore: [/bootstrap/],
  });

  expect(strip2(out.toString('utf-8'))).toBe(strip2(expected));
});

test('Respect ignore option with RegExp array (with media=print)', async () => {
  function strip2(string) {
    return string.replace(/\s+/gm, '');
  }

  const html = await read('fixtures/external.html');
  const expected = await read('expected/external-ignore-expected-print.html');
  const css = await read('fixtures/critical.css');
  const out = inline(html, css, {
    polyfill: false,
    ignore: [/bootstrap/],
  });

  expect(strip2(out.toString('utf-8'))).toBe(strip2(expected));
});

test('Respect selector option', async () => {
  const html = await read('fixtures/index.html');
  const css = await read('fixtures/critical.css');

  const expected = await read('expected/index-before.html');
  const out = inline(html, css, {
    polyfill: true,
    selector: 'title',
  });

  expect(strip(out.toString('utf-8'))).toBe(strip(expected));
});

test('Respect selector option (with media=print)', async () => {
  const html = await read('fixtures/index.html');
  const css = await read('fixtures/critical.css');

  const expected = await read('expected/index-before-print.html');
  const out = inline(html, css, {
    polyfill: false,
    selector: 'title',
  });

  expect(strip(out.toString('utf-8'))).toBe(strip(expected));
});

test('Ignore stylesheets wrapped in noscript', async () => {
  const html = await read('fixtures/index-noscript.html');
  const css = await read('fixtures/critical.css');

  const expected = await read('expected/index-noscript-inlined-minified-final.html');
  const out = inline(html, css, {polyfill: true});
  expect(strip(out.toString('utf-8'))).toBe(strip(expected));
});

test("Skip loadcss if it's already present and used for all existing link tags", async () => {
  const html = await read('fixtures/loadcss.html');
  const css = await read('fixtures/critical.css');

  const expected = await read('expected/index-loadcss.html');
  const out = inline(html, css, {polyfill: true});

  expect(strip(out.toString('utf-8'))).toBe(strip(expected));
});

test('Consider existing style tags', async () => {
  const html = await read('fixtures/index-inlined.html');
  const css = await read('fixtures/critical.css');

  const expected = await read('expected/index-inlined.html');
  const out = inline(html, css, {polyfill: true});

  expect(strip(out.toString('utf-8'))).toBe(strip(expected));
});

test('Consider existing style tags with media=print', async () => {
  const html = await read('fixtures/index-inlined.html');
  const css = await read('fixtures/critical.css');

  const expected = await read('expected/index-inlined-print.html');
  const out = inline(html, css);

  expect(strip(out.toString('utf-8'))).toBe(strip(expected));
});

test('Consider existing style tags with media=print && preload', async () => {
  const html = await read('fixtures/index-inlined.html');
  const css = await read('fixtures/critical.css');

  const expected = await read('expected/index-inlined-print-preload.html');
  const out = inline(html, css, {preload: true});

  expect(strip(out.toString('utf-8'))).toBe(strip(expected));
});

test("Don't add loadcss twice", async () => {
  const html = await read('fixtures/loadcss-again.html');
  const css = await read('fixtures/critical.css');

  const expected = await read('expected/loadcss-again.html');
  const out = inline(html, css, {polyfill: true});

  expect(strip(out.toString('utf-8'))).toBe(strip(expected));
});

test('Replace stylesheets', async () => {
  const html = await read('fixtures/cartoon.html');
  const css = await read('fixtures/critical.css');

  const out = inline(html, css, {
    replaceStylesheets: ['replace/all.css'],
    polyfill: true,
  });

  const out2 = inline(html, css, {
    replaceStylesheets: ['replace/all.css'],
    polyfill: false,
  });

  expect(out.toString('utf8')).not.toMatch('css/cartoon.css');
  expect(out.toString('utf8')).not.toMatch('css/bootstrap.css');
  expect(out.toString('utf8')).toMatch('href="replace/all.css"');
  expect(out2.toString('utf8')).not.toMatch('css/cartoon.css');
  expect(out2.toString('utf8')).not.toMatch('css/bootstrap.css');
  expect(out2.toString('utf8')).toMatch('href="replace/all.css"');
});

test('Remove stylesheets', async () => {
  const html = await read('fixtures/cartoon.html');
  const css = await read('fixtures/critical.css');

  const out = inline(html, css, {
    replaceStylesheets: [],
    polyfill: true,
  });

  const out2 = inline(html, css, {
    replaceStylesheets: [],
    polyfill: false,
  });

  expect(out2.toString('utf8')).not.toMatch('css/cartoon.css');
  expect(out2.toString('utf8')).not.toMatch('css/bootstrap.css');
  expect(out.toString('utf8')).not.toMatch('css/bootstrap.css');
  expect(out.toString('utf8')).not.toMatch('css/bootstrap.css');
});

test('Keep existing integrity attribute on style tags', async () => {
  const html = await read('fixtures/index-integrity.html');
  const css = await read('fixtures/critical.css');

  const expected = await read('expected/index-inlined-async-integrity.html');
  const out = inline(html, css, {polyfill: true});

  expect(strip(out.toString())).toBe(strip(expected));
});

test('Keep existing integrity attribute on style tags with media=print', async () => {
  const html = await read('fixtures/index-integrity.html');
  const css = await read('fixtures/critical.css');

  const expected = await read('expected/index-inlined-async-integrity-print.html');
  const out = inline(html, css, {polyfill: false});

  expect(strip(out.toString())).toBe(strip(expected));
});

test('Keep existing integrity attribute on style tags with media=print && preload', async () => {
  const html = await read('fixtures/index-integrity.html');
  const css = await read('fixtures/critical.css');

  const expected = await read('expected/index-inlined-async-integrity-print-preload.html');
  const out = inline(html, css, {polyfill: false, preload: true});

  expect(strip(out.toString())).toBe(strip(expected));
});
