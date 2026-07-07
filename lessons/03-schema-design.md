# 03 · Effective Schema Design

> ⏱️ ~60 min · SDL only - [Apollo Sandbox](https://studio.apollographql.com/sandbox) or your editor

The **Schema Definition Language (SDL)** is how we write the contract. Good schemas describe your *domain*, not your database tables.

## Creating types

```graphql
type Lift {
  id: ID!
  name: String!
  status: LiftStatus!
  capacity: Int!
  night: Boolean!
  elevationGain: Int!
}

enum LiftStatus {
  OPEN
  HOLD
  CLOSED
}
```

Built-in scalars: `ID`, `String`, `Int`, `Float`, `Boolean`. Enums restrict a field to a fixed set of values.

## Nullable vs. non-nullable

Every field is nullable by default; `!` makes it non-null.

- `name: String!` - the server **guarantees** a value. If a resolver returns null here, the error propagates up to the nearest nullable parent.
- Rule of thumb: be strict (`!`) where data truly always exists; stay nullable where a partial failure shouldn't take down the whole response.
- **Non-null is a promise you can never take back** without a breaking change - nullable→non-null is safe, the reverse is not.

## Connecting types

Relationships are just fields that return other object types:

```graphql
type Lift {
  # ...
  trailAccess: [Trail!]!
}

type Trail {
  # ...
  accessedByLifts: [Lift!]!
}
```

`[Trail!]!` reads: the list itself is always there (maybe empty), and no entry in it is null.

## Interfaces & unions

When types share fields, use an **interface** (Pet Library: `Cat`, `Dog`, `Rabbit`, `Stingray` all implement `Pet`). When they don't, use a **union** (`union SearchResult = Lift | Trail`). Query them with inline fragments:

```graphql
query {
  allPets {
    name
    ... on Cat { sleepAmount }
    ... on Dog { good }
  }
}
```

## Filters and pagination

Arguments make fields flexible:

```graphql
type Query {
  allLifts(status: LiftStatus): [Lift!]!
  allPets(category: PetCategory, status: PetStatus, limit: Int = 10, offset: Int = 0): [Pet!]!
}
```

For large or fast-moving lists, prefer cursor-based pagination (see the [Relay connection spec](https://relay.dev/graphql/connections.htm)) - it's the pattern most public graphs (GitHub!) use.

## Custom scalars

When the built-ins aren't enough, declare your own and implement its serialization on the server (Lesson 05):

```graphql
scalar DateTime
```

## Mutations & payload types

Design mutations around **verbs in your domain**, and return payload types that give clients what changed:

```graphql
type SetLiftStatusPayload {
  lift: Lift
  changed: DateTime
}

type Mutation {
  setLiftStatus(id: ID!, status: LiftStatus!): SetLiftStatusPayload!
}
```

## Schema documentation

Descriptions are part of the schema and show up in every GraphQL tool:

```graphql
"""
A chairlift or gondola that carries skiers up the mountain.
"""
type Lift {
  "A unique identifier, also usable with `findLiftById`."
  id: ID!
}
```

Browse [`projects/pet-library-schema/complete/schema.graphql`](../projects/pet-library-schema/complete/schema.graphql) to see a fully documented schema with interfaces, unions, inputs, and payloads.

➡️ **Lab:** [Lab 02 · Design the Pet Library Schema](../labs/02-schema-lab.md)
