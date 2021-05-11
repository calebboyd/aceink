import { gowait } from './gowait'

describe('gowait', () => {
  it('should return the result of the function', async () => {
    const func = () => Promise.resolve('1234')
    const [_, result] = await gowait(func())
    expect(result).toEqual('1234')
    expect(_).toBeNull()
  })
  it('should return the error of the function', async () => {
    const func = () => Promise.reject('1234')
    const [error, result] = await gowait(func())
    expect(result).toBeUndefined()
    expect(error).toEqual('1234')
  })

  it('should execute a non-thenable function', async () => {
    const func = () => Promise.reject('1234')
    const [error, result] = await gowait(func)
    expect(result).toBeUndefined()
    expect(error).toEqual('1234')

    const resolved = Promise.resolve('abcd')
    ;(func as any).then = resolved.then.bind(resolved)
    const [err, value] = await gowait(func)
    expect(value).toEqual('abcd')
    expect(err).toBeNull()
  })

  it('should throw native errors', async () => {
    //TODO
  })
})
