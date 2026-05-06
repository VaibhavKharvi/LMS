import { useEffect, useState } from 'react';
import API from '../services/api';
import { User, Mail, Book, Calendar } from 'lucide-react';

const InstructorStudents = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const { data } = await API.get('/enroll/instructor-students');
                setEnrollments(data);
            } catch (error) {
                console.error('Failed to fetch students');
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    return (
        <div>
            <div style={styles.header}>
                <h1 style={styles.title}>My Students</h1>
                <p style={styles.subtitle}>View and manage students enrolled in your courses.</p>
            </div>

            <div style={styles.grid}>
                {loading ? (
                    <p>Loading students...</p>
                ) : enrollments.length > 0 ? (
                    enrollments.map((enr) => (
                        <div key={enr._id} className="glass-card" style={styles.studentCard}>
                            <div style={styles.avatar}>
                                <User size={24} color="white" />
                            </div>
                            <div style={styles.info}>
                                <h3 style={styles.name}>{enr.student?.name || 'Test Student'}</h3>
                                <div style={styles.meta}>
                                    <div style={styles.metaItem}><Mail size={14} /> {enr.student?.email || 'student@example.com'}</div>
                                    <div style={styles.metaItem}><Book size={14} /> {enr.course?.title}</div>
                                    <div style={styles.metaItem}><Calendar size={14} /> Enrolled: {new Date(enr.createdAt).toLocaleDateString()}</div>
                                </div>
                            </div>
                            <div style={styles.progressBox}>
                                <div style={styles.progressLabel}>Progress: {enr.progress}%</div>
                                <div style={styles.progressBar}>
                                    <div style={{ ...styles.progressFill, width: `${enr.progress}%` }}></div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ color: 'var(--text-muted)' }}>No students enrolled yet.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    header: { marginBottom: '2.5rem' },
    title: { fontSize: '1.8rem', marginBottom: '0.5rem' },
    subtitle: { color: 'var(--text-muted)' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' },
    studentCard: { padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' },
    avatar: { width: '50px', height: '50px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    info: { flex: 1, minWidth: '200px' },
    name: { fontSize: '1.1rem', marginBottom: '0.75rem' },
    meta: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    metaItem: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' },
    progressBox: { width: '100%', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' },
    progressLabel: { fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' },
    progressBar: { height: '6px', background: 'var(--surface)', borderRadius: '10px', overflow: 'hidden' },
    progressFill: { height: '100%', background: 'var(--accent)', transition: 'width 0.5s ease' },
};

export default InstructorStudents;
