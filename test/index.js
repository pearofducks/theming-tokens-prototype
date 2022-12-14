import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import * as util from '../src/util.js'
import path from 'node:path'
import drnm from 'drnm'

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

utilTest('read yaml', () => {
  const __dirname = drnm(import.meta.url)
  const json = util.readYaml(path.join(__dirname, './fixture.yaml'))
  assert.equal(json, {
    "hello": "world",
    "nested": {
      "object": "here"
    }
  })
})

utilTest.run()
