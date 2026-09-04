import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ padding: '1.5rem', background: '#f1f5f9', minHeight: 'calc(100vh - 70px)' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
                
                {/* Left Column (Main Content) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Hero Card */}
                    <div style={{
                        background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)',
                        borderRadius: '1.5rem',
                        padding: '3rem 4rem',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 10px 25px rgba(139, 92, 246, 0.25)'
                    }}>
                        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
                            <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem' }}>
                                Elevate Your Learning Journey.
                            </h1>
                            <p style={{ fontSize: '1.1rem', opacity: '0.9', marginBottom: '2.5rem', maxWidth: '450px', lineHeight: '1.6' }}>
                                Discover, manage, and excel in your courses with our intuitive LMS. Learn anytime, anywhere.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Link to="/browse" className="btn-primary" style={{ background: '#f97316', color: 'white' }}>
                                    Explore Courses
                                </Link>
                                <Link to="/register" className="btn-secondary">
                                    Get Started Free
                                </Link>
                            </div>
                        </div>
                        {/* Decorative Graphic placeholder */}
                        <div style={{ position: 'absolute', right: '-50px', top: '50%', transform: 'translateY(-50%)', opacity: 0.9 }}>
                            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Learning" style={{ width: '400px', height: '400px', objectFit: 'cover', borderRadius: '50%', mixBlendMode: 'overlay' }} />
                        </div>
                    </div>

                    {/* Features Row */}
                    <div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>Platform Features</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                            {[
                                { title: 'Advanced UI/UX', subtitle: 'Interactive Learning', progress: 65, color: '#0ea5e9' },
                                { title: 'Python Data Science', subtitle: 'Expert Instructors', progress: 40, color: '#f59e0b' },
                                { title: 'Global Marketing', subtitle: 'Track Progress', progress: 80, color: '#8b5cf6' }
                            ].map((item, i) => (
                                <div key={i} className="glass-card" style={{ padding: '1.5rem', background: 'white' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${item.color}20`, border: `1px solid ${item.color}40` }}></div>
                                        <div>
                                            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-dark)' }}>{item.title}</h3>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.subtitle}</p>
                                        </div>
                                    </div>
                                    <div style={{ background: '#f1f5f9', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ width: `${item.progress}%`, height: '100%', background: item.color, borderRadius: '3px' }}></div>
                                    </div>
                                    <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                                        <button style={{ background: '#f97316', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '1rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>Learn More</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column (Sidebar) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ background: 'white', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>Recommended for You</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { title: 'Advanced UI/UX Design', color: '#ef4444' },
                                { title: 'Python Data Science', color: '#f59e0b' },
                                { title: 'Global Marketing Strategy', color: '#3b82f6' }
                            ].map((course, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '1rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${course.color}20` }}></div>
                                    <div>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-dark)' }}>{course.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ background: 'white', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>Upcoming Deadlines</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#fff7ed', borderRadius: '1rem', border: '1px solid #ffedd5' }}>
                                <div style={{ color: '#f97316' }}>📅</div>
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#c2410c' }}>Quiz: UI Principles</h4>
                                    <p style={{ fontSize: '0.8rem', color: '#fdba74' }}>Today 5 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
