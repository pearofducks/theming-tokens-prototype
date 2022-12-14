import fs from 'node:fs'
import yaml from 'yaml'

export const readYaml = filePath => yaml.parse(fs.readFileSync(filePath, 'utf-8'))

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

export const rootWrap = v => `:root, :host {
${v}
}`

const tokenKey = k => `--x-${k}:`
export const toCSSMap = ([k, v]) => `${tokenKey(k)} var(--x-${v});`
export const toCSSDef = ([k, v]) => `${tokenKey(k)} ${v};`
