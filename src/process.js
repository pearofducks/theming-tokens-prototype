import { mergeTree } from './util.js'

export const processTokens = (doc) => {
  console.log("PROCESSING", doc)
  if (!doc.token) throw "'token' is required for each document and can be set to either 'defs' or 'maps'"
  const tokenType = doc.token
  delete doc.token
  const tokens = mergeTree(doc)
  console.log("PROCESSED", tokens)
}
