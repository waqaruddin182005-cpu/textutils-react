import React from 'react';
//import { a } from 'react-router';

export default function Navbar({
  title = 'TextUtils',
  aboutText = 'About',
  mode,
  toggleMode,
  showAlert,
  navigate,
}) {
  const handleModeToggle = () => {
    toggleMode();
    showAlert(`${mode === 'dark' ? 'Light' : 'Dark'} mode enabled.`);
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode} textutils-navbar`}>
      <div className="container-fluid textutils-nav-inner">
        <a className="navbar-brand fw-semibold" href="/" onClick={(event) => { event.preventDefault(); navigate('home'); }}>
          {title}
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={(event) => { event.preventDefault(); navigate('home'); }}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about" onClick={(event) => { event.preventDefault(); navigate('about'); }}>{aboutText}</a>
            </li>
          </ul>
          <div className="form-check form-switch dark-mode-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="darkModeSwitch" checked={mode === 'dark'} onChange={handleModeToggle} />
            <label className="form-check-label" htmlFor="darkModeSwitch">
              Enable DarkMode
            </label>
          </div>
        </div>
      </div>
    </nav>
    );
}
