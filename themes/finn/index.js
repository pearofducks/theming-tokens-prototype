// export * from './colors.js'
// export * as tokens from './tokens.js'
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'yaml'
import drnm from 'drnm'

const __dirname = drnm(import.meta.url)

export const definitions = yaml.parse(fs.readFileSync(path.join(__dirname, './definitions.yaml'), 'utf-8'))
export const mappings = yaml.parse(fs.readFileSync(path.join(__dirname, './mappings.yaml'), 'utf-8'))
