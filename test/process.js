import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { processTokens } from '../src/process.js'
import * as testData from './data.js'

const test = suite('process')

test('processTokens - throws', () => {
  assert.throws(() => processTokens(testData.deepTree))
})

test('processTokens - defs', () => {
  const result = processTokens({ ...testData.deepTree, token: 'defs' })
  assert.not(result.dark)
  assert.ok(result.tokens.includes('--x-foo: maybe;'))
  assert.not(result.tokens.includes('--x-foo: var(--x-maybe);'))
})

test('processTokens - maps', () => {
  const result = processTokens({ ...testData.deepTree, token: 'maps' })
  assert.not(result.dark)
  assert.not(result.tokens.includes('--x-foo: maybe;'))
  assert.ok(result.tokens.includes('--x-foo: var(--x-maybe);'))
})

test('processTokens - dark', () => {
  const darkResult = processTokens({ ...testData.deepTree, token: 'maps', dark: true })
  assert.ok(darkResult.dark)

  const lightResult = processTokens({ ...testData.deepTree, token: 'maps', dark: true })
  assert.not(lightResult.dark)
})

test.run()
