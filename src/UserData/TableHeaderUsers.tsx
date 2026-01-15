import { useDispatch, useSelector } from 'react-redux';
import {
  bulkUserSelection,
  deleteALLUserSelection,
  toggleModalVisibility,
} from '../store/actions.ts';

export default function TableHeaderUsers({ columns }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersReducer.data);
  const selectedUsers = useSelector(
    (state) => state.usersReducer.selectedUsers
  );

  const handleModalOpen = () => {
    dispatch(toggleModalVisibility());
  };

  const bulkDelete = () => {
    dispatch(deleteALLUserSelection(selectedUsers));
  };

  const handleSelectAll = () => {
    dispatch(bulkUserSelection());
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
          {columns.map((column, index) => (
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
