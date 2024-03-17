function isFunction(v) {
    return typeof v === 'function';
  }

  function isDecimal(v) {
    return v instanceof Decimal;
  }

let dev = {
  disableStartInterval: false
}