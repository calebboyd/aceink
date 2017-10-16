export const bound: MethodDecorator = function bound<T>(
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
) {
  const configurable = true
  return {
    configurable,
    get(this: T) {
      const value = (descriptor.value as any).bind(this)
      Object.defineProperty(this, propertyKey, { configurable, value, writable: true })
      return value
    }
  }
}
