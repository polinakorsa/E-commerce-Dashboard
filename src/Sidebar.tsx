import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => setToggle(!toggle);

  return (
    <div className="menuToggle">
      <button
        className="absolute left-9 top-9 rounded-3xl bg-indigo-600 px-7.5 py-4.5 text-3xl font-semibold text-white shadow-xs
        hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleToggle}
      >
        {toggle}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          className="h-6 w-6 text-white"
          fill="currentColor"
        >
          <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z" />
        </svg>
      </button>

      {toggle ? (
        <nav className="absolute left-9 top-40 rounded-md text-2xl">
          <ul className="space-y-4">
            <li className="cursor-pointer hover:text-purple-600">
              <NavLink to="/usersReducer">Users</NavLink>{' '}
            </li>
            <li className="cursor-pointer hover:text-purple-600">
              <NavLink to="/products">Products</NavLink>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
