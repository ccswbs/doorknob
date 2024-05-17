export function partition(arr, predicate) {
  return arr.reduce(
    ([truthy, falsy], elem) => {
      return predicate(elem) ? [[...truthy, elem], falsy] : [truthy, [...falsy, elem]];
    },
    [[], []],
  );
}
