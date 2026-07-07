"use client";

import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";

const ALL_LIFTS = gql`
  query AllLifts {
    allLifts {
      id
      name
      status
      capacity
      night
      elevationGain
    }
  }
`;

const SET_LIFT_STATUS = gql`
  mutation SetLiftStatus($id: ID!, $status: LiftStatus!) {
    setLiftStatus(id: $id, status: $status) {
      lift {
        id
        status
      }
    }
  }
`;

const STATUSES = ["OPEN", "HOLD", "CLOSED"];

function StatusPicker({ lift }) {
  const [setLiftStatus] = useMutation(SET_LIFT_STATUS);
  return (
    <span className="picker">
      {STATUSES.map((status) => (
        <button
          key={status}
          className={lift.status === status ? `on ${status}` : ""}
          onClick={() => setLiftStatus({ variables: { id: lift.id, status } })}
        >
          {status}
        </button>
      ))}
    </span>
  );
}

export default function Home() {
  const { loading, error, data } = useQuery(ALL_LIFTS);

  if (loading) return <p className="notice">Loading lifts…</p>;
  if (error)
    return (
      <p className="notice">
        Error: {error.message}. Is the Snowtooth API running on port 4000?
      </p>
    );

  return (
    <main>
      <h1>🚡 Snowtooth Lift Status</h1>
      <table>
        <thead>
          <tr>
            <th>Lift</th>
            <th>Capacity</th>
            <th>Night skiing</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.allLifts.map((lift) => (
            <tr key={lift.id}>
              <td>{lift.name}</td>
              <td>{lift.capacity}</td>
              <td>{lift.night ? "🌙" : "-"}</td>
              <td>
                <StatusPicker lift={lift} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="hint">
        Click a status to send a mutation. Notice the row updates without a
        refetch: Apollo Client normalizes each lift by <code>id</code> in its
        cache.
      </p>
    </main>
  );
}
