# Pet Library Schema Design Lab 🐈🐕🐇

In this lab you'll design the schema for the **Pet Library** — a library where you check out pets instead of books — using nothing but the GraphQL Schema Definition Language. Schema first: no server, no resolvers, just the contract.

## Instructions

1. Open `schema.graphql` and build out the schema following the requirements below.
2. Validate as you go: paste your schema into [Apollo Sandbox](https://studio.apollographql.com/sandbox) or use your editor's GraphQL extension.
3. When you're done (or stuck), compare with [`complete/schema.graphql`](./complete/schema.graphql).

## Requirements

The Pet Library needs to support the following. Design the types, queries, and mutations you'd need:

1. **Pets** — every pet has an id, name, weight, photo, and checkout status (`AVAILABLE` or `CHECKEDOUT`). There are cats, dogs, rabbits, and stingrays, and each species has some fields of its own (e.g. a cat's `sleepAmount`, a dog's `good`). *Hint: is this an `interface`, a `union`, or an `enum`? Maybe more than one?*
2. **Customers** — customers create accounts, log in, and check pets in and out. A customer can see which pets they currently have and their full checkout history.
3. **Queries** — totals and lists for pets (all / available / checked out), a lookup by id, and a `me` query for the logged-in customer.
4. **Mutations** — `createAccount`, `logIn`, `checkOut`, `checkIn`. Think about what each one should return (payload types!).
5. **Nullability** — decide field by field: what can never be null?
6. **Documentation** — add descriptions (`"""docs"""`) to at least your main types. Your schema is your API's documentation.

## Stretch goals

- Add a custom `Date` scalar and use it for checkout dates.
- Add a `petReturned` subscription.
- Add filtering arguments (e.g. `allPets(category: PetCategory, status: PetStatus)`).
- Add pagination to `allPets` (e.g. `limit`/`offset` — or research cursor-based connections).
