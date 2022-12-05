requirejs.config({
  baseUrl: './',
  paths: {
    b: 'js1/a',
  },
  shim: {
    b: {
      exports: 'b',
    },
  },
  map: {
    'js2/d': {
      foo: 'js2/f.js',
    },
    'js2/e': {
      foo: 'js1/b.js',
    },
  },
});
require(['js2/d', 'js2/e'], function (d, e) {
  console.log(d);
  console.log(e);
});
