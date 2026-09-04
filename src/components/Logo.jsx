import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Logo = ({ isDark = false }) => {
    return (
        <Link to="/" className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{
                background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
            }}>
                <GraduationCap size={24} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 'bold', 
                    color: isDark ? '#f8fafc' : 'var(--text-dark)', 
                    lineHeight: '1',
                    letterSpacing: '-0.025em'
                }}>
                    EduSpark
                </span>
                <span style={{ 
                    fontSize: '0.65rem', 
                    color: 'var(--text-muted)', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em',
                    fontWeight: '600'
                }}>
                    Online Learning
                </span>
            </div>
        </Link>
    );
};

export default Logo;
