import colors from '../themes/finn/colors.js'
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

console.log(cssify(createColorObject(colors)))
