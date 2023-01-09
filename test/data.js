export const basicTree = Object.freeze({
  foo: {
    bar: {
      baz: 'biz'
    }
  }
})

export const flatTree = Object.freeze({
  foo: {
    bar: { baz: 'biz' },
    _: 'maybe',
    wombat: 'llama',
    platypus: 'alpaca'
  }
})

export const deepTree = Object.freeze({
  foo: {
    bar: { baz: 'biz' },
    _: {
      _: 'maybe',
      wombat: 'llama',
      platypus: 'alpaca'
    }
  }
})
