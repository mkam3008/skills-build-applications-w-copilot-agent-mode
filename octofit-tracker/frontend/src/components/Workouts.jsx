import { useEffect, useState } from 'react';
import BASE_URL from '../config';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/workouts/`)
      .then((r) => r.json())
      // Support both array and paginated { results: [] } responses
      .then((data) => { setWorkouts(Array.isArray(data) ? data : data.results ?? []); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" /></div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div>
      <h2 className="mb-4">💪 Workouts</h2>
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {workouts.map((w) => (
          <div className="col" key={w._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-header fw-bold bg-success text-white">{w.name}</div>
              <div className="card-body">
                {w.description && (
                  <p className="card-text text-muted mb-2">{w.description}</p>
                )}
                <ul className="list-unstyled mb-0">
                  {(w.exercises ?? []).map((ex, i) => (
                    <li key={i}>✅ {ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
