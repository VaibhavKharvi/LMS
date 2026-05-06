import { useEffect, useState } from 'react';
import API from '../services/api';
import { Users, BookOpen, UserCheck, Trash2, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, totalCourses: 0, totalEnrollments: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsRes, usersRes, coursesRes] = await Promise.all([
                API.get('/user/stats'),
                API.get('/user/all'),
                API.get('/courses')
            ]);
            setStats(statsRes.data);
            setUsers(usersRes.data);
            setCourses(coursesRes.data);
        } catch (error) {
            console.error('Failed to fetch admin data');
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await API.delete(`/user/${id}`);
                toast.success('User deleted');
                fetchData();
            } catch (err) {
                toast.error(err.response?.data?.message || 'Failed to delete');
            }
        }
    };

    const deleteCourse = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await API.delete(`/courses/${id}`);
                toast.success('Course deleted');
                fetchData();
            } catch (err) {
                toast.error('Failed to delete course');
            }
        }
    };

    const statCards = [
        { name: 'Total Users', value: stats.totalUsers, icon: Users, color: '#6366f1' },
        { name: 'Total Courses', value: stats.totalCourses, icon: BookOpen, color: '#10b981' },
        { name: 'Total Enrollments', value: stats.totalEnrollments, icon: UserCheck, color: '#f59e0b' },
    ];

    return (
        <div>
            <div style={styles.header}>
                <h1 style={styles.title}>System Administration</h1>
                <p style={styles.subtitle}>Full control over users, courses, and platform activity.</p>
            </div>

            <div style={styles.statsGrid}>
                {statCards.map((stat) => (
                    <div key={stat.name} className="glass-card" style={styles.statCard}>
                        <div style={{ ...styles.statIcon, background: `${stat.color}20`, color: stat.color }}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <div style={styles.statValue}>{stat.value}</div>
                            <div style={styles.statName}>{stat.name}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Manage Users</h2>
                <div className="glass-card" style={styles.tableCard}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tr}>
                                <th style={styles.th}>Name</th>
                                <th style={styles.th}>Email</th>
                                <th style={styles.th}>Role</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} style={styles.tr}>
                                    <td style={styles.td}>{user.name}</td>
                                    <td style={styles.td}>{user.email}</td>
                                    <td style={styles.td}>
                                        <span style={{ 
                                            ...styles.roleBadge, 
                                            background: user.role === 'admin' ? '#ef444420' : user.role === 'instructor' ? '#6366f120' : '#10b98120',
                                            color: user.role === 'admin' ? '#ef4444' : user.role === 'instructor' ? '#6366f1' : '#10b981'
                                        }}>
                                            {user.role}
                                        </span>
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

            <div style={{ ...styles.section, marginTop: '3rem' }}>
                <h2 style={styles.sectionTitle}>Global Course Management</h2>
                <div className="glass-card" style={styles.tableCard}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tr}>
                                <th style={styles.th}>Title</th>
                                <th style={styles.th}>Instructor</th>
                                <th style={styles.th}>Category</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course._id} style={styles.tr}>
                                    <td style={styles.td}>{course.title}</td>
                                    <td style={styles.td}>{course.instructor?.name}</td>
                                    <td style={styles.td}>{course.category}</td>
                                    <td style={styles.td}>
                                        <button onClick={() => deleteCourse(course._id)} style={styles.actionBtn}><Trash2 size={18} color="#ef4444" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    statCard: { padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' },
    statIcon: { width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    statValue: { fontSize: '1.5rem', fontWeight: '700' },
    statName: { fontSize: '0.85rem', color: 'var(--text-muted)' },
    sectionTitle: { fontSize: '1.6rem', fontWeight: '700', marginBottom: '1.5rem' },
    tableCard: { padding: '0.5rem', overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
    th: { padding: '1.25rem 1rem', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase' },
    td: { padding: '1.25rem 1rem', borderBottom: '1px solid var(--border)', fontSize: '0.95rem' },
    tr: { transition: 'background 0.3s ease' },
    roleBadge: { padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: '600', textTransform: 'capitalize' },
    actionBtn: { background: 'rgba(255, 255, 255, 0.05)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', cursor: 'pointer' },
};

export default AdminDashboard;
