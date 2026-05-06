import { Search, Bell, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';

const Navbar = () => {
    const { user } = useAuth();
    const { searchTerm, setSearchTerm } = useSearch();

    return (
        <header style={styles.navbar}>
            <div style={styles.searchBox}>
                <Search size={18} color="var(--text-muted)" />
                <input 
                    type="text" 
                    placeholder="Search for courses..." 
                    style={styles.searchInput} 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div style={styles.actions}>
                <button style={styles.iconBtn}>
                    <Bell size={20} color="var(--text-muted)" />
                    <span style={styles.badge}></span>
                </button>

                <div style={styles.profile}>
                    <div style={styles.userInfo}>
                        <span style={styles.userName}>{user?.name}</span>
                        <span style={styles.userRole}>{user?.role}</span>
                    </div>
                    <div style={styles.avatar}>
                        <User size={20} color="white" />
                    </div>
                </div>
            </div>
        </header>
    );
};

const styles = {
    navbar: {
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        marginLeft: '280px',
        background: 'transparent',
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        background: 'var(--surface)',
        padding: '0.6rem 1.25rem',
        borderRadius: '2rem',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid var(--border)',
    },
    searchInput: {
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: 'white',
        width: '100%',
        fontSize: '0.9rem',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
    },
    iconBtn: {
        position: 'relative',
        background: 'var(--surface)',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid var(--border)',
    },
    badge: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '8px',
        height: '8px',
        background: '#ef4444',
        borderRadius: '50%',
        border: '2px solid var(--surface)',
    },
    profile: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        paddingLeft: '1.5rem',
        borderLeft: '1px solid var(--border)',
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    userName: {
        fontSize: '0.9rem',
        fontWeight: '600',
    },
    userRole: {
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        textTransform: 'capitalize',
    },
    avatar: {
        width: '40px',
        height: '40px',
        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

export default Navbar;
