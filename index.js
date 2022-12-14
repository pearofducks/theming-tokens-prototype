import { processTokens } from './src/process.js'
import * as themes from '#themes'

const theme = process.argv[2]
if (!theme) throw 'Need a theme to process!'

console.log({ theme })
const result = processTokens(themes[theme])
console.log(result)
