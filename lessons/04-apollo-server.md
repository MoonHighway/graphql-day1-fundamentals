# 04 · Apollo Server Basics & Mocking

> ⏱️ ~45 min · project: [`projects/snowtooth-api`](../projects/snowtooth-api)

Time to serve a schema. We're using **Apollo Server 5** — the current major version (Node 20+, `graphql` ≥ 16.11).

## The smallest possible server

```js
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Query {
    liftCount: Int!
  }
`;

const resolvers = {
  Query: {
    liftCount: () => 12
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`Server running at ${url}`);
```

Two ingredients, always:

1. **typeDefs** — the schema (inline string or a `.graphql` file read from disk)
2. **resolvers** — functions matching the schema, one per field you need to compute

`startStandaloneServer` is the zero-config way to run (in AS5 it's built directly on Node's HTTP server). When you need middleware, auth, or an existing Express app, you swap to `expressMiddleware` from `@as-integrations/express5` — same `ApolloServer` instance.

> 🕰️ **If you've seen older tutorials:** `apollo-server` v2/v3 (`server.listen()`) is end-of-life. The modern package is `@apollo/server`. Watch for this when reading old blog posts.

## Apollo Sandbox

Open [http://localhost:4000](http://localhost:4000) and Apollo Server serves **Apollo Sandbox** — schema reference, docs from your descriptions, and a query IDE. This is introspection at work.

## Schema-first development with mocks

You don't need resolvers or data to unblock a frontend team — serve the schema with mocks:

```js
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs }),
    mocks: {
      DateTime: () => new Date().toISOString(),
      Lift: () => ({ name: "Panorama Express" })
    }
  })
});
```

Run it:

```bash
cd projects/snowtooth-api
npm install
npm run mock
```

Every query in the schema now returns plausible fake data. This is a big workflow unlock: agree on the schema, mock it, and build the client and the real resolvers **in parallel**.

➡️ Next: real resolvers, context, and data sources in [Lesson 05](./05-resolvers-and-data.md).
