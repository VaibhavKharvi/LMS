import React from 'react';

const About = () => {
    return (
        <div className="page-container" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '2rem', textAlign: 'center' }}>About EduSpark</h1>
            <div className="glass-card" style={{ padding: '3rem' }}>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                    EduSpark was founded with a simple yet powerful mission: to make high-quality education accessible to everyone, anywhere in the world. We believe that learning is a lifelong journey, and our platform is designed to support you every step of the way.
                </p>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                    Our team of passionate educators and technologists has built a modern, intuitive Learning Management System that bridges the gap between traditional education and the digital future.
                </p>
                <div style={{ marginTop: '3rem', padding: '2rem', background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(139, 92, 246, 0.1))', borderRadius: '1rem' }}>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '1rem' }}>Our Vision</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        To empower individuals and organizations to achieve their full potential through innovative learning experiences and cutting-edge educational technology.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
