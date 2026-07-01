import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import logo from './assets/octofitapp-small.png';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="text-center py-5">
      <img src={logo} alt="OctoFit Tracker" className="mb-4" style={{ height: 120 }} />
      <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
      <p className="lead text-muted">
        Fitness tracking for Mergington High School — log activities, compete with
        teammates, and crush your goals.
      </p>
      <div className="row row-cols-1 row-cols-md-3 g-3 mt-4 text-start">
        {[
          { icon: '👤', title: 'User Profiles', desc: 'Track individual student progress and history.' },
          { icon: '🏃', title: 'Activity Logging', desc: 'Log running, cycling, swimming, and more.' },
          { icon: '🏆', title: 'Teams', desc: 'Form teams and compete together.' },
          { icon: '🏅', title: 'Leaderboard', desc: "See who's on top with live scores." },
          { icon: '💪', title: 'Workouts', desc: 'Browse personalized workout suggestions.' },
        ].map(({ icon, title, desc }) => (
          <div className="col" key={title}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{icon} {title}</h5>
                <p className="card-text text-muted">{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={logo} alt="OctoFit" height="32" />
          <span>OctoFit Tracker</span>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">
            {NAV_LINKS.map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-bold' : '')}
                  to={to}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
