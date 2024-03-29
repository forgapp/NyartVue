function isArray(value) {
  return Array.isArray(value);
}

export function isEmpty(value) {
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

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
