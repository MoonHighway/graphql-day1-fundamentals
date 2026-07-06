// Schema-first development: serve realistic fake data from nothing
// but the schema. Frontend teams can start building immediately.
//
// Since Apollo Server 4, mocking lives in @graphql-tools rather than
// being built in: https://www.apollographql.com/docs/apollo-server/testing/mocking

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { readFileSync } from "node:fs";

const typeDefs = readFileSync("./typeDefs.graphql", "utf-8");

// Optional: take control of specific types. Anything you don't
// mention gets a sensible default (Hello world, random Int, etc.)
const mocks = {
  DateTime: () => new Date().toISOString(),
  Lift: () => ({
    name: "Panorama Express",
    capacity: 6,
    elevationGain: 1200
  }),
  Trail: () => ({
    name: "Ducks Revenge"
  })
};

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs }),
    mocks
  })
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 }
});

console.log(`🃏 Mocked Snowtooth API running at ${url}`);
