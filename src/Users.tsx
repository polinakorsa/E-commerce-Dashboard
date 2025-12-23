import { useEffect, useState } from 'react';
import TableHeader from './TableHeader.tsx';
import ActionButtons from './ActionButtons.tsx';

//Checkbox | Select all | Edit + Edit Mode
const columns = ['First Name', 'Last Name', 'Age', 'Email', 'Password'];

export default function Users() {
    const [users, setUsers] = useState([]);
    const [editId, setEditId] = useState(0);

    const handleDelete = (userId) => {
        setUsers(prev => prev.filter(user => user.id !== userId));
    };

    const handleEditId = ((user) => {
        setEditId(user.id)
    })

    useEffect(() => {
        fetch('https://dummyjson.com/users')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.users);
            });
    }, []);


    return (
        <div className='bg-stone-50 absolute left-80 top-40 w-[1420px] h-[2180px] rounded-xl'>
            <TableHeader columns={columns} />
            <ul className='relative top-30 space-y-10 text-xl'>
                {users.map((user) => (
                    <li key={user.id}>
                        <input
                            className='absolute left-10 w-6 h-6 cursor-pointer'
                            type='checkbox'
                        />

                        <span className='absolute left-0.5 w-100'>{user.firstName}</span>
                        <span className='absolute left-60 w-100'>{user.lastName}</span>
                        <span className='absolute left-170'>{user.age}</span>
                        <span className='absolute left-228'>{user.username}</span>
                        <span className='absolute left-283'>{user.password}</span>

                        <ActionButtons
                            userId={user.id}
                            onDelete={handleDelete}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
