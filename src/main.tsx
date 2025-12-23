import { createRoot } from 'react-dom/client';
import './index.css';
import Layout from './Layout.tsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Users from './Users.tsx';
import Products from './Products.tsx';
import Login from './Login.tsx';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<Navigate to='/login' replace />} />
                <Route path='/users' element={<Users />} />
                <Route path='/products' element={<Products />} />
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<p>Hello</p>} />
            </Route>
        </Routes>
    </BrowserRouter>
);
