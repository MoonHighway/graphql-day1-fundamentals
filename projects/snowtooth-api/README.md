# Snowtooth API ⛷️

A GraphQL API for Snowtooth Mountain, a fake ski resort - built with **Apollo Server 5**.

Two folders, one schema:

| Folder | What it is |
|--------|------------|
| [`start/`](./start) | Where we begin: the schema served with **mock data** (no resolvers yet). We build the real resolvers here in Lessons 04-05. |
| [`complete/`](./complete) | The finished API: real resolvers, context, custom scalar, JSON data. |

## Run it

Each folder installs and runs independently:

```bash
cd start          # or: cd complete
npm install
npm start         # → http://localhost:4000
npm run dev       # same, but restarts when you save (node --watch)
```

Open [http://localhost:4000](http://localhost:4000) in a browser to explore the API with Apollo Sandbox.

## Files

| File | What it is |
|------|------------|
| `typeDefs.graphql` | The schema - the contract for this API (identical in both folders) |
| `start/index.js` | The schema served with mock data (no resolvers!) |
| `complete/index.js` | Apollo Server + resolvers + context |
| `data/lifts.json` · `data/trails.json` | Our "database" |

## Try these operations

Against `complete/` (or your own `start/` once the resolvers are in):

```graphql
query liftsAndTrails {
  liftCount(status: OPEN)
  allLifts {
    name
    status
    trailAccess {
      name
      difficulty
    }
  }
}
```

```graphql
mutation closeLift {
  setLiftStatus(id: "astra-express", status: HOLD) {
    lift {
      name
      status
    }
    changed
  }
}
```
