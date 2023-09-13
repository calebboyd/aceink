import { readFileSync as rf, writeFileSync as wf } from 'node:fs'
import { resolve, dirname, relative, basename } from 'node:path'
import { argv, execPath } from 'node:process'
import { fileURLToPath } from 'node:url'
import { log } from 'node:console'

import { $ } from 'execa'

// A - tsconfig configured
await $({ stdio: 'inherit' })`tsc --sourceRoot "$(pwd)/src"`

const filename = basename(fileURLToPath(import.meta.url)),
  [dest] = argv.filter((x) => x !== execPath && !x.endsWith(filename)),
  dir = dirname(dest),
  resolved = resolve(dir),
  pkg = JSON.parse(rf('./package.json'))

if (!dest.endsWith('package.json')) {
  throw new Error('Expected destination package.json file. Got: ' + dest)
}

toggleType(pkg)
wf('./package.json', JSON.stringify(pkg, null, 2))
// B - opposite tsconfig configured
await $({ stdio: 'inherit' })`tsc --sourceRoot "$(pwd)/src" --outDir ${dir}`

// Write back original
toggleType(pkg)
wf('./package.json', JSON.stringify(pkg, null, 2))

// Write altered destination package.json
toggleType(pkg)
entry(pkg.exports)
entry(pkg.imports)
const mainFields = { main: pkg.main, module: pkg.module, typings: pkg.typings }
entry(mainFields)
Object.assign(pkg, mainFields)

wf(dest, JSON.stringify(pkg, null, 2))

function entry(obj) {
  for (const ent in obj) {
    if (typeof obj[ent] === 'string') {
      obj[ent] = './' + relative(resolved, obj[ent])
      log(ent, obj[ent])
    } else if (typeof obj[ent] === 'object') {
      entry(obj[ent])
    }
  }
}

function toggleType(pkg) {
  pkg.type = pkg.type === 'module' ? 'commonjs' : 'module'
}
