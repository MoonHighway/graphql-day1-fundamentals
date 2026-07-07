# Snowtooth UI 🎿

A lift-status board for Snowtooth Mountain built with **Next.js + React 19 + Apollo Client 4**.

## Run it

1. Start the API first (in `../snowtooth-api`):

   ```bash
   npm install && npm start   # → http://localhost:4000
   ```

2. Then start this app:

   ```bash
   npm install
   npm run dev                # → http://localhost:3000
   ```

## What to look at

- **`app/providers.jsx`** is a client component (`"use client"`) that creates the `ApolloClient` (link + cache) and wraps the app in `ApolloProvider`. Note the Apollo Client 4 import split: core from `@apollo/client`, React bits from `@apollo/client/react`.
- **`app/layout.jsx`** is the root layout. It stays a server component and pulls in the providers.
- **`app/page.jsx`** uses `useQuery` for the lift list and `useMutation` for status changes, so it is a client component too. The mutation response includes `id` and `status`, so the normalized cache updates the row automatically with no refetch.
