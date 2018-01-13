function changeImmutable(dest, src, path, changeCallback) {
  if (isNumber(path)) {
    path = [path];
  }

  if (isEmpty(path)) {
    return src;
  }

  if (isString(path)) {
    return changeImmutable(dest, src, path.split('.').map(getKey), changeCallback);
  }

  var currentPath = path[0];

  if (!dest || dest === src) {
    dest = clone(src, true, isNumber(currentPath));
  }

  if (path.length === 1) {
    return changeCallback(dest, currentPath);
  }

  if (src != null) {
    src = src[currentPath];
  }

  dest[currentPath] = changeImmutable(dest[currentPath], src, path.slice(1), changeCallback);

  return dest;
}

function getKey(key) {
  var intKey = parseInt(key);

  if (intKey.toString() === key) {
    return intKey;
  }

  return key;
}

function isNumber(value) {
  return typeof value === 'number';
}

function isString(value) {
  return typeof value === 'string';
}

export function isArray(value) {
  return Array.isArray(value);
}

function isEmpty(value) {
  if (!value) {
    return true;
  }

  if (isArray(value) && value.length === 0) {
    return true;
  } else if (value instanceof Object) {
    return Object.keys(value).length === 0;
  }

  return false;
}

export function clone(obj, createIfEmpty, assumeArray) {
  if (!obj) {
    if (createIfEmpty) {
      if (assumeArray) {
        return [];
      }

      return {};
    }
  } else if (isArray(obj)) {
    return obj.slice(0);
  } else if (obj instanceof Object) {
    return Object.assign({}, obj);
  } else {
    throw new Error('clone accepts only array or object');
  }
}

export function set(src, path, value) {
  let dest = clone(src);

  return changeImmutable(dest, src, path, (clonedObj, finalPath) => {
    clonedObj[finalPath] = value;
    return clonedObj;
  });
}

export function del(src, path) {
  let dest = clone(src);

  return changeImmutable(dest, src, path, (clonedObj, finalPath) => {
    if (isArray(clonedObj)) {
      if (clonedObj[finalPath] !== undefined) {
        clonedObj.splice(finalPath, 1);
      }
    } else {
      delete clonedObj[finalPath];
    }

    return clonedObj;
  });
}
