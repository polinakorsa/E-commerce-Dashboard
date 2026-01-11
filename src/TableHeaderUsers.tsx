import { useDispatch, useSelector } from 'react-redux';
import { toggleModalVisibility } from './store/actions.ts';

export default function TableHeaderUsers({ columns }) {
  const dispatch = useDispatch();

  const handleModalOpen = () => {
    dispatch(toggleModalVisibility());
  };

  return (
    <div className="bg-gray-100 rounded-t-xl border-b border-gray-600 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-11 px-3.5">
        <div className="flex items-center">
          <input type="checkbox" className="w-7 h-7 cursor-pointer" />
        </div>

        <div className="flex gap-30 items-center text-xl text-gray-700 font-semibold">
          {columns.map((column, index) => (
            <span key={index}>{column}</span>
          ))}
        </div>
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
