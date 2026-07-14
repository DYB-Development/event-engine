# event-engine

Composable TypeScript packages for **event capture, data management, and stat
display** — a faithful TypeScript port of the Ruby `event_engine` family.

> Don't collect "stats" — collect **events** (immutable facts, values frozen at
> the moment they happened), then derive every stat from them.

## Packages

Each package owns one job and depends only on the ones below it, so you adopt
them incrementally and never pull in machinery you don't use.

| Package | Stage | Responsibility |
|---|---|---|
| `@eventengine/core` | foundation | define events, the emit/dispatch spine, the registries, notifications |
| `@eventengine/ports` | substrate | storage / transaction / job-queue ports + reference adapters |
| `@eventengine/store` | data | the append-only event record, projections, replay |
| `@eventengine/delivery` | capture | reliable delivery: level routing, the outbox, the publisher, the dashboard |
| `@eventengine/telemetry` | capture | the high-volume anonymous sink |
| `@eventengine/metrics` | data | aggregation: measures, rollups, sketches, the expression DSL |
| `@eventengine/stats` | display | the self-describing, source-agnostic stat contract |
| `@eventengine/dashboards` | display | headless dashboards-as-data |

## Documentation

Full docs live in [`docs/`](./docs/README.md):

- **[Architecture](./docs/architecture.md)** — the `define → emit → dispatch → handlers`
  spine, the level ladder, the Event envelope, and how the packages compose.
- **[Getting started](./docs/getting-started.md)** — wire an `EventEngine`,
  define an event, emit it, and watch the store record it and delivery route it.

## Status

This is a reference implementation on in-memory adapters: the architecture,
contracts, and behavior are real and TDD-tested, but production adapters
(Postgres, Kafka, a real job queue) are pending. See each package doc for what's
real vs. reference.

## Contributing

Contributions are welcome. Changes land through pull requests that a maintainer
reviews and merges; every PR must pass CI (`lint`, `typecheck`, `test`) first.
For anything beyond a trivial fix, open an issue to agree on the approach before
writing code. See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for setup, the TDD
workflow, and PR guidelines.

## License

[MIT](./LICENSE) © DYB, L.L.C. Contributions are accepted under the same MIT
terms ("inbound = outbound").
