import './App.css';
import { Outlet, Link } from 'react-router';
import Sidebar from './Sidebar.tsx';
import AbstractBackground from './AbstractBackground.tsx';
import Footer from './Footer.tsx';

//  Log in + Log Out Auth | Dark mode

function Layout() {

    return (
        <>
            <Sidebar />
            <AbstractBackground />
            <Link
                to='/login'
                className='absolute left-445 top-9 rounded-3xl bg-white px-7.5 py-4.5 text-2xl font-semibold text-black shadow-xs
        hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
                Log in
            </Link>
            <div>
                <h1 className='absolute left-170 top-10 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl'>
                    {' '}
                    Ecommerce Dashboard
                </h1>
            </div>
            <Outlet />
            <Footer />
        </>
    );
}

export default Layout;
