import fs from 'node:fs'
import yaml from 'yaml'
import slugify from './slugify.js'

/**
 * @arg {string} filePath
 * @returns {object}
 */
export const readYaml = filePath => yaml.parse(fs.readFileSync(filePath, 'utf-8'))

/**
 * Handles merging prefix with name
 * @arg {string} prefix
 * @arg {string} name
 * @returns {string}
 */
const buildToken = (prefix, name, result = []) => {
  if (prefix) result.push(prefix)
  if (name !== '_') result.push(name)
  return slugify(result.join(' '))
}

/**
 * Merges parent keys onto children - will produce a flat object structure
 * @arg {Object.<string, string|object>} obj
 * @arg {string} _prefix
 * @arg {Object.<string, string>} result
 * @returns {Object.<string, string>}
 */
export const mergeTree = (obj, _prefix = '', result = {}) => {
  for (const [_name, entry] of Object.entries(obj)) {
    const token = buildToken(_prefix, _name)
    if (typeof entry === 'object') mergeTree(entry, token, result)
    else result[token] = entry
  }
  return result
}

const tokenKey = k => `--x-${k}:`
export const toCSSMap = ([k, v]) => `${tokenKey(k)} var(--x-${v});`
export const toCSSDef = ([k, v]) => `${tokenKey(k)} ${v};`
export const wrapDarkMedia = v => `@media (prefers-color-scheme:dark) { ${v} }`
export const rootWrap = v => `:root, :host { ${v} }`
