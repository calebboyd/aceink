export const bound: MethodDecorator = function bound<T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) {  
  return {
    configurable: true,
    get(this: T) {
      const value = (descriptor.value as any).bind(this)
      Object.defineProperty(this, propertyKey, { value, configurable: true, writable: true })
      return value
    }
  }
}
