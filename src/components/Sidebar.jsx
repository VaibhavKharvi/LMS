import { Link, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    BookOpen, 
    Users, 
    LogOut,
    PlusCircle,
    GraduationCap,
    ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const studentLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'My Courses', path: '/my-courses', icon: BookOpen },
        { name: 'Browse', path: '/browse', icon: GraduationCap },
    ];

    const instructorLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Create Course', path: '/create-course', icon: PlusCircle },
        { name: 'Students', path: '/students', icon: Users },
    ];

    const adminLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Manage Users', path: '/admin-users', icon: Users },
        { name: 'Manage Courses', path: '/admin-courses', icon: ShieldCheck },
    ];

    // Select links based on user role
    const links = user?.role === 'admin' 
        ? adminLinks 
        : user?.role === 'instructor' 
            ? instructorLinks 
            : studentLinks;

    return (
        <aside style={styles.sidebar} className="glass-card">
            <div style={styles.logoBox}>
                <div style={styles.logoIcon}>A</div>
                <h2 style={styles.logoText}>Antigravity<span>LMS</span></h2>
            </div>

            <nav style={styles.nav}>
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        style={{
                            ...styles.link,
                            ...(location.pathname === link.path ? styles.activeLink : {}),
                        }}
                    >
                        <link.icon size={20} />
                        <span>{link.name}</span>
                    </Link>
                ))}
            </nav>

            <div style={styles.footer}>
                <div style={styles.userInfo}>
                    <div style={styles.userRoleBadge}>{user?.role}</div>
                    <div style={styles.userName}>{user?.name}</div>
                </div>
                <button onClick={logout} style={styles.logoutBtn}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

const styles = {
    sidebar: {
        width: '260px',
        height: 'calc(100vh - 2rem)',
        margin: '1rem',
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
    },
    logoBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '3rem',
        padding: '0 0.5rem',
    },
    logoIcon: {
        width: '35px',
        height: '35px',
        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.2rem',
    },
    logoText: {
        fontSize: '1.2rem',
        margin: 0,
        color: 'white',
    },
    nav: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        flex: 1,
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.85rem 1rem',
        borderRadius: '0.75rem',
        color: 'var(--text-muted)',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
    },
    activeLink: {
        background: 'rgba(99, 102, 241, 0.15)',
        color: 'var(--primary)',
        fontWeight: '600',
        textDecoration: 'none',
    },
    footer: {
        marginTop: 'auto',
        paddingTop: '1rem',
        borderTop: '1px solid var(--border)',
    },
    userInfo: {
        padding: '0 1rem 1rem',
        marginBottom: '0.5rem',
    },
    userRoleBadge: {
        fontSize: '0.65rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--primary)',
        fontWeight: '700',
        marginBottom: '0.25rem',
    },
    userName: {
        fontSize: '0.9rem',
        color: 'white',
        fontWeight: '500',
    },
    logoutBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.85rem 1rem',
        width: '100%',
        background: 'transparent',
        color: '#ef4444',
        textAlign: 'left',
        borderRadius: '0.75rem',
        border: 'none',
    },
};

export default Sidebar;
