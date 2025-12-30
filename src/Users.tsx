import { useEffect, useState } from 'react';
import TableHeader from './TableHeader.tsx';
import ActionButtons from './ActionButtons.tsx';
import CreateEditUserForm from './CreateEditUserForm.tsx';

const columns = ['First Name', 'Last Name', 'Age', 'Email'];

export default function Users() {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [createUser, setCreateUser] = useState(null);

    useEffect(() => {
        fetch('https://dummyjson.com/users')
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
        })
        if (res.status === 200) {
            setUsers((prev) =>
                prev.map((user) => {
                    if(updatedUserData){
                        user.id === updatedUserData.id
                    } else {
                        user
                    }
                })
            );
            setEditUser(null);
        } else {
            console.log("error")
        }
    };

    const handleCancel = () => {
        setEditUser(null);
    };

    // const handleCreateForm = () => {
    //     setCreateUser({}); // Empty object triggers "Create" mode in the form
    // };
    //
    // const handleCreate = (user) => {
    //     setUsers(
    //         [
    //             ...users,
    //             {}
    //         ]
    //     )
    // }

    return (
        <div className='bg-stone-50 absolute left-80 top-40 w-[1420px] h-[2180px] rounded-xl'>
            {editUser ? (
                <CreateEditUserForm
                    user={editUser}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <>
            <TableHeader columns={columns} />
            <ul className='relative top-30 space-y-10 text-xl'>
                {users.map((user) => (

                    <li key={user.id}>
                        <input
                            className='absolute left-10 w-6 h-6 cursor-pointer'
                            type='checkbox'
                        />
                            <>
                                <span className='absolute left-0.5 w-100'>{user.firstName}</span>
                                <span className='absolute left-60 w-100'>{user.lastName}</span>
                                <span className='absolute left-170'>{user.age}</span>
                                <span className='absolute left-228'>{user.email}</span>

                                <ActionButtons
                                    item={user}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />

                            </>
                    </li>
                ))}
            </ul>
                </>
           )}
        </div>
    );
}
