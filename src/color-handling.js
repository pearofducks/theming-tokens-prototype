import * as themes from '#themes'
import slugify from '@sindresorhus/slugify'

/**
 * @typedef WeightSpec
 * @type {Object}
 * @property {string} hex
 * @property {string} weight
 */

/**
 * @typedef ColorSpec
 * @type {Object}
 * @property {string} name
 * @property {Array.<WeightSpec>} colors
 */

/**
 * @type {Object.<string, string>} CssObject - a flattened set of colors, e.g. { 'gray-700': '#777' }
 */


const toCssVar = ([k, v]) => `--f-${k}: ${v};`

/**
* @arg {Array.<ColorSpec>} arr
* @returns {CssObject}
*/
const createColorObject = arr => arr.reduce((acc, colorSpec) => {
  for (const weightSpec of colorSpec.colors) {
    acc[slugify(`${colorSpec.name} ${weightSpec.weight}`)] = weightSpec.hex
  }
  return acc
}, {})

/** @arg {CssObject} obj */
const cssify = obj => Object.entries(obj).reduce((acc, e) => (acc.push(toCssVar(e)), acc), [])

const process = (obj) => Object.entries(obj).reduce((acc, [hue, shades]) => {
  for (const shade of shades) acc[slugify(`${hue} ${shade.weight}`)] = shade.hex
  return acc
}, {})

export const processColors = (theme = 'finn') => {
  const colors = themes[theme].colors
  const result = cssify(process(colors))
  console.log(result)
}
processColors()
// console.log(cssify(createColorObject(colors)))
