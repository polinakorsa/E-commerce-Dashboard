import { useState } from 'react';
import { useNavigate } from 'react-router';
import AbstractBackground from '../Layout/AbstractBackground.tsx';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      console.log('Invalid username or password');
      return;
    }

    const userData = await res.json();
    localStorage.setItem('token', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);

    navigate('/users');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      console.log('Missing credentials');
      return;
    }
    handleLogin(username, password);
  };
  //
  // const handleRefresh = async () => {
  //   const refreshToken = localStorage.getItem('refreshToken');
  //
  //   const res = await fetch('https://dummyjson.com/auth/refresh', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       refreshToken,
  //       expiresInMins: 30,
  //     }),
  //     credentials: 'include',
  //   });
  //
  //   if (!res.ok) {
  //     console.log('Unable to refresh session');
  //     return;
  //   }
  //
  //   const userData = await res.json();
  //   localStorage.setItem('token', userData.accessToken);
  //   localStorage.setItem('refreshToken', userData.refreshToken);
  //
  //   if (res.status === 401 || res.status === 403) {
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('refreshToken');
  //   }
  //   return;
  // };

  return (
    <>
      <AbstractBackground />
      <h1 className="flex w-200 text-7xl text-center mx-auto mt-5.5 ">
        E-commerce Dashboard
      </h1>

      <div className="flex justify-center pt-32">
        <div className="h-[500px] w-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-10 flex flex-col text-center">
            <h1 className="text-4xl font-bold text-gray-800">Welcome Back!</h1>
            <p className="text-gray-600 mt-2">
              Sign in to continue to your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col text-xl text-center items-center">
              <label className="block text-2xl text-centerfont-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="emilys"
                className="w-[400px] px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            <div className="flex flex-col text-center items-center">
              <label
                htmlFor="password"
                className="block text-center text-2xl font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="w-[400px] px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            <div className="flex text-2xl flex-col text-center items-center">
              <button
                type="submit"
                className="w-[400px] py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-md transition transform hover:scale-105"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
