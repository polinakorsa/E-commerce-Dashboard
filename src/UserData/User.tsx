import ActionButtonsUsers from './ActionButtonsUsers.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../store/usersSlice.ts';

export default function User({ user }) {
  const dispatch = useDispatch();
  const selectedUsers = useSelector((state) => state.usersSlice.selectedUsers);

  const handleToggle = () => {
    dispatch(selectUser(user.id));
  };

  return (
    <li className="grid grid-cols-[55px_250px_215px_160px_150px_150px] items-center py-8 px-6.5 hover:bg-gray-50 transition">
      <div className="flex justify-center">
        <input
          type="checkbox"
          className=" w-6 h-6 cursor-pointer"
          onChange={handleToggle}
          checked={selectedUsers.includes(user.id)}
        />
      </div>

      <div className="px-8 text-gray-900">{user.firstName}</div>
      <div className="text-gray-700">{user.lastName}</div>
      <div className="text-gray-600">{user.age}</div>
      <div className="text-gray-600">{user.username}</div>

      <div className="flex justify-end col-span-1">
        <ActionButtonsUsers user={user} />
      </div>
    </li>
  );
}
