import { describe, it, expect } from 'vitest'
import { gowait } from './gowait.js'

describe('gowait', () => {
  it('should return the result of the function', async () => {
    const func = () => Promise.resolve('1234')
    const [_, result] = await gowait(func())
    expect(result).toEqual('1234')
    expect(_).toBeNull()
  })

  it('should return the result of a promise returning function', async () => {
    const func = (arg1: number, arg2: number) => Promise.resolve('1234' + arg1 + arg2)
    const [_, result] = await gowait(func, 5, 6)
    expect(result).toEqual('123456')
    expect(_).toBeNull()
  })
  it('should return the error of the function', async () => {
    const func = () => Promise.reject('1234')
    const [error, result] = await gowait(func())
    expect(result).toBeUndefined()
    expect(error).toEqual('1234')
  })

  it('should execute a non-thenable function object', async () => {
    const func = (arg: number) => {
      return Promise.reject('1234' + arg)
    }
    const [error, result] = await gowait(func, 5)
    expect(result).toBeUndefined()
    expect(error).toEqual('12345')

    const resolved = Promise.resolve('abcd')
    func.then = resolved.then.bind(resolved)
    const [err, value] = await gowait(func)
    expect(value).toEqual('abcd')
    expect(err).toBeNull()
  })

  it('should catch synchronous errors and only throw native ones', async () => {
    const func = () => {
      new Function('%.(4)')()
      return Promise.resolve()
    }
    let caught = false
    await gowait(func).catch((e) => {
      caught = true
      expect(e).toBeInstanceOf(SyntaxError)
    })
    expect(caught).toBe(true)
  })
})
