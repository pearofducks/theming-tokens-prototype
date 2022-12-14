const buildToken = (prefix, name) => {
  const result = []
  if (prefix) result.push(prefix)
  if (name !== '_') result.push(name)
  return result.join('-')
}

export const mergeTree = (innerObj, _prefix = '', result = {}) => {
  for (const [_name, entry] of Object.entries(innerObj)) {
    const token = buildToken(_prefix, _name)
    if (typeof entry === 'object') mergeTree(entry, token, result)
    else result[token] = entry
  }
  return result
}

export const wrapDarkMedia = v => `@media (prefers-color-scheme:dark) {
${v}
}`

const tokenKey = k => `--f-${k}:`
export const toCSSMap = ([k, v]) => `${tokenKey(k)} var(--f-${v});`
export const toCSSDef = ([k, v]) => `${tokenKey(k)} ${v};`
