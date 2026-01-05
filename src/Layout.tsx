import { Outlet } from 'react-router';
import AbstractBackground from './AbstractBackground.tsx';

export default function Layout() {
        return (
            <>

                <AbstractBackground/>
                <h1 className="flex w-200 text-7xl text-center mx-auto mt-5.5 ">E-commerce Dashboard</h1>
                <Outlet/>
            </>
        );
    }
