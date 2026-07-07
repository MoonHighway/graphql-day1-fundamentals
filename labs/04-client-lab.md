# Lab 04 · Add Trails to the UI

> 📁 Work in your [`projects/snowtooth-ui/start`](../projects/snowtooth-ui/start) from Lesson 06 (finished board: [`complete`](../projects/snowtooth-ui/complete)) · API running on port 4000, UI on 3000

The lift board works. Your ticket: give trails the same treatment.

## Tasks

1. **Query** - add an `AllTrails` operation (name, difficulty, status, groomed) and render a trails table under the lifts. Handle loading and error states.
2. **Mutation** - add OPEN/CLOSED status buttons per trail using `setTrailStatus`. Make sure your mutation's selection set includes `id` and `status` - then check: does the row update without a refetch? Why?
3. **One component, one query** - refactor so lifts and trails arrive in a **single** query. What changed in the network tab?

## Stretch

- Show a ⭐ next to trails that are `groomed`.
- Add a status filter (ALL / OPEN / CLOSED) that passes a variable into `useQuery`.
- Point `app/providers.jsx` at `https://snowtooth.moonhighway.com` instead of localhost. Everything should still work. Why is that guaranteed?
