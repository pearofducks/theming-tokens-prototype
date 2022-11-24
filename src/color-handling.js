import * as themes from '#themes'
import slugify from '@sindresorhus/slugify'

/**
 * @typedef WeightSpec
 * @type {Object}
 * @property {string} hex
 * @property {string | number} weight
 */

/**
 * @typedef HueSpec
 * @type {Object}
 * @property {Array.<WeightSpec>} colors
 */

const toCssVar = ([k, v]) => `--f-${k}: ${v};`
const cssify = obj => Object.entries(obj).reduce((acc, e) => (acc.push(toCssVar(e)), acc), [])

/** @arg {Object.<string, HueSpec>} obj */
export const flatten = (obj) => Object.entries(obj).reduce((acc, [hue, shades]) => {
  for (const shade of shades) acc[slugify(`${hue} ${shade.weight}`)] = shade.hex
  return acc
}, {})

export const process = (theme = 'finn') => {
  const colors = themes[theme].colors
  return cssify(flatten(colors))
}
