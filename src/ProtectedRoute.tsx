import { Navigate, Outlet } from 'react-router';

export default function ProtectedRoute({ isAuthenticated }) {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}