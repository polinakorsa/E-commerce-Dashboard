import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Layout from './Layout';
import Users from './Users';
import Products from './Products';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

export default function AppRouter() {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (username, password) => {
        setIsLoading(true);
        try {
            const res = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                alert('Invalid username or password');
                return;
            }

            const userData = await res.json();
            setAuthenticatedUser(userData);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => setAuthenticatedUser(null);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout onLogout={handleLogout} />}>
                    <Route
                        path="/login"
                        element={
                            authenticatedUser
                                ? <Navigate to="/users" replace />
                                : <Login onLogin={handleLogin} isLoading={isLoading} />
                        }
                    />

                    <Route element={<ProtectedRoute isAuthenticated={!!authenticatedUser} />}>
                        <Route
                            path="/users"
                            element={<Users onLogout={handleLogout} />}
                        />
                        <Route
                            path="/products"
                            element={<Products onLogout={handleLogout} />}
                        />
                    </Route>

                    <Route path="/" element={<Navigate to="/login" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}