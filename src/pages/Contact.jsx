import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <div className="page-container" style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '1rem', textAlign: 'center' }}>Get in Touch</h1>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>Have questions? We'd love to hear from you.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '50%', color: '#8b5cf6' }}>
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-dark)', marginBottom: '0.25rem' }}>Email Us</h3>
                            <p style={{ color: 'var(--text-muted)' }}>support@eduspark.com</p>
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '50%', color: '#0ea5e9' }}>
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-dark)', marginBottom: '0.25rem' }}>Call Us</h3>
                            <p style={{ color: 'var(--text-muted)' }}>+1 (555) 123-4567</p>
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '50%', color: '#ec4899' }}>
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-dark)', marginBottom: '0.25rem' }}>Visit Us</h3>
                            <p style={{ color: 'var(--text-muted)' }}>123 Learning Ave, NY 10001</p>
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '3rem' }}>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>Name</label>
                            <input type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-light)', color: 'var(--text-dark)' }} placeholder="Your name" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>Email</label>
                            <input type="email" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-light)', color: 'var(--text-dark)' }} placeholder="your@email.com" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>Message</label>
                            <textarea rows="4" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-light)', color: 'var(--text-dark)', resize: 'vertical' }} placeholder="How can we help?"></textarea>
                        </div>
                        <button type="button" className="btn-primary" style={{ justifyContent: 'center' }}>Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
