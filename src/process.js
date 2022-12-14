import { mergeTree, readYaml, toCSSDef, toCSSMap } from './util.js'

export const processFile = (filePath) => {
  const doc = readYaml(filePath)
  return processTokens(doc)
}

/**
 * @typedef TokenResult
 * @type {Object}
 * @property {boolean} dark
 * @property {Array.<string>} tokens
 */

/**
 * @arg {object} tokenTree
 * @returns {TokenResult}
 */
export const processTokens = (tokenTree) => {
  if (!tokenTree.token) throw "'token' is required for each document and can be set to either 'defs' or 'maps'"
  const isDark = !!tokenTree.dark
  delete tokenTree.dark
  const tokenType = tokenTree.token
  delete tokenTree.token
  const merged = mergeTree(tokenTree)
  const tokens = Object.entries(merged).map(tokenType === 'defs' ? toCSSDef : toCSSMap)
  return { dark: isDark, tokens }
}
