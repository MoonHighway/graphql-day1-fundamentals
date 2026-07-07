export default function Home() {
  return (
    <main>
      <h1>🚡 Snowtooth Lift Status</h1>
      <p className="notice">Nothing here yet - this is where we build!</p>
      <p className="hint">
        The plan (Lesson 06): connect Apollo Client, query <code>allLifts</code>{" "}
        with <code>useQuery</code>, render the lift table, then change lift
        statuses with <code>useMutation</code>. Make sure the Snowtooth API is
        running on port 4000 first. The finished app lives in{" "}
        <code>../complete</code>.
      </p>
    </main>
  );
}
