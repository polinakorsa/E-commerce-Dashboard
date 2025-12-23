// import { useState } from 'react';

export default function TableHeader({ columns }) {
    // const [selectedAll, setSelectedAll] = useState([]);

    return (
        <div className='text-gray-500 text-xl absolute flex items-center justify-between px-2 w-[1420px] h-[60px] rounded-xl bg-gray-100 outline outline-1 outline-gray-400'>
            <input
                className='absolute left-10 w-6 h-6 accent-indigo-500 cursor-pointer'
                type='checkbox'
                id='checkbox'
            />

            <div className='text-gray-500 text-xl absolute flex items-center justify-between px-25'>
                <ul className='flex items-center space-x-35 text-xl translate-x-[60px]'>
                    {columns.map((column, index) => (
                        <li className='w-[100px]' key={index}>
                            {column}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
