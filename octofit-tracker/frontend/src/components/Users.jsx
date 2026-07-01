import { useEffect, useState } from 'react';
import BASE_URL from '../config';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/users/`)
      .then((r) => r.json())
      // Support both array and paginated { results: [] } responses
      .then((data) => { setUsers(Array.isArray(data) ? data : data.results ?? []); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" /></div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div>
      <h2 className="mb-4">👤 Users</h2>
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {users.map((u) => (
          <div className="col" key={u._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{u.username}</h5>
                <p className="card-text text-muted">{u.email}</p>
                <small className="text-muted">
                  Joined: {new Date(u.created_at).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
