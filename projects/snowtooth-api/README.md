# Snowtooth API ⛷️

A GraphQL API for Snowtooth Mountain, a fake ski resort — built with **Apollo Server 5**.

## Run it

```bash
npm install
npm start        # real resolvers + JSON data → http://localhost:4000
```

Other scripts:

```bash
npm run dev      # restarts automatically when you save (node --watch)
npm run mock     # serves auto-mocked data from the schema only
```

Open [http://localhost:4000](http://localhost:4000) in a browser to explore the API with Apollo Sandbox.

## Files

| File | What it is |
|------|------------|
| `typeDefs.graphql` | The schema — the contract for this API |
| `index.js` | Apollo Server + resolvers + context |
| `mocked.js` | The same schema served with mock data (no resolvers!) |
| `data/lifts.json` · `data/trails.json` | Our "database" |

## Try these operations

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
