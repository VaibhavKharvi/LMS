import { Play, Clock, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import toast from 'react-hot-toast';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    const handleEnroll = async () => {
        try {
            await API.post('/enroll', { courseId: course._id });
            toast.success('Successfully enrolled!');
            navigate(`/course/${course._id}`);
        } catch (error) {
            if (error.response?.data?.message === 'Already enrolled in this course') {
                navigate(`/course/${course._id}`);
            } else {
                toast.error(error.response?.data?.message || 'Enrollment failed');
            }
        }
    };

    return (
        <div className="glass-card" style={styles.card}>
            <div style={styles.imageBox}>
                <img src={course.thumbnail} alt={course.title} style={styles.image} />
                <div style={styles.category}>{course.category}</div>
            </div>
            
            <div style={styles.content}>
                <h3 style={styles.title}>{course.title}</h3>
                <div style={styles.meta}>
                    <div style={styles.metaItem}>
                        <Clock size={16} />
                        <span>6h 30m</span>
                    </div>
                    <div style={styles.metaItem}>
                        <BookOpen size={16} />
                        <span>{course.lessons?.length || 0} Lessons</span>
                    </div>
                </div>

                <div style={styles.footer}>
                    <div style={styles.instructor}>
                        <div style={styles.avatar}>{course.instructor?.name?.charAt(0)}</div>
                        <span>{course.instructor?.name}</span>
                    </div>
                    <div style={styles.price}>₹{course.price}</div>
                </div>

                <button onClick={handleEnroll} className="btn-primary" style={styles.btn}>
                    <Play size={16} />
                    Enroll Now
                </button>
            </div>
        </div>
    );
};

const styles = {
    card: {
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
    },
    imageBox: {
        position: 'relative',
        height: '180px',
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    category: {
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        padding: '0.25rem 0.75rem',
        borderRadius: '2rem',
        fontSize: '0.75rem',
        fontWeight: '500',
        color: 'white',
    },
    content: {
        padding: '1.5rem',
    },
    title: {
        fontSize: '1.1rem',
        marginBottom: '1rem',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    meta: {
        display: 'flex',
        gap: '1.5rem',
        marginBottom: '1.5rem',
    },
    metaItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        paddingTop: '1rem',
        borderTop: '1px solid var(--border)',
    },
    instructor: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
    },
    avatar: {
        width: '24px',
        height: '24px',
        background: 'var(--surface-hover)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.7rem',
        color: 'var(--primary)',
        fontWeight: 'bold',
    },
    price: {
        fontSize: '1.1rem',
        fontWeight: '700',
        color: 'var(--accent)',
    },
    btn: {
        width: '100%',
        justifyContent: 'center',
    },
};

export default CourseCard;
