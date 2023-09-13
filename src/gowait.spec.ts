import { describe, it, expect } from 'vitest'
import { gowait, wrap as wrapGoWait } from './gowait.js'

describe('gowait', () => {
  it('should return the result of the function', async () => {
    const func = () => Promise.resolve('1234')
    const [_, result] = await gowait(func())
    expect(result).toEqual('1234')
    expect(_).toBeNull()
  })

  it('should return the result of a promise returning function', async () => {
    const func = (arg1: number, arg2: number, _: string) =>
      Promise.resolve('1234' + arg1 + arg2 + _)
    const [_, result] = await gowait(func, 5, 6, '')
    expect(result).toEqual('123456')
    expect(_).toBeNull()
  })
  it('should return the error of the function', async () => {
    const func = () => new Promise((_, j) => j('1234'))
    const [error, result] = await gowait(func())
    expect(result).toBeUndefined()
    expect(error).toEqual('1234')
  })

  it('should execute a non-thenable function object', async () => {
    const func = (arg: number): Promise<string> => {
      return Promise.reject('1234' + arg)
    }

    const [error, result] = await gowait(func, 5)
    expect(result).toBeUndefined()
    expect(error).toEqual('12345')

    const resolved = Promise.resolve('abcd')
    func.then = resolved.then.bind(resolved)

    const [err, value] = await gowait(func, 1)
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

  it('should allow wrapping a function where the wrapped function requires an type parameter to access the result', async () => {
    type FuncErrors = Error | null
    const func = (arg: number): Promise<number> => {
      return Promise.reject(new Error(arg.toString()))
    }
    const wrapped = wrapGoWait(func)
    // a <FuncErrors> (or any type) is required
    const [error, result] = await wrapped<FuncErrors>(1234)
    expect(result).toBeUndefined()
    expect(error).toEqual(new Error('1234'))
  })
})
