# Day 1 · GraphQL Fundamentals, APIs & Clients

Welcome! We're really glad you're here. This repo holds everything for **Day 1**: lessons, labs, and runnable projects. Day 2 (federation, security & production readiness) lives in its own repo.

## Instructor Info

- **Eve Porcello**: [Twitter](https://twitter.com/eveporcello) | [Email](mailto:eve@moonhighway.com)
- **Moon Highway Training**: [Website](https://www.moonhighway.com) | [Mailing List](http://bit.ly/moonhighway) | [Articles](https://www.moonhighway.com/articles)

## 🖥️ Slides

- [Course intro slides](https://slides.com/moonhighway/graphql-intro)

## ⚙️ Setup

The morning is 100% browser-based - you need nothing installed. For the afternoon:

1. **Node 20+** (`node --version`) - Apollo Server 5 requires it
2. **VS Code or IntelliJ** with a GraphQL extension (nice to have)
3. Clone this repo. Each project folder in `projects/` installs independently with `npm install` (for `snowtooth-api` and `snowtooth-ui`, run it inside `start/` or `complete/`).

## 🗺️ The day

### Morning · The query language & schemas (browser only)

| # | Lesson | Lab | Playground |
|---|--------|-----|------------|
| 01 | [What is GraphQL?](./lessons/01-what-is-graphql.md) | - | - |
| 02 | [The GraphQL Query Language](./lessons/02-query-language.md) | [Query Lab](./labs/01-query-lab.md) | [Snowtooth](https://snowtooth.moonhighway.com) · [Pet Library](https://pet-library.moonhighway.com) |
| 03 | [Effective Schema Design](./lessons/03-schema-design.md) | [Schema Lab](./labs/02-schema-lab.md) | [Apollo Sandbox](https://studio.apollographql.com/sandbox) |

### Afternoon · Building APIs & clients (local)

| # | Lesson | Lab | Project |
|---|--------|-----|---------|
| 04 | [Apollo Server Basics & Mocking](./lessons/04-apollo-server.md) | - | [`snowtooth-api`](./projects/snowtooth-api) |
| 05 | [Resolvers, Context & Data Sources](./lessons/05-resolvers-and-data.md) | [API Lab](./labs/03-api-lab.md) | [`snowtooth-api`](./projects/snowtooth-api) · [`pokemon-rest-wrapper`](./projects/pokemon-rest-wrapper) |
| 06 | [GraphQL Clients & Apollo Client](./lessons/06-apollo-client.md) | [Client Lab](./labs/04-client-lab.md) | [`snowtooth-ui`](./projects/snowtooth-ui) |

## 📦 The projects

| Project | What it is | Run |
|---------|------------|-----|
| [`projects/snowtooth-api`](./projects/snowtooth-api) | Ski resort GraphQL API - **Apollo Server 5**. `start/` = mocked server, `complete/` = real resolvers | `npm start` (in `start/` or `complete/`) |
| [`projects/pet-library-schema`](./projects/pet-library-schema) | Schema-design lab (SDL only) + complete solution | no server needed |
| [`projects/pokemon-rest-wrapper`](./projects/pokemon-rest-wrapper) | GraphQL layer over the REST PokéAPI | `npm start` |
| [`projects/snowtooth-ui`](./projects/snowtooth-ui) | **Next.js** + React 19 + **Apollo Client 4** lift-status board. `start/` = placeholder, `complete/` = finished app | `npm run dev` (in `start/` or `complete/`) |

## 🔗 Reference links

### Query language & schemas

- [GitHub GraphQL Explorer](https://docs.github.com/en/graphql/overview/explorer) - a huge real-world graph to explore
- [GraphQL Spec](https://spec.graphql.org)
- [Schema Cheatsheet](https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png)
- [Relay Connection Spec](https://relay.dev/graphql/connections.htm) (cursor pagination)

### Apollo docs

- [Apollo Server](https://www.apollographql.com/docs/apollo-server) (we use v5)
- [Migrating from older Apollo Server versions](https://www.apollographql.com/docs/apollo-server/migration) - useful when reading old tutorials
- [Mocking](https://www.apollographql.com/docs/apollo-server/testing/mocking)
- [Fetching from REST](https://www.apollographql.com/docs/apollo-server/data/fetching-rest)
- [Apollo Client (React)](https://www.apollographql.com/docs/react) (we use v4)
- [Apollo Client + Next.js integration](https://github.com/apollographql/apollo-client-integrations)

### Versions used in this course

| Package | Version | Notes |
|---------|---------|-------|
| `@apollo/server` | ^5 | Node 20+, `graphql` ≥ 16.11 |
| `@apollo/client` | ^4 | React hooks from `@apollo/client/react` |
| `graphql` | ^16.11 | v17 is still pre-release - don't use it yet |

See you tomorrow for **Day 2: Federation, Security & Production Readiness**! 🚀
