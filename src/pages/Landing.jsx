import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing-wrapper">
      <header className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-logo">
            <span className="logo-main">CampusConnect</span>
            <span className="logo-sub">College Portal</span>
          </div>
          <div className="landing-nav-actions">
            <Link to="/events" className="nav-btn-link">Events</Link>
            <Link to="/clubs" className="nav-btn-link">Clubs</Link>
            <Link to="/login" className="nav-btn-primary">Student Login</Link>
          </div>
        </div>
      </header>

      <main className="landing-main">
        <section className="landing-hero">
          <div className="hero-text-block">
            <span className="hero-kicker">Web Technology Project</span>
            <h1 className="hero-heading">College Event & Activity Management Portal</h1>
            <p className="hero-desc">
              A centralized web platform for students to explore campus events, join departmental
              clubs, register for competitions, and manage student activities.
            </p>
            <div className="hero-cta-group">
              <Link to="/login" className="cta-btn primary-cta">Get Started / Login</Link>
              <Link to="/events" className="cta-btn secondary-cta">Browse Events</Link>
            </div>
          </div>
        </section>

        <section className="landing-features">
          <h2 className="section-title">Key System Features</h2>
          <div className="feature-grid">
            <div className="feature-item">
              <h3 className="feature-heading">Event Registration</h3>
              <p className="feature-text">
                Browse college events across technical, cultural, sports, and workshop categories with search and category filtering.
              </p>
            </div>

            <div className="feature-item">
              <h3 className="feature-heading">Club Directory</h3>
              <p className="feature-text">
                Explore student organizations like Coding Club, Robotics, Music, and Sports societies and register as a member.
              </p>
            </div>

            <div className="feature-item">
              <h3 className="feature-heading">Student Dashboard</h3>
              <p className="feature-text">
                Access a personalized dashboard displaying upcoming campus schedules, announcements, and activity counts.
              </p>
            </div>

            <div className="feature-item">
              <h3 className="feature-heading">Admin Operations</h3>
              <p className="feature-text">
                Manage campus events with complete create, read, update, and delete (CRUD) operations stored in browser storage.
              </p>
            </div>
          </div>
        </section>

        <section className="landing-tech-stack">
          <h2 className="section-title">Project Details</h2>
          <div className="tech-box">
            <p><strong>Course:</strong> Web Technology</p>
            <p><strong>Architecture:</strong> Single Page Application (SPA)</p>
            <p><strong>Frontend:</strong> React, React Router, HTML5, CSS3</p>
            <p><strong>Client Storage:</strong> LocalStorage API for events, user session, and registrations</p>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>CampusConnect — College Event Management System</p>
        <p className="footer-sub">Web Technology Semester Project</p>
      </footer>
    </div>
  );
}

export default Landing;
