# Lab 03 · Extend the Snowtooth API

> 📁 [`projects/snowtooth-api`](../projects/snowtooth-api) · have `npm run dev` running (auto-restarts on save)

Ship three tickets against the Snowtooth API. Each one touches the schema **and** the resolvers — that's the rhythm of real GraphQL work.

## Ticket 1 · Trail counts by difficulty

Ops wants a dashboard number: add an optional `difficulty: Difficulty` argument to `trailCount` so this works:

```graphql
query { trailCount(difficulty: EXPERT) }
```

*Watch out: the JSON data stores difficulty in lowercase.*

## Ticket 2 · Search

Add a `search(term: String!)` query that returns lifts **and** trails whose names contain the term.

```graphql
union SearchResult = Lift | Trail
```

You'll need a `__resolveType` resolver so GraphQL knows which type each result is:

```js
SearchResult: {
  __resolveType: (obj) => (obj.capacity ? "Lift" : "Trail")
}
```

Test it with inline fragments (`... on Lift { capacity }`).

## Ticket 3 · Night skiing report

Add a `nightSkiing` query returning every open lift that runs at night, each with only its open, night-accessible trails. Decide: is this a new type, or a filtered view of existing ones?

## Stretch · Wrap a REST API

Add a `weather` field to `Query` that calls a real REST endpoint, e.g. Open-Meteo (no key required):

```
https://api.open-meteo.com/v1/forecast?latitude=39.6&longitude=-120.2&current_weather=true
```

Design a small `Weather` type — expose only what skiers care about. (See [`projects/pokemon-rest-wrapper`](../projects/pokemon-rest-wrapper) for the pattern.)
