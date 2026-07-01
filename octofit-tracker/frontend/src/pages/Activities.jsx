import { useEffect, useState } from 'react';
import BASE_URL from '../config';

const TYPE_BADGE = {
  Running: 'bg-success',
  Cycling: 'bg-info text-dark',
  Swimming: 'bg-primary',
  'Strength Training': 'bg-warning text-dark',
  Walking: 'bg-secondary',
};

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/activities/`)
      .then((r) => r.json())
      .then((data) => { setActivities(data); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" /></div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div>
      <h2 className="mb-4">🏃 Activities</h2>
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Duration</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a) => (
            <tr key={a._id}>
              <td>{a.user?.username ?? '—'}</td>
              <td>
                <span className={`badge ${TYPE_BADGE[a.type] ?? 'bg-dark'}`}>
                  {a.type}
                </span>
              </td>
              <td>{a.duration} min</td>
              <td>{new Date(a.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
