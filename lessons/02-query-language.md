# 02 · The GraphQL Query Language

> ⏱️ ~60 min · browser only - [Snowtooth Playground](https://snowtooth.moonhighway.com) · [Pet Library](https://pet-library.moonhighway.com)

Everything in this lesson happens in the browser with Apollo Explorer. No local setup.

## Sending queries

```graphql
query {
  allLifts {
    name
    status
  }
}
```

The response is JSON shaped exactly like your selection set. Add and remove fields and watch the response change.

## Arguments

Fields can accept arguments, like functions:

```graphql
query {
  liftCount(status: OPEN)
  findLiftById(id: "panorama") {
    name
    status
  }
}
```

## Aliases

Field names become JSON keys - rename them, or query the same field twice:

```graphql
query {
  open: liftCount(status: OPEN)
  closed: liftCount(status: CLOSED)
  panorama: findLiftById(id: "panorama") {
    name
  }
}
```

## Operation names & variables

Anonymous queries are fine in a playground, but real apps name their operations and pass dynamic values as **variables**:

```graphql
query LiftStatusCheck($liftId: ID!) {
  findLiftById(id: $liftId) {
    name
    status
    trailAccess {
      name
      difficulty
    }
  }
}
```

```json
{ "liftId": "astra-express" }
```

Nested selections (`trailAccess { ... }`) are where GraphQL shines: one request walks the relationship graph - no second round trip.

## Mutations

Mutations change data. Same syntax, different root type:

```graphql
mutation CloseLift {
  setLiftStatus(id: "panorama", status: CLOSED) {
    name
    status
  }
}
```

You select fields on the result too - a mutation is also a query for what changed.

## Subscriptions

Subscriptions push real-time updates over a WebSocket:

```graphql
subscription {
  liftStatusChange {
    name
    status
  }
}
```

Run this in one Snowtooth tab, send a `setLiftStatus` mutation in another, and watch the data arrive.

## Reading GraphQL errors

Try misspelling a field. GraphQL validates every operation against the schema **before** running it - you get a specific error, not a 500. This is your first taste of why the schema-as-contract matters.

➡️ **Lab:** [Lab 01 · Snowtooth Query Lab](../labs/01-query-lab.md)
