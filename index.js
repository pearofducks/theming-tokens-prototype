import { processTokens } from './src/process.js'
import fs from 'node:fs'
import path from 'node:path'
import glob from 'glob'

const themeLocation = process.argv[2]
if (!themeLocation) throw 'Need a theme location to process'
const realPath = path.resolve(themeLocation)
if (!fs.existsSync(realPath)) throw `${realPath} doesn't seem to exist`


const inputs = glob.sync(`${realPath}/**/*.y?(a)ml`)
if (!inputs.length) throw `Nothing found at ${realPath} with the suffix .yml or .yaml`

const result = inputs.map(processTokens)
console.log({ inputs })
// const result = processTokens(themes[theme])
// console.log(result)
