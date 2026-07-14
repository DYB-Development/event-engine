# Contributing to event-engine

Thanks for your interest in improving event-engine. Contributions are welcome —
this guide covers how to propose changes and get them merged.

## How contributions work

- This repository is maintained by **DYB, L.L.C.** All changes land through pull
  requests that a maintainer reviews and merges. Direct pushes to `main` are
  disabled, and every PR must pass CI before it can merge.
- Contributions are accepted at the maintainers' discretion. Opening an issue or
  PR is a proposal, not a guarantee of merge.
- For anything beyond a trivial fix, **open an issue first** so the approach can
  be agreed on before you invest time. It avoids work that doesn't fit the
  direction of the project.

## Reporting issues

Use the issue templates under **New issue**:

- `type:bug` — something is broken. Include repro steps and expected vs. actual.
- `type:task` — a self-contained unit of work with acceptance criteria.
- `type:idea` / `type:plan` — a proposal or design to discuss before code.

Keep each issue standalone: inline the context needed to act on it rather than
referencing prior discussion.

## Development setup

Prerequisites:

- **Node.js >= 20**
- **pnpm 11.5.1** (enable via `corepack enable`)

Install dependencies:

```sh
pnpm install --frozen-lockfile
```

This is a pnpm workspace monorepo; the packages live in the top-level
`core`, `ports`, `store`, `stats`, `metrics`, `delivery`, `dashboards`, and
`telemetry` directories.

## The workflow

1. Fork the repo and create a feature branch off `main`
   (e.g. `fix/store-replay-ordering`).
2. Make your change following **strict TDD** — write one failing test, watch it
   fail, write the minimum code to pass, watch it pass, commit. One behavior per
   commit.
3. Run the full check suite locally (see below) and make sure it's green.
4. Push and open a pull request against `main`.

## Commands

| Command | What it does |
|---|---|
| `pnpm install --frozen-lockfile` | Install dependencies |
| `pnpm test` | Run the test suite (vitest) |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm typecheck` | Type-check every package |
| `pnpm lint` | Lint with ESLint |
| `pnpm build` | Build every package |

CI runs `lint`, `typecheck`, and `test` — all three must pass before a PR can
merge, so run them locally first.

## Pull request guidelines

- **Keep PRs small and focused** — one concern, typically no more than ~8–10
  files. Split unrelated changes into separate PRs.
- **All tests, the linter, and the type checker pass** before you open the PR.
- Add tests for any behavior you add or change. Fixes include a regression test.
- Write clear, self-documenting code — good names over comments. Follow SOLID
  and keep it simple.

## Code standards

- Test our own code, not third-party libraries.
- Explicitly import what you use; don't rely on implicit globals.
- No new abstraction until a real need calls for it.

## Licensing of contributions

event-engine is released under the **MIT License**. By submitting a
contribution, you agree that your contribution is licensed under the same MIT
terms as the project (this is the standard "inbound = outbound" model). You
retain copyright to your contribution; you are simply licensing it under MIT so
it can be included and distributed.
