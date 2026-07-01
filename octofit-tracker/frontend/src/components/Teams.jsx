import { useEffect, useState } from 'react';
import BASE_URL from '../config';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/teams/`)
      .then((r) => r.json())
      // Support both array and paginated { results: [] } responses
      .then((data) => { setTeams(Array.isArray(data) ? data : data.results ?? []); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" /></div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div>
      <h2 className="mb-4">🏆 Teams</h2>
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {teams.map((t) => (
          <div className="col" key={t._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-primary text-white fw-bold">{t.name}</div>
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Members</h6>
                <ul className="list-group list-group-flush">
                  {(t.members ?? []).map((m) => (
                    <li className="list-group-item px-0" key={m._id ?? m}>
                      {m.username ?? m}
                    </li>
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
