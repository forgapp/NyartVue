export function formattCodesArray(codesArray) {
  if (!codesArray) {
    return {};
  }

  return codesArray.reduce(reduceCodes, {});
}

function reduceCodes(aggr, curr) {
  if (!aggr[curr.Category]) {
    return {
      ...aggr,
      [ curr.Category ]: [ curr.Code ]
    };
  }

  const newCodes = Object.assign({}, aggr, {
    [curr.Category]: [ ...aggr[curr.Category], curr.Code ]
  });

  return newCodes;
}
