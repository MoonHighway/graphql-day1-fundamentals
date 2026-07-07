// Wrapping a REST API with GraphQL
//
// GraphQL doesn't replace your existing services - resolvers can get
// data from anywhere: a database, another API, a file, memory.
// Here every resolver calls the REST-based PokéAPI (https://pokeapi.co)
// using Node's built-in fetch.

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Pokemon {
    id: ID!
    name: String!
    height: Int!
    weight: Int!
    types: [String!]!
    sprite: String
    "Data from a second REST call, resolved only when you ask for it"
    abilities: [String!]!
  }

  type Query {
    "Look up a single Pokémon by name or number"
    pokemon(nameOrId: String!): Pokemon
    "The total count of Pokémon in the PokéAPI"
    totalPokemon: Int!
  }
`;

const API = "https://pokeapi.co/api/v2";

const resolvers = {
  Query: {
    pokemon: async (parent, { nameOrId }) => {
      const res = await fetch(`${API}/pokemon/${nameOrId.toLowerCase()}`);
      if (!res.ok) return null;
      return res.json();
    },
    totalPokemon: async () => {
      const res = await fetch(`${API}/pokemon?limit=1`);
      const { count } = await res.json();
      return count;
    }
  },
  Pokemon: {
    // The REST response doesn't match our schema exactly -
    // field-level resolvers reshape it.
    types: (parent) => parent.types.map((t) => t.type.name),
    sprite: (parent) => parent.sprites?.front_default,
    abilities: (parent) => parent.abilities.map((a) => a.ability.name)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4001 }
});

console.log(`🔴 Pokémon GraphQL wrapper running at ${url}`);
