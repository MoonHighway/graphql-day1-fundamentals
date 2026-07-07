# 05 · Resolvers, Context & Data Sources

> ⏱️ ~75 min · projects: [`projects/snowtooth-api`](../projects/snowtooth-api) · [`projects/pokemon-rest-wrapper`](../projects/pokemon-rest-wrapper)

We pick up where Lesson 04 left off: `start/` is serving mocks, and now we replace them with real resolvers backed by the JSON in `start/data`. Keep working in `start/`; the finished server lives in `complete/` if you want to peek or compare:

```bash
cd projects/snowtooth-api/start    # build here
npm install
npm run dev                        # restarts on save
```

## Anatomy of a resolver

Every resolver receives the same four arguments:

```js
fieldName: (parent, args, context, info) => { ... }
```

| Argument | What it is |
|----------|------------|
| `parent` | the object the parent resolver returned |
| `args` | the field's arguments (`{ status: "OPEN" }`) |
| `context` | shared per-request state: data sources, the current user |
| `info` | query AST details (rarely needed) |

## Handling arguments

```js
Query: {
  allLifts: (parent, { status }, { lifts }) =>
    !status ? lifts : lifts.filter((lift) => lift.status === status)
}
```

## Trivial resolvers & field-level resolvers

If a field isn't in your resolver map, GraphQL just reads the property off `parent` (a *trivial resolver*). When the data shape doesn't match the schema, add a field resolver - our JSON stores `"difficulty": "expert"` but the schema exposes an enum:

```js
Trail: {
  difficulty: (parent) => parent.difficulty.toUpperCase(),
  accessedByLifts: (parent, args, { lifts }) =>
    parent.lift.map((id) => lifts.find((l) => id === l.id))
}
```

This is also how types connect: `Lift.trailAccess` and `Trail.accessedByLifts` each resolve the relationship lazily - only when queried.

## Context: where your data sources live

`context` is built once per request and passed to every resolver. It's the right home for database handles, service clients, and the authenticated user:

```js
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({
    lifts,
    trails
    // currentUser: await authenticate(req.headers.authorization)
  }),
  listen: { port: 4000 }
});
```

On Day 2 we'll use exactly this hook for **authorization**.

## Building mutations

Mutations are just resolvers on the `Mutation` type - take args, change data, return the payload:

```js
Mutation: {
  setLiftStatus: (parent, { id, status }, { lifts }) => {
    const updatedLift = lifts.find((lift) => id === lift.id);
    updatedLift.status = status;
    return { lift: updatedLift, changed: new Date() };
  }
}
```

## Custom scalar implementation

The schema said `scalar DateTime`; the server defines what that means:

```js
import { GraphQLScalarType } from "graphql";

DateTime: new GraphQLScalarType({
  name: "DateTime",
  parseValue: (value) => new Date(value),        // from variables
  serialize: (value) => new Date(value).toISOString(), // to the response
  parseLiteral: (ast) => new Date(ast.value)     // from inline query text
})
```

## Wrapping REST APIs

Resolvers can fetch from anywhere - including your existing REST services:

```js
Query: {
  pokemon: async (parent, { nameOrId }) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    return res.json();
  }
},
Pokemon: {
  types: (parent) => parent.types.map((t) => t.type.name)
}
```

Run the full example:

```bash
cd projects/pokemon-rest-wrapper
npm install && npm start   # → http://localhost:4001
```

This is the classic incremental-adoption pattern: put a typed graph in front of REST services without rewriting them. (In production you'd add per-request caching/batching - look at [DataLoader](https://github.com/graphql/dataloader) and [`@apollo/datasource-rest`](https://www.apollographql.com/docs/apollo-server/data/fetching-rest).)

➡️ **Lab:** [Lab 03 · Extend the Snowtooth API](../labs/03-api-lab.md)
