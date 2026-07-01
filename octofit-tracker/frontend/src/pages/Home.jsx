import logo from '../assets/octofitapp-small.png';

export default function Home() {
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
          { icon: '🏅', title: 'Leaderboard', desc: 'See who\'s on top with live scores.' },
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
