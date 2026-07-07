# Lab 01 · Snowtooth Query Lab

> 🏔 [https://snowtooth.moonhighway.com](https://snowtooth.moonhighway.com) · browser only

You're working the morning shift at Snowtooth Mountain's operations desk. Use the query language to answer these - **write each one as a query, don't count by hand.**

## Part 1 · Queries

1. How many lifts are currently `OPEN`?
2. How many trails are currently `OPEN`?
3. Write **one query** that returns both numbers, using aliases so the JSON keys are `openLifts` and `openTrails`.
4. List the name and status of every lift, plus the names of the trails you can access from each.
5. Find the lift called `"Jazz Cat"` - what trails does it access, and how difficult are they?

## Part 2 · Operation names & variables

6. Rewrite query #5 as a named operation `LiftLookup` that takes an `$id: ID!` variable.
7. Use the same operation with a different variable value without editing the query text.

## Part 3 · Mutations

8. Storm rolling in: set the `"western-states"` lift to `HOLD`. Return the new status in the payload.
9. Close the `"ducks-revenge"` trail. What does the payload look like?

## Part 4 · Subscriptions

10. In one tab, start a subscription for `liftStatusChange`. In a second tab, change a lift's status. Watch the push arrive.

## Stretch

- Break something on purpose: misspell a field, omit a required argument, pass a bad enum value. Read each error carefully - where did validation catch it?
- Explore the schema tab. How did the docs get there?
