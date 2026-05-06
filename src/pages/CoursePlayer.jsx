import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { ChevronRight, Play, CheckCircle, ArrowLeft, BookOpen, Info } from 'lucide-react';

const CoursePlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [activeLesson, setActiveLesson] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await API.get(`/courses/${id}`);
                setCourse(data);
            } catch (error) {
                console.error('Failed to load course');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    if (loading) return <div style={styles.loading}>Loading Player...</div>;
    if (!course) return <div style={styles.error}>Course not found</div>;

    const currentLesson = course.lessons[activeLesson];

    // Convert YouTube URL to Embed URL
    const getEmbedUrl = (url) => {
        if (!url) return '';
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) 
            ? `https://www.youtube.com/embed/${match[2]}` 
            : url;
    };

    return (
        <div style={styles.container}>
            <div style={styles.topBar}>
                <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>
                    <ArrowLeft size={18} /> Back to Dashboard
                </button>
                <div style={styles.courseTitle}>{course.title}</div>
            </div>

            <div style={styles.mainContent}>
                <div style={styles.videoSection}>
                    <div style={styles.playerWrapper}>
                        {currentLesson?.videoUrl ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={getEmbedUrl(currentLesson.videoUrl)}
                                title="Lesson Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={styles.iframe}
                            ></iframe>
                        ) : (
                            <div style={styles.noVideo}>
                                <Play size={48} color="var(--text-muted)" />
                                <p>No video for this lesson</p>
                            </div>
                        )}
                    </div>
                    
                    <div style={styles.lessonInfo}>
                        <h1 style={styles.lessonTitle}>{currentLesson?.title}</h1>
                        <div style={styles.contentBox}>
                            <div style={styles.contentHeader}><Info size={16} /> Lesson Content</div>
                            <p style={styles.description}>{currentLesson?.content}</p>
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={styles.sidebar}>
                    <div style={styles.sidebarHeader}>
                        <BookOpen size={20} />
                        <span>Course Curriculum</span>
                    </div>
                    <div style={styles.lessonList}>
                        {course.lessons.map((lesson, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveLesson(index)}
                                style={{
                                    ...styles.lessonItem,
                                    ...(activeLesson === index ? styles.activeLesson : {}),
                                }}
                            >
                                <div style={styles.lessonIndex}>
                                    {activeLesson > index ? <CheckCircle size={18} color="var(--accent)" /> : <span>{index + 1}</span>}
                                </div>
                                <div style={styles.lessonMeta}>
                                    <span style={styles.lessonName}>{lesson.title}</span>
                                    <span style={styles.lessonDuration}>10:00</span>
                                </div>
                                {activeLesson === index && <Play size={14} style={styles.playingIcon} />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { minHeight: '100vh', background: '#0a0f1d', color: 'white' },
    topBar: { height: '60px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 2rem', gap: '2rem', background: '#0f172a' },
    backBtn: { background: 'transparent', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' },
    courseTitle: { fontWeight: '600', fontSize: '1.1rem', borderLeft: '1px solid var(--border)', paddingLeft: '2rem' },
    mainContent: { display: 'flex', height: 'calc(100vh - 60px)' },
    videoSection: { flex: 1, padding: '2rem', overflowY: 'auto' },
    playerWrapper: { width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' },
    iframe: { border: 'none' },
    noVideo: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' },
    lessonInfo: { marginTop: '2rem' },
    lessonTitle: { fontSize: '1.8rem', marginBottom: '1.5rem' },
    contentBox: { background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)' },
    contentHeader: { display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '1rem', fontSize: '0.9rem' },
    description: { color: 'var(--text-muted)', lineHeight: '1.6' },
    sidebar: { width: '350px', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', borderRadius: 0, margin: 0, background: '#0f172a' },
    sidebarHeader: { padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '600' },
    lessonList: { flex: 1, overflowY: 'auto' },
    lessonItem: { width: '100%', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'left', transition: 'all 0.2s' },
    activeLesson: { background: 'rgba(99, 102, 241, 0.1)' },
    lessonIndex: { width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' },
    lessonMeta: { flex: 1 },
    lessonName: { display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem' },
    lessonDuration: { fontSize: '0.75rem', color: 'var(--text-muted)' },
    playingIcon: { color: 'var(--primary)' },
    loading: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '1.2rem' },
};

export default CoursePlayer;
