import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Layout/Layout.tsx';
import Users from '../UserData/Users.tsx';
import Products from '../ProductsData/Products.tsx';
import Login from '../Login/Login.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
