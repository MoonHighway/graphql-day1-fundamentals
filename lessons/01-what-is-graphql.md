# 01 · What is GraphQL?

> ⏱️ ~45 min · no setup required

GraphQL is a **query language for your APIs** and a runtime for fulfilling those queries with your existing data. Instead of many REST endpoints that each return a fixed shape, a GraphQL API exposes one endpoint and a **typed schema** - clients ask for exactly the data they need, and get back exactly that.

## The architecture

```
 ┌──────────────┐   one HTTP POST    ┌──────────────────┐
 │   Client(s)  │ ─────────────────▶ │  GraphQL Server  │
 │ web · mobile │ ◀───────────────── │  (schema + resolvers)
 └──────────────┘   JSON, shaped     └───────┬──────────┘
                    like the query           │ resolvers call anything
                                 ┌───────────┼───────────┐
                                 ▼           ▼           ▼
                              database    REST APIs   services
```

Key ideas:

- **The schema is the contract.** It's strongly typed and self-documenting. Teams agree on the schema, then frontend and backend work in parallel.
- **GraphQL is a specification** ([spec.graphql.org](https://spec.graphql.org)), not a library - it works with every language. We'll use the Apollo ecosystem: **Apollo Server** on the backend, **Apollo Client** in React, and later **Apollo Router** to combine many GraphQL services into one supergraph.
- **Resolvers can get data from anywhere** - Postgres, Mongo, REST services (your Django and Node backends), even other GraphQL APIs.

## How GraphQL compares to REST

| | REST | GraphQL |
|---|------|---------|
| Endpoints | many (`/pokemon/25`, `/pokemon/25/abilities`) | one (`/graphql`) |
| Response shape | fixed by the server | declared by the client |
| Overfetching | common - you get every field | you get only selected fields |
| Underfetching | common - n+1 round trips | one query walks relationships |
| Types / docs | bolted on (OpenAPI) | built in (schema + introspection) |
| Versioning | `/v2/...` | evolve the schema, deprecate fields |

REST isn't wrong - and you don't have to rewrite it. A very common adoption path (and the one we'll practice) is to **wrap existing REST services with a GraphQL layer**.

## Where you'll see GraphQL fit your stack

- **Next.js/React frontends** talk to GraphQL through Apollo Client.
- **Django & Node services** stay where they are; GraphQL resolvers or subgraphs call them.
- **Apollo Router** (Day 2) composes multiple GraphQL services into one supergraph so clients see a single graph.

## Discussion

- Where does your team overfetch or underfetch today?
- Which of your current services would be the first candidate for a GraphQL layer?
