import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLScalarType } from "graphql";
import { readFileSync } from "node:fs";

const typeDefs = readFileSync("./typeDefs.graphql", "utf-8");

const lifts = JSON.parse(readFileSync("./data/lifts.json", "utf-8"));
const trails = JSON.parse(readFileSync("./data/trails.json", "utf-8"));

const resolvers = {
  Query: {
    allLifts: (parent, { status }, { lifts }) =>
      !status ? lifts : lifts.filter((lift) => lift.status === status),
    findLiftById: (parent, { id }, { lifts }) =>
      lifts.find((lift) => id === lift.id),
    liftCount: (parent, { status }, { lifts }) =>
      !status
        ? lifts.length
        : lifts.filter((lift) => lift.status === status).length,
    allTrails: (parent, { status }, { trails }) =>
      !status ? trails : trails.filter((trail) => trail.status === status),
    findTrailByName: (parent, { name }, { trails }) =>
      trails.find((trail) => name === trail.name),
    trailCount: (parent, { status }, { trails }) =>
      !status
        ? trails.length
        : trails.filter((trail) => trail.status === status).length
  },
  Mutation: {
    setLiftStatus: (parent, { id, status }, { lifts }) => {
      const updatedLift = lifts.find((lift) => id === lift.id);
      updatedLift.status = status;
      return {
        lift: updatedLift,
        changed: new Date()
      };
    },
    setTrailStatus: (parent, { id, status }, { trails }) => {
      const updatedTrail = trails.find((trail) => id === trail.id);
      updatedTrail.status = status;
      return updatedTrail;
    }
  },
  Lift: {
    trailAccess: (parent, args, { trails }) =>
      parent.trails.map((id) => trails.find((t) => id === t.id))
  },
  Trail: {
    accessedByLifts: (parent, args, { lifts }) =>
      parent.lift.map((id) => lifts.find((l) => id === l.id)),
    // The JSON data stores difficulty in lowercase ("expert"), but the
    // schema exposes a Difficulty enum (EXPERT) - resolvers translate.
    difficulty: (parent) => parent.difficulty.toUpperCase()
  },
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid date time value.",
    parseValue: (value) => new Date(value),
    serialize: (value) => new Date(value).toISOString(),
    parseLiteral: (ast) => new Date(ast.value)
  })
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  // Anything returned here is available to every resolver
  // as the third argument: (parent, args, context)
  context: async () => ({ lifts, trails }),
  listen: { port: process.env.PORT || 4000 }
});

console.log(`🚡 Snowtooth API running at ${url}`);
