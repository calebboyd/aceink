## aceink

Useful async tools.

- `createLock`
  - a simple counting sempahore
- `createDeferred`
  - simple deferred promise
- `q`
  - a concurrent work queue
- `each`, `map`
  - *optionally* concurrent iteration functions
- `gowait`
  - convert a promise or promise returning function to `[error,result]` tuples
- `delay`
  - delay ms, optionally resolve an argument
- `noop`, `identity`, `once`
  - Other useful language functions

Get it on npm: `npm install aceink`

See the generated documentation [here](/docs/modules.md)

---
### Example (queue)

```javascript
import { q } from 'aceink'

const { ready, add, empty } = q(10)

function fetchQux(bar) {
  return fetch(`https://example.com/${bar}`)
}

for (const foo of Array(100).keys()) {
  await ready()
  add(fetchQux, foo)
}
return empty()

```

### Example (gowait)

```javascript
import { gowait, delay } from 'aceink'

const [err, value] = await gowait(delay(100, 42))
console.log(value) //42
```
