export function isUndefined(param) {
  return typeof param === "undefined";
}
export function isArray(param) {
  return Array.isArray(param);
}
export function isObject(param) {
  return Object.prototype.toString.call(param) === "[object Object]";
}
export function isFunction(param) {
  return typeof param === "function";
}

export function clone(param) {
  var item;
  var res = {};
  for (var key in param) {
    item = param[key];
    if (isArray(item)) {
      res[key] = item.slice(0);
    } else if (isObject(item)) {
      res[key] = clone(item)
    } else {
      res[key] = item;
    }
  }
}

export function merge(tar, src) {
  var item;
  for (var key in src) {
    item = src[key];
    if (isArray(item)) {
      if (isUndefined(tar[key])) {
        tar[key] = [];
      }
      tar[key] = tar[key].concat(item);
    } else if (isObject(item)) {
      if (isUndefined(tar[key])) {
        tar[key] = {};
      }
      merge(tar[key], item);
    } else {
      tar[key] = item;
    }
  }
}