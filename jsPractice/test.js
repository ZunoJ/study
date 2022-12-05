var MyModules = (function Manager() {
  var modules = {};
  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    console.log(deps);
    modules[name] = impl.apply(impl, deps);
  }
  function get(name) {
    return modules[name];
  }
  return {
    define: define,
    get: get,
  };
})();
console.log(17);
MyModules.define('bar', [], function () {
  var a = 3;
  function hello() {
    return a;
  }
  return {
    hello: hello,
  };
});

MyModules.define('foo', ['bar'], function (bar) {
  function ssss() {
    console.log(bar);
    return bar.hello;
  }
  return {
    ssss,
  };
});

var a = MyModules.get('foo').ssss();
console.log(a());
