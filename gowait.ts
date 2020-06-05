
const nativeErrorTypes = [
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError,
].filter(x => typeof x === 'function')

function throwIfNativeError(error: Error) {
  for (const NativeError of nativeErrorTypes) {
    if (error instanceof NativeError) throw error
  }
}

function noop () { void 0 }
function valueTuple<T>(arg: T): [null, T] {
  return [null, arg]
}
function errorTuple(error: Error): [Error, undefined] {
  throwIfNativeError(error)
  return [error, undefined]
}

export type ErrorValue<T> = [Error, undefined] | [null, T]

/**
 * Kind of like nodes ErrBacks, but with the ease (and overhead) of promises.
 *
 * const [err, value] = await gowait(doWorkThatMightErrorAsync())
 *
 * //handle error
 * //handle value
 *
 * @param promised
 */
export function gowait<T>(promised: Promise<T>, final: (...args: any[]) => any = noop): Promise<ErrorValue<T>> {
  return promised.then(valueTuple).catch(errorTuple).finally(noop)
}



