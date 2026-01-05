import { useEffect, useState } from 'react';
import TableHeaderUsers from './TableHeaderUsers.tsx';
import ActionButtonsUsers from './ActionButtonsUsers.tsx';
import CreateEditUserForm from './CreateEditUserForm.tsx';
import Sidebar from "./Sidebar.tsx";

const columns = ['First Name', 'Last Name', 'Age', 'Username'];

export default function Users({onLogout}) {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [showCreateEdit, setShowCreateEdit] = useState(false);

    useEffect(() => {
        fetch('https://dummyjson.com/users?limit=25')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.users);
            });
    }, []);


    const handleDelete = async (userId) => {
        const res = await fetch (`https://dummyjson.com/users/${userId}`, {
            method: 'DELETE',
        })

        if (res.status === 200) {
            setUsers(prev => prev.filter(user => user.id !== userId));
        } else {
            console.log("error")
        }
    };

    const handleEdit = (user) => {
        setEditUser(user);
    };

    const handleSave = async (updatedUserData) => {
        const res = await fetch (`https://dummyjson.com/users/${updatedUserData.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUserData),
        })
        if (res.ok) {
            const savedUser = await res.json();

            setUsers((prev) =>
                prev.map((user) =>
                    user.id === savedUser.id ? savedUser : user
                )
            );

            setEditUser(null);
        } else {
            console.log("error")
        }
    };

    const handleCreateUser = async (newUser) => {
        const res = await fetch (`https://dummyjson.com/users/add/${newUser}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        })
        if (res.ok) {
            const addedUser = await res.json();
            setUsers(prev => [
                { ...addedUser },
                ...prev
        ]);
            setShowCreateEdit(false);
        }
    };

    return (
            <div className="max-w-5xl mx-auto my-12  bg-white rounded-xl">
             <Sidebar/>
                <button
                    onClick={onLogout}
                    className="absolute right-8 top-8 px-6 py-3 text-3xl font-semibold"
                >
                    Log out
                </button>
                {(editUser || showCreateEdit) && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                            <CreateEditUserForm
                                user={editUser ?? {}}
                                onSave={handleSave}
                                onCreate={handleCreateUser}
                                onCancel={() => {
                                    setEditUser(null);
                                    setShowCreateEdit(false);
                                }}
                            />
                        </div>
                    </div>
                )}

                <TableHeaderUsers
                    columns={columns}
                    onOpenForm={() => {
                        setEditUser(null);
                        setShowCreateEdit(true);
                    }}
                />

                <ul className="text-xl">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="grid grid-cols-[55px_250px_215px_160px_150px_150px] items-center py-8 px-6.5 hover:bg-gray-50 transition"                        >

                            <div className="flex justify-center">
                                <input
                                    type="checkbox"
                                    className=" w-6 h-6 cursor-pointer"
                                />
                            </div>

                            <div className="px-8 text-gray-900">{user.firstName}</div>
                            <div className="text-gray-700">{user.lastName}</div>
                            <div className="text-gray-600">{user.age}</div>
                            <div className="text-gray-600">{user.username}</div>


                            <div className="flex justify-end col-span-1">
                                <ActionButtonsUsers
                                    user={user}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
    )
}

