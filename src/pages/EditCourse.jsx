import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, FileText, List, Trash2, PlusCircle, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await API.get(`/courses/${id}`);
                setTitle(data.title);
                setDescription(data.description);
                setCategory(data.category);
                setPrice(data.price);
                setThumbnail(data.thumbnail);
                setLessons(data.lessons);
            } catch (error) {
                toast.error('Failed to load course data');
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id, navigate]);

    const handleLessonChange = (index, field, value) => {
        const newLessons = [...lessons];
        newLessons[index][field] = value;
        setLessons(newLessons);
    };

    const addLesson = () => {
        setLessons([...lessons, { title: '', content: '', videoUrl: '' }]);
    };

    const removeLesson = (index) => {
        if (lessons.length > 1) {
            setLessons(lessons.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const courseData = { title, description, category, price: Number(price), thumbnail, lessons };
            await API.put(`/courses/${id}`, courseData);
            toast.success('Course updated successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={styles.loading}>Loading course data...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => navigate('/dashboard')} style={styles.backBtn}><ArrowLeft size={18} /> Back</button>
                <h1 style={styles.title}>Edit Course</h1>
                <p style={styles.subtitle}>Update your course content and curriculum.</p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div className="glass-card" style={styles.card}>
                    <h2 style={styles.sectionTitle}><FileText size={20} /> General Information</h2>
                    <div style={styles.inputGrid}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Course Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={styles.input} />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Category</label>
                            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required style={styles.input} />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Price (₹)</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={styles.input} />
                        </div>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Thumbnail URL</label>
                            <input type="text" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} style={styles.input} />
                        </div>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required style={{ ...styles.input, height: '100px', resize: 'none' }} />
                    </div>
                </div>

                <div className="glass-card" style={styles.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ ...styles.sectionTitle, marginBottom: 0 }}><List size={20} /> Curriculum</h2>
                        <button type="button" onClick={addLesson} style={styles.addBtn}><PlusCircle size={18} /> Add Lesson</button>
                    </div>

                    {lessons.map((lesson, index) => (
                        <div key={index} style={styles.lessonItem}>
                            <div style={styles.lessonHeader}>
                                <span>Lesson {index + 1}</span>
                                <button type="button" onClick={() => removeLesson(index)} style={styles.removeBtn}><Trash2 size={16} /></button>
                            </div>
                            <div style={styles.inputGrid}>
                                <input type="text" value={lesson.title} onChange={(e) => handleLessonChange(index, 'title', e.target.value)} placeholder="Lesson Title" required style={styles.input} />
                                <input type="text" value={lesson.videoUrl} onChange={(e) => handleLessonChange(index, 'videoUrl', e.target.value)} placeholder="Video URL" style={styles.input} />
                            </div>
                            <textarea value={lesson.content} onChange={(e) => handleLessonChange(index, 'content', e.target.value)} placeholder="Lesson Content" required style={{ ...styles.input, height: '80px', marginTop: '0.75rem', resize: 'none' }} />
                        </div>
                    ))}
                </div>

                <button type="submit" className="btn-primary" style={styles.submitBtn} disabled={saving}>
                    {saving ? 'Saving...' : <><Save size={20} /> Save Changes</>}
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: { maxWidth: '900px', margin: '0 auto' },
    loading: { textAlign: 'center', padding: '4rem', fontSize: '1.2rem', color: 'var(--text-muted)' },
    header: { marginBottom: '2rem' },
    backBtn: { background: 'transparent', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem', padding: 0 },
    title: { fontSize: '1.8rem', marginBottom: '0.5rem' },
    subtitle: { color: 'var(--text-muted)' },
    form: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    card: { padding: '2rem' },
    sectionTitle: { fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' },
    inputGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    label: { fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '500' },
    input: { width: '100%', padding: '0.75rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '0.75rem', color: 'white', outline: 'none' },
    lessonItem: { padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '1rem', marginBottom: '1rem', background: 'rgba(255,255,255,0.02)' },
    lessonHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '600' },
    addBtn: { background: 'transparent', color: 'var(--primary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    removeBtn: { background: 'transparent', color: '#ef4444' },
    submitBtn: { width: '100%', justifyContent: 'center', height: '50px', fontSize: '1.1rem', gap: '0.75rem' },
};

export default EditCourse;
