/**
 * Deep merge
 *
 * @export
 * @param {object} targets
 * @returns
 */
export function deepMerge(targets) {
  const sources = [].slice.call(arguments, 1)
  sources.forEach(source => {
    for (let p in source) {
      if (typeof source[p] === 'object') {
        targets[p] = targets[p] || (Array.isArray(source[p]) ? [] : {})
        deepMerge(targets[p], source[p])
      } else {
        targets[p] = source[p]
      }
    }
  })
  return targets
}
