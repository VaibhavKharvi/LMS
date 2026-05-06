import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react';

const Login = ({ title = "Welcome Back", subtitle = "Log in to continue your learning journey", hideRegister = false }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div className="glass-card" style={styles.card}>
                <div style={styles.header}>
                    <div style={styles.iconBox}>
                        <LogIn size={24} color="white" />
                    </div>
                    <h1 style={styles.title}>{title}</h1>
                    <p style={styles.subtitle}>{subtitle}</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {error && <div style={styles.error}>{error}</div>}
                    
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <div style={styles.inputWrapper}>
                            <Mail size={18} style={styles.inputIcon} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <div style={styles.inputWrapper}>
                            <Lock size={18} style={styles.inputIcon} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" style={styles.button} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : 'Log In'}
                    </button>
                </form>

                {!hideRegister && (
                    <p style={styles.footer}>
                        Don't have an account? <Link to="/register" style={styles.link}>Sign Up</Link>
                    </p>
                )}
            </div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at top right, #1e1b4b, #0f172a)',
    },
    card: {
        width: '100%',
        maxWidth: '400px',
        padding: '2.5rem',
        textAlign: 'center',
    },
    header: {
        marginBottom: '2rem',
    },
    iconBox: {
        width: '50px',
        height: '50px',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1rem',
        boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)',
    },
    title: {
        fontSize: '1.75rem',
        marginBottom: '0.5rem',
    },
    subtitle: {
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        textAlign: 'left',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    label: {
        fontSize: '0.85rem',
        fontWeight: '500',
        color: 'var(--text-muted)',
    },
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    inputIcon: {
        position: 'absolute',
        left: '1rem',
        color: 'var(--text-muted)',
    },
    input: {
        width: '100%',
        padding: '0.75rem 1rem 0.75rem 2.75rem',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid var(--border)',
        borderRadius: '0.75rem',
        color: 'white',
        outline: 'none',
        transition: 'all 0.3s ease',
    },
    button: {
        width: '100%',
        justifyContent: 'center',
        marginTop: '0.5rem',
        height: '45px',
    },
    error: {
        background: 'rgba(239, 68, 68, 0.1)',
        color: '#ef4444',
        padding: '0.75rem',
        borderRadius: '0.5rem',
        fontSize: '0.85rem',
        border: '1px solid rgba(239, 68, 68, 0.2)',
    },
    footer: {
        marginTop: '1.5rem',
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
    },
    link: {
        color: 'var(--primary)',
        fontWeight: '500',
    },
};

export default Login;
