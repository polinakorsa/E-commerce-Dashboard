import {useState} from "react";

export default function Login({onLogin, isLoading}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }
        onLogin(username, password);
    };

    return (
        <>
            <div className="flex justify-center pt-32">
                <div className="h-[500px] w-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="p-10 flex flex-col text-center">
                            <h1 className="text-4xl font-bold text-gray-800">Welcome Back!</h1>
                            <p className="text-gray-600 mt-2">Sign in to continue to your account.</p>
                        </div>

                        <form  onSubmit={handleSubmit}  className="space-y-6">
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
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="flex flex-col text-center items-center">
                                <label htmlFor="password" className="block text-center text-2xl font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-[400px] px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                    disabled={isLoading}
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