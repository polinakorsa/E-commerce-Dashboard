import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../store/usersSlice.ts';
import type { User } from '../store/usersSlice';
import type { RootState } from '../store/store.tsx';

interface UserProps {
  user: User;
}

export default function UserCheckbox({ user }: UserProps) {
  const dispatch = useDispatch();
  const selectedUsers = useSelector(
    (state: RootState) => state.usersSlice.selectedUsers
  );

  const handleToggle = () => {
    dispatch(selectUser(user.id));
  };

  return (
    <input
      type="checkbox"
      className=" w-6 h-6 cursor-pointer"
      onChange={handleToggle}
      checked={selectedUsers.includes(user.id)}
    />
  );
}
