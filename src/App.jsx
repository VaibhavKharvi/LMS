import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MyCourses from './pages/MyCourses';
import Browse from './pages/Browse';
import CreateCourse from './pages/CreateCourse';
import InstructorStudents from './pages/InstructorStudents';
import EditCourse from './pages/EditCourse';
import AdminUsers from './pages/AdminUsers';
import AdminCourses from './pages/AdminCourses';
import CoursePlayer from './pages/CoursePlayer';
import Layout from './components/Layout';

const DashboardSelector = () => {
    const { user } = useAuth();
    if (user?.role === 'admin') return <AdminDashboard />;
    if (user?.role === 'instructor') return <InstructorDashboard />;
    return <StudentDashboard />;
};

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null;
    return user ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <SearchProvider>
                <Toaster position="top-right" />
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        
                        {/* Dedicated Portals */}
                        <Route 
                            path="/instructor" 
                            element={<Login title="Instructor Portal" subtitle="Access your course management tools" hideRegister={true} />} 
                        />
                        <Route 
                            path="/admin" 
                            element={<Login title="Admin Portal" subtitle="System-wide administration access" hideRegister={true} />} 
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <DashboardSelector />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/my-courses"
                            element={
                                <PrivateRoute>
                                    <MyCourses />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/browse"
                            element={
                                <PrivateRoute>
                                    <Browse />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/create-course"
                            element={
                                <PrivateRoute>
                                    <CreateCourse />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/students"
                            element={
                                <PrivateRoute>
                                    <InstructorStudents />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/edit-course/:id"
                            element={
                                <PrivateRoute>
                                    <EditCourse />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/admin-users"
                            element={
                                <PrivateRoute>
                                    <AdminUsers />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/admin-courses"
                            element={
                                <PrivateRoute>
                                    <AdminCourses />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/course/:id"
                            element={
                                <PrivateRoute>
                                    <CoursePlayer />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/" element={<Navigate to="/login" />} />
                    </Routes>
                </Router>
            </SearchProvider>
        </AuthProvider>
    );
}

export default App;
