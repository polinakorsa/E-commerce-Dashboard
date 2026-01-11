import { Outlet } from 'react-router';
import AbstractBackground from './AbstractBackground.tsx';
import LogOutButton from './LogOutButton.tsx';
import Footer from './Footer.tsx';

export default function Layout() {
  return (
    <>
      <AbstractBackground />
      <LogOutButton />
      <h1 className="flex w-200 text-7xl text-center mx-auto mt-5.5 ">
        E-commerce Dashboard
      </h1>
      <Outlet />
      <Footer />
    </>
  );
}
