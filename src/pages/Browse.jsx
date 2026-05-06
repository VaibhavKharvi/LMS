import { useEffect, useState } from 'react';
import API from '../services/api';
import CourseCard from '../components/CourseCard';
import { Search } from 'lucide-react';
import { useSearch } from '../context/SearchContext';

const Browse = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { searchTerm } = useSearch();

    useEffect(() => {
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
        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div style={styles.header}>
                <h1 style={styles.title}>Browse Courses</h1>
                <p style={styles.subtitle}>Explore our library and start learning something new today.</p>
            </div>

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
};

export default Browse;
