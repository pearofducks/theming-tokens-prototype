import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import * as util from './src/util.js'

const utilTest = suite('utils')

utilTest('mergeTree simple', () => {
  const tree = {
    foo: {
      bar: {
        baz: 'biz'
      }
    }
  }
  const result = util.mergeTree(tree)
  assert.equal(result, { 'foo-bar-baz': 'biz' })
})

utilTest('mergeTree underscore ignored', () => {
  const treeFlat = {
    foo: {
      bar: { baz: 'biz' },
      _: 'maybe',
      wombat: 'llama',
      platypus: 'alpaca'
    }
  }
  const treeDeep = {
    foo: {
      bar: { baz: 'biz' },
      _: {
        _: 'maybe',
        wombat: 'llama',
        platypus: 'alpaca'
      }
    }
  }
  assert.equal(util.mergeTree(treeDeep), {
    'foo-bar-baz': 'biz',
    'foo': 'maybe',
    'foo-wombat': 'llama',
    'foo-platypus': 'alpaca'
  })
  assert.equal(util.mergeTree(treeFlat), util.mergeTree(treeDeep))
})

utilTest('toCSS', () => {
  assert.is(util.toCSSMap(['foo', 'bar']), '--x-foo: var(--x-bar);')
  assert.is(util.toCSSDef(['foo', 'bar']), '--x-foo: bar;')
})

utilTest.run()
