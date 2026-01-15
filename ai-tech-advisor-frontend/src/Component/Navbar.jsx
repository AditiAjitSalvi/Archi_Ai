import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{
            padding: '1.5rem 0',
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: 'var(--text-main)',
                    textDecoration: 'none',
                    fontFamily: "'Outfit', sans-serif"
                }}>
                    Tech<span style={{ color: 'var(--primary)' }}>Advisor</span>
                </Link>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link to="/" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
                    <Link to="/analyze" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Get Started</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
