import * as themes from '#themes'

const toCssVars = ([k, v]) => `--f-${k}: var(--f-${v});`

/**
 * Traverses the object and applies parent-prefixes to children
 * @arg {Object.<string, (object | string)>} obj
 * @arg {string} prefix
 * @returns {Object.<string, (object | string)>}
 */
const walkAndJoin = (obj, _prefix = '') => Object.entries(obj).reduce((acc, [_name, entry]) => {
  const name = []
  if (_prefix) name.push(_prefix)
  if (_name !== '_') name.push(_name)
  const token = name.join('-')
  acc[token] = typeof entry === 'object' ? walkAndJoin(entry, token) : entry
  return acc
}, {})

/**
 * @arg {Object.<string, (object | string)>} obj
 * @returns {Object.<string, string>}
 */
const flatten = (obj, res = {}) => {
  Object.entries(obj).forEach(([k, v]) => {
    if (typeof v === 'object') flatten(v, res)
    else res[k] = v
  })
  return res
}

/**
 * @arg {Object.<string, string>} obj
 * @returns {string[]}
 */
const cssify = obj => Object.entries(obj).reduce((acc, e) => (acc.push(toCssVars(e)), acc), [])

export const processTokens = async (theme) => {
  const tokens = themes[theme].tokens
  if (!tokens) throw `'tokens' is empty for ${theme}`
  return cssify(flatten(walkAndJoin(tokens)))
}
