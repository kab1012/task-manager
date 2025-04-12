import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import About from './pages/About';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Tasks', path: '/tasks' },
    { text: 'Add Task', path: '/add' },
    // { text: 'About', path: '/about' },
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsMenuOpen(false); // Close mobile menu on resize
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <Router>
      <div>
        {/* Navbar */}
        <nav style={navStyle}>
          <h2 style={{ margin: 0 }}><Link to="/" style={linkStyle}>To Do App</Link></h2>

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
                </div>
              )}
            </div>
          ) : (
            <div>
              {menuItems.map((item, index) => (
                <Link key={index} to={item.path} style={linkStyle}>
                  {item.text}
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/add" element={<TaskForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
