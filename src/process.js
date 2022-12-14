import { mergeTree, readYaml } from './util.js'

export const processTokens = (filePath) => {
  console.log("TRYING TO READ", filePath)
  const doc = readYaml(filePath)
  if (!doc.token) throw "'token' is required for each document and can be set to either 'defs' or 'maps'"
  const tokenType = doc.token
  delete doc.token
  const tokens = mergeTree(doc)
  console.log("PROCESSED", tokens)
}
