import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, Utensils, Users } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <header className="hero">
        <div className="hero-content">
          <h1>Share Food, <span className="highlight">Save Lives</span></h1>
          <p>Connect excess food from events, restaurants, and homes with people who need it. Reduce waste and fight hunger together.</p>
          <div className="hero-buttons">
            <Link to="/add-donor" className="btn btn-primary btn-large">
              Donate Food <ArrowRight size={20} />
            </Link>
            <Link to="/dashboard" className="btn btn-secondary btn-large">
              Find Food
            </Link>
          </div>
        </div>
        <div className="hero-image">
          {/* We will just use an illustration placeholder. Since we don't have images we can use CSS shapes or a simple visual */}
          <div className="hero-graphic">
            <HeartHandshake size={120} className="hero-icon" />
          </div>
        </div>
      </header>

      <section className="features">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Utensils size={32} />
            </div>
            <h3>Have Extra Food?</h3>
            <p>Post details about your available food, including type, quantity, and location.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Users size={32} />
            </div>
            <h3>Need Food?</h3>
            <p>Browse available food donations near you or post a request for food.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <HeartHandshake size={32} />
            </div>
            <h3>Connect & Share</h3>
            <p>Contact donors or receivers to coordinate the pickup and help the community.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
