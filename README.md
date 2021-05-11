## async

Useful async tools optimized for dx.

a queue, a lock, and concurrent map and each

Get it on npm: `npm install @calebboyd/async`

---
### Example (queue)

```javascript
import { q } from '@calebboyd/async'

const { ready, add, empty } = q(10)

function fetchQux(qux) {
  return fetch(`https://example.com/${qux}`)
}

const fooBars = Array.from(Array(100).keys())
for (const value of fooBars) {
  await ready()
  add(fetchQux, value)
}
return empty()

```

### Example (gowait)

```javascript
import { gowait, delay } from '@calebboyd/async'

const [err, value] = await gowait(delay(100, 42))
console.log(value) //42
```

see the generated documentation [here](/docs/modules.md)
