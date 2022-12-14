import { mergeTree, readYaml, toCSSDef, toCSSDef } from './util.js'

export const processTokens = (filePath) => {
  const doc = readYaml(filePath)
  if (!doc.token) throw "'token' is required for each document and can be set to either 'defs' or 'maps'"
  const tokenType = doc.token
  delete doc.token
  const merged = mergeTree(doc)
  const tokens = Object.entries(merged).map(tokenType === 'defs' ? toCSSDef : toCSSMap)
  console.log(tokens)
  // turn into tokens based on tokenType
}
