import { describe, expect, it, vi } from 'vitest'
import { once } from './lang.js'

describe('once', () => {
  it('should switch to the fallback even when the first call throws', () => {
    const after = vi.fn(() => 'after')
    const run = once(() => {
      throw new Error('boom')
    }, after)

    expect(run).toThrow('boom')
    expect(run()).toBe('after')
    expect(after).toHaveBeenCalledTimes(1)
  })
})
