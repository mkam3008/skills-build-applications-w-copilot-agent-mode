import { useEffect, useState } from 'react';
import BASE_URL from '../config';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/leaderboard/`)
      .then((r) => r.json())
      .then((data) => { setEntries(data); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" /></div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div>
      <h2 className="mb-4">🏅 Leaderboard</h2>
      <div className="list-group">
        {entries.map((e, i) => (
          <div
            key={e._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center gap-3">
              <span className="fs-4">{medals[i] ?? `#${i + 1}`}</span>
              <span className="fw-semibold">{e.user?.username ?? '—'}</span>
            </div>
            <span className="badge bg-primary rounded-pill fs-6">{e.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}
