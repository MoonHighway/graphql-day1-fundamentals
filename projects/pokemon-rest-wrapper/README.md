# Pokémon REST Wrapper 🔴

A tiny Apollo Server 5 project that wraps the REST-based [PokéAPI](https://pokeapi.co) with a GraphQL schema. One GraphQL query can fan out to multiple REST calls - and clients only pay for the fields they ask for.

## Run it

```bash
npm install
npm start   # → http://localhost:4001
```

## Try it

```graphql
query {
  totalPokemon
  pokemon(nameOrId: "snorlax") {
    id
    name
    types
    abilities
    sprite
  }
}
```

## Why this matters

- **Resolvers can call anything** - REST, databases, gRPC, files.
- **Field-level resolvers reshape messy REST payloads** into a clean, typed schema.
- **Lazy by design** - the `abilities` field costs nothing unless a client selects it.

This is the same pattern you'd use to put GraphQL in front of existing Django or Node REST services.
