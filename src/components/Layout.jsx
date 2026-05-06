import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div style={styles.layout}>
            <Sidebar />
            <div style={styles.main}>
                <Navbar />
                <main style={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
};

const styles = {
    layout: {
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--background)',
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        marginLeft: '280px',
        padding: '1rem 2rem 2rem',
        flex: 1,
    },
};

export default Layout;
