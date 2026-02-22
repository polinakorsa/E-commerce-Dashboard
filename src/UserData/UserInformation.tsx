import ActionButtonsUsers from './ActionButtonsUsers.tsx';
import UserCheckbox from '../Checkboxes/userCheckbox.tsx';
import type { User } from '../store/usersSlice';

interface UserProps {
  user: User;
}

export default function UserInformation({ user }: UserProps) {
  return (
    <li className="grid grid-cols-[55px_250px_215px_160px_150px_150px] items-center py-8 px-6.5 hover:bg-gray-50 transition">
      <div className="flex justify-center">
        <UserCheckbox user={user} />
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
