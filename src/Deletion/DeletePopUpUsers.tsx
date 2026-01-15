import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  getUsersError,
  getUsersLoading,
} from '../store/actions.ts';

export default function DeletePopUpUsers({ onCancel }) {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.usersReducer.activeUser);

  const handleUserDeleteById = async () => {
    dispatch(getUsersLoading());
    try {
      const res = await fetch(`https://dummyjson.com/users/${activeUser.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        const userToDelete = await res.json();
        dispatch(deleteUser(userToDelete.id));
        onCancel();
      }
    } catch (error) {
      dispatch(getUsersError(error));
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-black/90 flex items-center justify-center z-50">
        <div className="w-[400px] bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-10 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Delete Item?</h1>
              <p className="text-gray-600 mt-4">
                Are you sure you want to permanently delete this?
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={onCancel}
                className="px-8 py-3 bg-gray-200 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl shadow-md transition transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleUserDeleteById}
                className="px-8 py-3 bg-indigo-500 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-md transition transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
