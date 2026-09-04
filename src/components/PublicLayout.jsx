import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';

const PublicLayout = () => {
    const { user } = useAuth();
    return (
        <div className="public-layout">
            <header className="public-header" style={{
                background: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                position: 'sticky',
                top: 0,
                zIndex: 50
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
                    <Logo isDark={true} />
                    
                    <nav className="public-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <Link to="/" style={{ color: '#f8fafc', fontWeight: '500', textDecoration: 'none', transition: 'color 0.2s' }}>Home</Link>
                        <Link to="/about" style={{ color: '#94a3b8', fontWeight: '500', textDecoration: 'none', transition: 'color 0.2s' }}>About</Link>
                        <Link to="/contact" style={{ color: '#94a3b8', fontWeight: '500', textDecoration: 'none', transition: 'color 0.2s' }}>Contact</Link>
                        <Link to="/dashboard" style={{ color: '#94a3b8', fontWeight: '500', textDecoration: 'none', transition: 'color 0.2s' }}>Dashboard</Link>
                    </nav>

                    <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'rgba(255,255,255,0.05)',
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <Search size={16} color="#94a3b8" />
                            <input type="text" placeholder="Search..." style={{
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                color: '#f8fafc',
                                width: '150px',
                                fontSize: '0.9rem'
                            }} />
                        </div>
                        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', position: 'relative' }}>
                            <Bell size={20} color="#94a3b8" />
                            <span style={{ position: 'absolute', top: 0, right: 0, width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></span>
                        </button>
                        
                        {user ? (
                            <Link to="/dashboard" style={{
                                padding: '0.5rem 1.5rem',
                                borderRadius: '2rem',
                                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                color: 'white',
                                textDecoration: 'none',
                                fontWeight: '600'
                            }}>Go to Dashboard</Link>
                        ) : (
                            <Link to="/login" style={{
                                padding: '0.5rem 1.5rem',
                                borderRadius: '2rem',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#f8fafc',
                                textDecoration: 'none',
                                fontWeight: '500'
                            }}>Sign In</Link>
                        )}
                    </div>
                </div>
            </header>
            
            <main className="public-main">
                <Outlet />
            </main>

            <footer className="public-footer">
                <div className="container" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    &copy; {new Date().getFullYear()} EduSpark Learning Platform. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
