import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, DollarSign, PlusCircle, Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

const InstructorDashboard = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [stats, setStats] = useState({ totalStudents: 0, totalCourses: 0, totalEarnings: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, coursesRes] = await Promise.all([
                    API.get('/user/stats'),
                    API.get('/courses') // We'll filter these in the backend or frontend
                ]);
                setStats(statsRes.data);
                const currentUser = JSON.parse(sessionStorage.getItem('user'));
                setCourses(coursesRes.data.filter(c => c.instructor?._id === currentUser?._id));
            } catch (error) {
                console.error('Failed to fetch instructor data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const statCards = [
        { name: 'Total Students', value: stats.totalStudents, icon: Users, color: '#6366f1' },
        { name: 'Active Courses', value: stats.totalCourses, icon: BookOpen, color: '#10b981' },
        { name: 'Total Earnings', value: `₹${stats.totalEarnings}`, icon: DollarSign, color: '#f59e0b' },
    ];

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await API.delete(`/courses/${id}`);
                setCourses(courses.filter(c => c._id !== id));
                toast.success('Course deleted successfully');
            } catch (err) {
                toast.error('Failed to delete course');
            }
        }
    };

    return (
        <div>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Instructor Dashboard</h1>
                    <p style={styles.subtitle}>Manage your courses and track your performance.</p>
                </div>
                <button onClick={() => navigate('/create-course')} className="btn-primary">
                    <PlusCircle size={20} />
                    Create New Course
                </button>
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
                <h2 style={styles.sectionTitle}>Your Courses</h2>
                <div className="glass-card" style={styles.tableCard}>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tr}>
                                <th style={styles.th}>Course Title</th>
                                <th style={styles.th}>Category</th>
                                <th style={styles.th}>Price</th>
                                <th style={styles.th}>Lessons</th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course._id} style={styles.tr}>
                                    <td style={styles.td}>{course.title}</td>
                                    <td style={styles.td}>{course.category}</td>
                                    <td style={styles.td}>₹{course.price}</td>
                                    <td style={styles.td}>{course.lessons.length}</td>
                                    <td style={styles.td}>
                                        <span style={{ 
                                            padding: '4px 8px', 
                                            borderRadius: '4px', 
                                            fontSize: '12px',
                                            background: course.isApproved ? '#10b98120' : '#f59e0b20',
                                            color: course.isApproved ? '#10b981' : '#f59e0b'
                                        }}>
                                            {course.isApproved ? 'Approved' : 'Pending'}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.actions}>
                                            <button onClick={() => navigate(`/edit-course/${course._id}`)} style={styles.actionBtn}>
                                                <Edit size={18} color="#6366f1" />
                                            </button>
                                            <button onClick={() => handleDelete(course._id)} style={styles.actionBtn}>
                                                <Trash2 size={18} color="#ef4444" />
                                            </button>
                                        </div>
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
    header: {
        marginBottom: '2.5rem',
    },
    title: {
        fontSize: '2.2rem',
        fontWeight: '800',
        marginBottom: '0.5rem',
        background: 'linear-gradient(to right, #fff, #94a3b8)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    subtitle: {
        color: 'var(--text-muted)',
        fontSize: '1.1rem',
    },
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
    actions: { display: 'flex', gap: '0.5rem' },
    actionBtn: { background: 'rgba(255, 255, 255, 0.05)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.2s' },
};

export default InstructorDashboard;
