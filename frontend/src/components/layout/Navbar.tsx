import React from 'react';
import './Navbar.css';

interface NavbarProps {
  username?: string;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ username = 'User', onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <h1 className="navbar-title">Audiogram System</h1>
        </div>

        <div className="navbar-right">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search..." 
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>

          <div className="navbar-user">
            <img 
              src="https://via.placeholder.com/40" 
              alt={username}
              className="user-avatar"
            />
            <div className="user-info">
              <p className="user-name">{username}</p>
              <button 
                className="logout-btn"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
