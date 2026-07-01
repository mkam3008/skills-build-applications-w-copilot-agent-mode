import { NavLink } from 'react-router-dom';
import logo from '../assets/octofitapp-small.png';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
        <img src={logo} alt="OctoFit" height="32" />
        <span>OctoFit Tracker</span>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav ms-auto">
          {[
            { to: '/users', label: 'Users' },
            { to: '/teams', label: 'Teams' },
            { to: '/activities', label: 'Activities' },
            { to: '/leaderboard', label: 'Leaderboard' },
            { to: '/workouts', label: 'Workouts' },
          ].map(({ to, label }) => (
            <li className="nav-item" key={to}>
              <NavLink
                className={({ isActive }) =>
                  'nav-link' + (isActive ? ' active fw-bold' : '')
                }
                to={to}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
