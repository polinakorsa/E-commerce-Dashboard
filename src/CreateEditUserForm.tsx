import {useState, useEffect} from "react";

export default function CreateEditUserForm({ user, onSave, onCancel, onCreate}: { user: object}) {
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        if(user.id) {
            setEditingUser(user)
        } else {
            setEditingUser({
                firstName: '',
                lastName: '',
                age: '',
                username: ''
            })
        }
    }, [user])

    const handleUserChange = (event) => {
        setEditingUser((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const submitEditUserData = (event) => {
        event.preventDefault()

        if(user.id) {
            onSave(editingUser)
        } else {
            onCreate(editingUser)
        }
    }

    return (

        <div>
            <div className="p-10 md:p-16 flex flex-col justify-center">
                <form onSubmit={submitEditUserData} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={editingUser?.firstName}
                            onChange={handleUserChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                       focus:outline-none focus:ring-2 focus:ring-purple-500
                                       focus:border-transparent transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={editingUser?.lastName}
                            onChange={handleUserChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                       focus:outline-none focus:ring-2 focus:ring-purple-500
                                       focus:border-transparent transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Age
                        </label>
                        <input
                            type="number"
                            name="age"
                            value={editingUser?.age}
                            onChange={handleUserChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                       focus:outline-none focus:ring-2 focus:ring-purple-500
                                       focus:border-transparent transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={editingUser?.username}
                            onChange={handleUserChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                       focus:outline-none focus:ring-2 focus:ring-purple-500
                                       focus:border-transparent transition"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className="flex-1 py-4 bg-purple-600 hover:bg-purple-700
                                       text-white font-semibold rounded-xl shadow-md
                                       transition transform hover:scale-105"
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 py-4 border border-gray-300
                                       text-gray-700 font-semibold rounded-xl
                                       hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

