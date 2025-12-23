export default function Login() {
    return (
        <>
                <div className=" absolute left-190 top-60 w-[500px] grid gap-8 bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="p-10 md:p-16 flex flex-col justify-center">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
                            <p className="text-gray-600 mt-2">Sign in to continue to your account.</p>
                        </div>

                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="emilyjones@gmail.com"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-md transition transform hover:scale-105"
                            >
                                Login
                            </button>
                        </form>
                 </div>
                </div>
        </>
    );
}