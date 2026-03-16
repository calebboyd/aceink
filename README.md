## aceink

Useful async tools.

- `createLock`
  - a simple counting sempahore
- `createDeferred`
  - simple deferred promise
- `q`
  - a concurrent work queue
  - supports `pause()` / `start()` for temporarily halting queue drain
- `each`, `map`
  - _optionally_ concurrent iteration functions
- `timeout` and `signal` options
  - bound hung queue, each, and map work
- `gowait`
  - convert a promise or promise returning function to `[error,result]` tuples
- `delay`
  - delay ms, optionally resolve an argument
- `noop`, `identity`, `once`
  - Other useful language functions

Get it on npm: `npm install aceink`

See the generated documentation [here](/docs/globals.md)

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

Queue tasks can also be time-bounded or aborted while waiting or running:

```javascript
import { AbortError, q } from 'aceink'

const queue = q(2, { timeout: 5000 })
const controller = new AbortController()

try {
  const work = queue.add(() => fetch('https://example.com'), undefined, { signal: controller.signal })

  controller.abort()
  await work
} catch (error) {
  if (!(error instanceof AbortError)) throw error
}
```

Queues can also be paused and resumed without affecting work that is already running:

```javascript
const queue = q(2)

queue.pause()
const work = queue.add(async () => 'value')

queue.start()
await work
```

### Example (gowait)

```javascript
import { gowait, delay } from 'aceink'

const [err, value] = await gowait(delay(100, 42))
console.log(value) //42
```
