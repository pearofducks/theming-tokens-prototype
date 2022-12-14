import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { processTokens } from '../src/process.js'
import * as testData from './data.js'

const test = suite('process')

test('processTokens - defs', () => {
  assert.throws(() => processTokens(testData.deepTree))
  const result = processTokens({ ...testData.deepTree, token: 'defs' })
  assert.not(result.dark)
  assert.ok(result.tokens.includes('--x-foo: maybe;'))
  assert.not(result.tokens.includes('--x-foo: var(--x-maybe);'))
})

test('processTokens - maps', () => {
  assert.throws(() => processTokens(testData.deepTree))
  const result = processTokens({ ...testData.deepTree, token: 'maps' })
  assert.not(result.dark)
  assert.not(result.tokens.includes('--x-foo: maybe;'))
  assert.ok(result.tokens.includes('--x-foo: var(--x-maybe);'))
})

test.run()
