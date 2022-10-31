import { processTokens } from './src/token-handling.js'

const theme = process.argv[2]
if (!theme) throw 'Need a theme to process!'

const result = await processTokens(theme)
console.log(result)
