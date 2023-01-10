import { processFile } from './src/process.js'
import { wrapDarkMedia, rootWrap } from './src/util.js'
import * as lightning from 'lightningcss'
import path from 'node:path'
import glob from 'glob'

export default function (folderPath, options = {}) {
  const CWD = process.cwd()
  const realPath = path.join(CWD, folderPath)
  const inputs = glob.sync(`${realPath}/**/*.y?(a)ml`)
  if (!inputs.length) throw `Nothing found at ${realPath} with the suffix .yml or .yaml`

  const tokens = inputs.map(processFile)
  const darkTokens = tokens.filter(t => t.dark).flatMap(t => t.tokens)
  const normalTokens = tokens.filter(t => !t.dark).flatMap(t => t.tokens)
  const result = rootWrap(normalTokens.join('\n')) + '\n' + wrapDarkMedia(rootWrap(darkTokens.join('\n')))

  const { code } = lightning.transform({
    code: Buffer.from(result),
    minify: options.minify ?? true,
    targets: {
      safari: (12 << 16),
      chrome: (80 << 16),
      firefox: (80 << 16),
    }
  })

  return code.toString()
}
