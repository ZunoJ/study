function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  });
  if (superClass) Object.setPrototypeOf(subClass, superClass);
}

function Parent() {}

var Child =
  /*#__PURE__*/
  (function (_Parent) {
    _inherits(Child, _Parent);

    function Child(name, age) {
      Object.getPrototypeOf(Child).call(this, name);
      // 调用父类的 constructor(name)

      this.age = age;
    }

    return Child;
  })(Parent);
