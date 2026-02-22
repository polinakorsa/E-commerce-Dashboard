import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers, toggleModalVisibility } from '../store/usersSlice.ts';
import { deleteAllUsersThunk } from '../store/thunkUsers.ts';
import type { RootState } from '../store/store.tsx';

interface TableHeaderUsersProps {
  columns: string[];
}

export default function TableHeaderUsers({ columns }: TableHeaderUsersProps) {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.usersSlice.data);
  const selectedUsers = useSelector(
    (state: RootState) => state.usersSlice.selectedUsers
  );

  const handleModalOpen = () => {
    dispatch(toggleModalVisibility());
  };

  const handleSelectAll = () => {
    dispatch(selectAllUsers());
  };

  const bulkDelete = () => {
    dispatch(deleteAllUsersThunk(selectedUsers));
  };

  return (
    <div className="bg-gray-100 rounded-t-xl border-b border-gray-600 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-11 px-3.5">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="w-7 h-7 cursor-pointer"
            onChange={handleSelectAll}
            checked={selectedUsers.length === users.length && users.length > 1}
          />
        </div>

        <div className="flex gap-30 items-center text-xl text-gray-700 font-semibold">
          {columns.map((column: string, index: number) => (
            <span key={index}>{column}</span>
          ))}
        </div>
      </div>

      <div>
        {selectedUsers.length > 1 && (
          <button
            onClick={bulkDelete}
            className="absolute right-95 top-10 px-4 py-2 bg-indigo-600 hover:bg-indigo-600  text-white font-medium text-2xl rounded-xl transition transform hover:scale-105 shadow-md"
          >
            Delete selected
          </button>
        )}
      </div>

      <button
        onClick={handleModalOpen}
        className="absolute right-50 top-10 px-4 py-2 bg-indigo-600 hover:bg-indigo-600  text-white font-medium text-2xl rounded-xl transition transform hover:scale-105 shadow-md"
      >
        Add User
      </button>
    </div>
  );
}
