import { useEffect, useState } from 'react';
import API from '../services/api';
import { Users, Trash2, Mail, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const { data } = await API.get('/user/all');
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        if (window.confirm('Delete this user? This action cannot be undone.')) {
            try {
                await API.delete(`/user/${id}`);
                toast.success('User removed');
                fetchUsers();
            } catch (err) {
                toast.error(err.response?.data?.message || 'Delete failed');
            }
        }
    };

    const updateUserRole = async (id, newRole) => {
        try {
            await API.put(`/user/${id}/role`, { role: newRole });
            toast.success('Role updated');
            fetchUsers();
        } catch (err) {
            toast.error('Failed to update role');
        }
    };

    return (
        <div>
            <div style={styles.header}>
                <h1 style={styles.title}>User Management</h1>
                <p style={styles.subtitle}>Control access and manage roles for all platform members.</p>
            </div>

            <div className="glass-card" style={styles.tableCard}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tr}>
                            <th style={styles.th}>Member</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Role</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} style={styles.tr}>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={styles.avatar}>{user.name.charAt(0)}</div>
                                        {user.name}
                                    </div>
                                </td>
                                <td style={styles.td}>{user.email}</td>
                                <td style={styles.td}>
                                    <select 
                                        value={user.role} 
                                        onChange={(e) => updateUserRole(user._id, e.target.value)}
                                        style={{ 
                                            ...styles.roleSelect, 
                                            color: user.role === 'admin' ? '#ef4444' : user.role === 'instructor' ? '#6366f1' : '#10b981'
                                        }}
                                    >
                                        <option value="student">Student</option>
                                        <option value="instructor">Instructor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td style={styles.td}>
                                    <button onClick={() => deleteUser(user._id)} style={styles.actionBtn}><Trash2 size={18} color="#ef4444" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    header: { marginBottom: '2.5rem' },
    title: { 
        fontSize: '2.2rem', 
        fontWeight: '800',
        marginBottom: '0.5rem',
        background: 'linear-gradient(to right, #fff, #94a3b8)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    subtitle: { color: 'var(--text-muted)', fontSize: '1.1rem' },
    tableCard: { padding: '0.5rem', overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
    th: { padding: '1.25rem 1rem', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase' },
    td: { padding: '1.25rem 1rem', borderBottom: '1px solid var(--border)', fontSize: '0.95rem' },
    avatar: { width: '32px', height: '32px', borderRadius: '8px', background: 'var(--surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: 'var(--primary)' },
    roleSelect: { 
        background: 'rgba(255, 255, 255, 0.05)', 
        border: '1px solid var(--border)', 
        padding: '0.35rem 0.75rem', 
        borderRadius: '0.5rem', 
        fontSize: '0.85rem', 
        fontWeight: '600',
        outline: 'none',
        color: 'white',
        cursor: 'pointer'
    },
    actionBtn: { background: 'rgba(255, 255, 255, 0.05)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', cursor: 'pointer' },
};

export default AdminUsers;
