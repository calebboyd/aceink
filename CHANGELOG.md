# Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/calebboyd/aceink/compare/v1.3.1...v2.0.0) (2026-03-16)


* feat!: move queue bound into QueueOptions ([3fe1977](https://github.com/calebboyd/aceink/commit/3fe197793f511a5c043f97803e108cc5b918f894))


### Bug Fixes

* close iterators on early bail ([e5fe3eb](https://github.com/calebboyd/aceink/commit/e5fe3eb1dd317c0d3ee63c52f1ea1f47db32407a))
* tighten queue backpressure and state tracking ([4ec8f35](https://github.com/calebboyd/aceink/commit/4ec8f3568f64aede2a4a837c4b806a8b46443a74))


### Features

* add queue timeout and abort support ([6ba0ecb](https://github.com/calebboyd/aceink/commit/6ba0ecb047d89b7e1bc92181cc12988be1bea1e3))


### BREAKING CHANGES

* Queue and q now accept bound through QueueOptions instead of a positional boolean argument.

## [1.3.1](https://github.com/calebboyd/aceink/compare/v1.3.0...v1.3.1) (2026-03-16)

### Bug Fixes

- harden queue semantics and migrate to oxc tooling ([ce5856c](https://github.com/calebboyd/aceink/commit/ce5856c2df1b6b9fc73b13dd7128948c398839fc))
- update workflows ([0ecd55a](https://github.com/calebboyd/aceink/commit/0ecd55a7e836ce2b4172cbab2ddcfb51878ecbd4))

## [Unreleased]

### Breaking Changes

- fold queue `bound` into the `QueueOptions` object for both `new Queue()` and `q()`

### Features

- add queue task timeouts and abort signals, and thread them through `each()` and `map()`
- add queue `pause()` and `start()` controls for temporarily halting queue drain
- add queue `clear()` and reject removed queued tasks with `QueueClearedError`
- add queue `onEmpty()` to wait for queued work to drain separately from `empty()`

# [2.0.0](https://github.com/calebboyd/async/compare/v1.3.0...v2.0.0) (2026-03-16)

### Breaking Changes

- queue tasks now settle when their own work settles instead of waiting for earlier queued tasks to finish

### Bug Fixes

- harden queue and semaphore behavior around rejected work, drain handling, and over-release state
- make each and map preserve falsy contexts, support bounded iteration better, and cover error handling semantics with tests
- make once swap to its fallback even after the first call throws
- fix gowait wrap typings for awaited return values

### Chores

- replace eslint and prettier with oxlint and oxfmt, update editor settings, and regenerate docs

# [1.3.0](https://github.com/calebboyd/async/compare/v1.2.0...v1.3.0) (2023-09-13)

### Features

- add gowait wrap ([8dbfd3c](https://github.com/calebboyd/async/commit/8dbfd3cc23c01a5e5d36be7ab034a7cfbb928fac))

# [1.2.0](https://github.com/calebboyd/async/compare/v1.1.0...v1.2.0) (2023-09-12)

### Features

- add wrap for currying gowait functions ([24af8e6](https://github.com/calebboyd/async/commit/24af8e62fce00c9511bbf4971fe0ef464412313c))

# [1.1.0](https://github.com/calebboyd/async/compare/v1.0.1...v1.1.0) (2023-09-11)

### Features

- support currying args to gowait ([4513f39](https://github.com/calebboyd/async/commit/4513f39788239ed8d359f629315c6073ced42d94))

## [1.0.1](https://github.com/calebboyd/async/compare/v1.0.0...v1.0.1) (2023-04-01)

### Bug Fixes

- bump version ([732201d](https://github.com/calebboyd/async/commit/732201d0d97e6817f5cb16302f34e658b5e966b7))

# 1.0.0 (2023-04-01)

### Bug Fixes

- handle queue errors ([b0d32f4](https://github.com/calebboyd/async/commit/b0d32f4128042db999c39ee5d55e69d7b4a3ab68))
- regenerate docs ([ce8a509](https://github.com/calebboyd/async/commit/ce8a509d35a89cb9a5f523ba3e6a6d3bc5cf2b89))
- update build and rename ([6b3f238](https://github.com/calebboyd/async/commit/6b3f2383424ed3d9d0634d77896123f7b13bbbdd))

### Features

- add serial methods ([7e8508a](https://github.com/calebboyd/async/commit/7e8508aa4b7ae805a24ad7e8e4d3691cca834aab))
- expose deferred ([b8ce91c](https://github.com/calebboyd/async/commit/b8ce91c07f5631457b48ac94147530f0a1ca2ada))
- fifo work queue ([7fafc9b](https://github.com/calebboyd/async/commit/7fafc9be409242475464248282005a131bb4c40a))
- gowait promise->[err,result] ([d663938](https://github.com/calebboyd/async/commit/d663938a12e259ec9ffe37c8226ef56ee058160c))
- pass values through acquire ([b757279](https://github.com/calebboyd/async/commit/b7572793fa45a654cd33bbef6f2b94f532ec23b0))
- update bound methods on queue and semaphore ([f7b1cbb](https://github.com/calebboyd/async/commit/f7b1cbb2f66dc4a56d1b3850cf15835de29491e3))
