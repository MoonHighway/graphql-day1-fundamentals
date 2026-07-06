# Snowtooth UI 🎿

A lift-status board for Snowtooth Mountain built with **React 19 + Apollo Client 4** (Vite).

## Run it

1. Start the API first (in `../snowtooth-api`):

   ```bash
   npm install && npm start   # → http://localhost:4000
   ```

2. Then start this app:

   ```bash
   npm install
   npm run dev                # → http://localhost:5173
   ```

## What to look at

- **`src/main.jsx`** — creating the `ApolloClient` (link + cache) and wrapping the app in `ApolloProvider`. Note the Apollo Client 4 import split: core from `@apollo/client`, React bits from `@apollo/client/react`.
- **`src/App.jsx`** — `useQuery` for the lift list, `useMutation` for status changes. The mutation response includes `id` and `status`, so the normalized cache updates the row automatically — no refetch.
