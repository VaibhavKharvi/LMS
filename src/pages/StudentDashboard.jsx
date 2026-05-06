import { useEffect, useState } from 'react';
import API from '../services/api';
import CourseCard from '../components/CourseCard';
import { LayoutDashboard, BookOpen, GraduationCap, TrendingUp } from 'lucide-react';
import { useSearch } from '../context/SearchContext';

const StudentDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [statsData, setStatsData] = useState({ enrolledCount: 0, completedLessonsCount: 0, learningHours: 0 });
    const [loading, setLoading] = useState(true);
    const { searchTerm } = useSearch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coursesRes, statsRes] = await Promise.all([
                    API.get('/courses'),
                    API.get('/user/stats')
                ]);
                setCourses(coursesRes.data);
                setStatsData(statsRes.data);
            } catch (error) {
                console.error('Failed to fetch dashboard data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredCourses = courses.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = [
        { name: 'Enrolled Courses', value: statsData.enrolledCount, icon: BookOpen, color: '#6366f1' },
        { name: 'Completed Lessons', value: statsData.completedLessonsCount, icon: GraduationCap, color: '#10b981' },
        { name: 'Learning Hours', value: `${statsData.learningHours}h`, icon: TrendingUp, color: '#f59e0b' },
    ];

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Student Dashboard</h1>
                <p style={styles.subtitle}>Welcome back! Continue where you left off.</p>
            </div>

            <div style={styles.statsGrid}>
                {stats.map((stat) => (
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
                <h2 style={styles.sectionTitle}>Featured Courses</h2>
                <div style={styles.courseGrid}>
                    {loading ? (
                        <p>Loading courses...</p>
                    ) : filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                            <CourseCard key={course._id} course={course} />
                        ))
                    ) : (
                        <p>No courses found matching "{searchTerm}"</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '1rem 0',
    },
    header: {
        marginBottom: '2rem',
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
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem',
    },
    statCard: {
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
    },
    statIcon: {
        width: '50px',
        height: '50px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statValue: {
        fontSize: '1.5rem',
        fontWeight: '700',
    },
    statName: {
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
    },
    section: {
        marginTop: '2rem',
    },
    sectionTitle: {
        fontSize: '1.6rem',
        fontWeight: '700',
        marginBottom: '1.5rem',
    },
    courseGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
    },
};

export default StudentDashboard;
