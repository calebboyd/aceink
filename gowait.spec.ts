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

  it('should throw native errors', async () => {
    //TODO
  })
})
