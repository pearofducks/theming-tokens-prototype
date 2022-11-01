// export * from './colors.js'
// export * as tokens from './tokens.js'
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'yaml'
import drnm from 'drnm'

const __dirname = drnm(import.meta.url)

export const colors = yaml.parse(fs.readFileSync(path.join(__dirname, './colors.yaml'), 'utf-8'))
export const tokens = yaml.parse(fs.readFileSync(path.join(__dirname, './tokens.yaml'), 'utf-8'))
