import CreateEditUserForm from './CreateEditUserForm.tsx';

export default function TableHeader({ columns, onCreate }) {

    return (
        <div className="flex items-center bg-gray-100 h-16 rounded-t-xl border-b border-gray-300">
            <div className="w-16 flex justify-center">
                <input
                    type="checkbox"
                    className="w-5 h-5 accent-indigo-600 rounded cursor-pointer focus:ring-indigo-500"
                    id="select-all"
                />
            </div>

            <div className="flex-1 flex items-center px-8">
                <ul className="flex items-center space-x-12 text-lg text-gray-600 font-medium">
                    {columns.map((column, index) => (
                        <li key={index} className="w-48 text-left">
                            {column}
                        </li>
                    ))}
                </ul>

            </div>
            <button className="flex justify-baseline w-100 text-center text-3xl text-black">Create User</button>
            {onCreate && (
                <CreateEditUserForm
                    user={editUser}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />

            )
                }
        </div>
    );
}


