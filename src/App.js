import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';

import { Home } from './pages/Home';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './pages/Login';

const AppContent = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';

  const navigate = useNavigate();

  useEffect(() => {
    setIsMenuOpen(false); // Close menu when path changes
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const menuItems = [
    { text: 'Home', path: '/home' },
    { text: 'Tasks', path: '/tasks' },
    { text: 'Add Task', path: '/add' },
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage?.clear();
    setTimeout(() => {
      navigate('/login');
    }, 300);
  }

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f4f4f4',
    padding: '1rem',
    borderBottom: '1px solid #ccc',
    position: 'relative',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    display: 'inline-block',
  };

  const mobileMenuContainer = {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#fff',
    width: '100%',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    zIndex: 1000,
  };

  const mobileMenuItem = {
    borderBottom: '1px solid #eee',
    padding: '1rem',
    textAlign: 'center',
  };

  return (
    <div>
      {!isLoginPage && (
        <nav style={navStyle}>
          <h2 style={{ margin: 0 }}><Link to="/home" style={linkStyle}>To Do App</Link></h2>
          {isMobile ? (
            <div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  fontSize: '1.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ☰
              </button>
              {isMenuOpen && (
                <div style={mobileMenuContainer}>
                  {menuItems.map((item, index) => (
                    <div key={index} style={mobileMenuItem}>
                      <Link
                        to={item.path}
                        style={{ ...linkStyle, padding: 0 }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.text}
                      </Link>
                    </div>
                  ))}

                  {isLoggedIn && (
                    <div style={mobileMenuItem}>
                      <button
                        onClick={handleLogout}
                        style={{
                          backgroundColor: '#ff5c5c',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '5px',
                          padding: '0.5rem 1rem',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          width: '50%',
                          transition: 'background-color 0.3s ease'
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          ) : (
            <>
              <div>
                {menuItems.map((item, index) => (
                  <Link key={index} to={item.path} style={linkStyle}>
                    {item.text}
                  </Link>
                ))}
                <button onClick={handleLogout} style={linkStyle}>Log Out</button>
              </div>
            </>
          )}
        </nav>
      )}

      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/add" element={<TaskForm />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
