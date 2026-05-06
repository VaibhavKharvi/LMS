import { useEffect, useState } from 'react';
import API from '../services/api';
import CourseCard from '../components/CourseCard';
import { BookOpen } from 'lucide-react';

const MyCourses = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const { data } = await API.get('/enroll/my-courses');
                setEnrollments(data);
            } catch (error) {
                console.error('Failed to fetch enrolled courses');
            } finally {
                setLoading(false);
            }
        };
        fetchMyCourses();
    }, []);

    return (
        <div>
            <div style={styles.header}>
                <h1 style={styles.title}>My Courses</h1>
                <p style={styles.subtitle}>Track your progress and continue learning.</p>
            </div>

            <div style={styles.courseGrid}>
                {loading ? (
                    <p>Loading your courses...</p>
                ) : enrollments.length > 0 ? (
                    enrollments.map((enrollment) => (
                        <CourseCard key={enrollment._id} course={enrollment.course} />
                    ))
                ) : (
                    <div style={styles.empty}>
                        <BookOpen size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
                        <p>You haven't enrolled in any courses yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    header: { marginBottom: '2.5rem' },
    title: { fontSize: '1.8rem', marginBottom: '0.5rem' },
    subtitle: { color: 'var(--text-muted)' },
    courseGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
    },
    empty: {
        gridColumn: '1 / -1',
        textAlign: 'center',
        padding: '4rem 0',
        color: 'var(--text-muted)',
    }
};

export default MyCourses;
