import { useEffect, useState } from 'react';
import API from '../services/api';
import { BookOpen, Trash2, User, CheckCircle, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminCourses = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCourses = async () => {
        try {
            const { data } = await API.get('/courses');
            setCourses(data);
        } catch (error) {
            console.error('Failed to fetch courses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const deleteCourse = async (id) => {
        if (window.confirm('Delete this course from the platform?')) {
            try {
                await API.delete(`/courses/${id}`);
                toast.success('Course removed');
                fetchCourses();
            } catch (err) {
                toast.error('Failed to delete course');
            }
        }
    };

    return (
        <div>
            <div style={styles.header}>
                <h1 style={styles.title}>Course Governance</h1>
                <p style={styles.subtitle}>Monitor and manage all educational content across the site.</p>
            </div>

            <div className="glass-card" style={styles.tableCard}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tr}>
                            <th style={styles.th}>Course</th>
                            <th style={styles.th}>Instructor</th>
                            <th style={styles.th}>Category</th>
                            <th style={styles.th}>Price</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course._id} style={styles.tr}>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <img src={course.thumbnail} style={styles.thumb} alt="" />
                                        {course.title}
                                    </div>
                                </td>
                                <td style={styles.td}>{course.instructor?.name}</td>
                                <td style={styles.td}>{course.category}</td>
                                <td style={styles.td}>₹{course.price}</td>
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
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {!course.isApproved && (
                                            <button 
                                                onClick={async () => {
                                                    await API.put(`/courses/${course._id}/approve`);
                                                    toast.success('Course Approved');
                                                    fetchCourses();
                                                }} 
                                                style={{...styles.actionBtn, color: '#10b981'}}
                                                title="Approve Course"
                                            >
                                                <CheckCircle size={18} />
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => navigate(`/edit-course/${course._id}`)} 
                                            style={{...styles.actionBtn, color: '#6366f1'}}
                                            title="Edit Course"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button 
                                            onClick={() => deleteCourse(course._id)} 
                                            style={{...styles.actionBtn, color: '#ef4444'}}
                                            title="Delete Course"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
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
    thumb: { width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' },
    actionBtn: { background: 'rgba(255, 255, 255, 0.05)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.2s' },
};

export default AdminCourses;
