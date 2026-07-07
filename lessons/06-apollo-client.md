# 06 · GraphQL Clients & Apollo Client

> ⏱️ ~75 min · project: [`projects/snowtooth-ui/start`](../projects/snowtooth-ui/start)

## GraphQL is just HTTP

Before any client library: a GraphQL request is a POST with a JSON body. Keep your Snowtooth API running and try:

```bash
curl -X POST \
     -H "Content-Type: application/json" \
     --data '{ "query": "{ allLifts { name status } }" }' \
     http://localhost:4000
```

Or with `fetch` - this works anywhere JavaScript runs:

```js
const res = await fetch("http://localhost:4000", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `query ($status: LiftStatus) { allLifts(status: $status) { name } }`,
    variables: { status: "OPEN" }
  })
});
const { data, errors } = await res.json();
```

If that's all you need, [`graphql-request`](https://github.com/jasonkuhrt/graphql-request) is a fine minimal client. **Apollo Client** earns its place with what comes next: a normalized cache, loading/error state, and React integration.

## Apollo Client 4 setup

```bash
npm install @apollo/client graphql rxjs
```

```jsx
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000" }),
  cache: new InMemoryCache()
});

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
```

> 📦 **Apollo Client 4 note:** React hooks now come from `@apollo/client/react`; the root `@apollo/client` entry is framework-agnostic core. Older (v3) tutorials import everything from `@apollo/client`.

## useQuery

```jsx
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const ALL_LIFTS = gql`
  query AllLifts {
    allLifts { id name status }
  }
`;

function Lifts() {
  const { loading, error, data } = useQuery(ALL_LIFTS);
  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;
  return data.allLifts.map((lift) => <div key={lift.id}>{lift.name}</div>);
}
```

The component re-renders through `loading → data`. Behind the scenes the response is **normalized** into the cache by `__typename` + `id`.

## useMutation

```jsx
const [setLiftStatus] = useMutation(SET_LIFT_STATUS);

<button onClick={() => setLiftStatus({ variables: { id, status: "CLOSED" } })}>
  Close
</button>
```

Because the mutation returns the lift's `id` and new `status`, Apollo updates the cached entity, and **every component showing that lift re-renders automatically**. No refetch, no manual state sync. That's the payoff of the normalized cache.

## Next.js notes

Everything above works in any React app. In Next.js App Router, use [`@apollo/client-integration-nextjs`](https://github.com/apollographql/apollo-client-integrations) to share one client across Server and Client Components; the hooks API is the same. For simple server-side reads, you can also just `fetch` the GraphQL endpoint in a Server Component.

## Run the app

We build the whole board in `snowtooth-ui/start` (a Next.js placeholder with the styles ready); the finished app is in `snowtooth-ui/complete`:

```bash
# terminal 1 - the API (use complete, or your own start from Lab 03)
cd projects/snowtooth-api/complete && npm start

# terminal 2 - the UI we build together
cd projects/snowtooth-ui/start && npm install && npm run dev
```

➡️ **Lab:** [Lab 04 · Add Trails to the UI](../labs/04-client-lab.md)
