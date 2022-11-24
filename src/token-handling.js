import * as themes from '#themes'

export const wrapDarkMedia = v => `@media (prefers-color-scheme:dark) {
${v}
}`

const toCssVars = ([k, v]) => `--f-${k}: var(--f-${v});`

/**
 * @arg {Object.<string, string>} obj
 * @returns {string[]}
 */
const cssify = obj => Object.entries(obj).reduce((acc, e) => (acc.push(toCssVars(e)), acc), [])

/**
 * Traverses the object and applies parent-prefixes to children
 * @arg {Object.<string, (object | string)>} obj
 * @arg {string} prefix
 * @returns {Object.<string, object>}
 */
const _process = (obj) => {
  const result = { light: {}, dark: {} }
  const walk = (obj, _prefix = '') => {
    for (const [_name, entry] of Object.entries(obj)) {
      const name = []
      if (_prefix) name.push(_prefix)
      if (_name !== '_') name.push(_name)
      const token = name.join('-')
      if (typeof entry === 'object') walk(entry, token)
      else {
        if (_name === '$DARK') result.dark[_prefix] = entry
        else if (_name === '$LIGHT') result.light[_prefix] = entry
        else result.light[token] = entry
      }
    }
  }
  walk(obj)
  for (const [variant, tokens] of Object.entries(result)) result[variant] = cssify(tokens)
  return result
}

export const handle = (theme) => {
  const tokens = themes[theme].tokens
  if (!tokens) throw `'tokens' is empty for ${theme}`
  return _process(tokens)
}
