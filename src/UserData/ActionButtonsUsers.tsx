import DeletePopUpUsers from '../Deletion/DeletePopUpUsers.tsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveUser, toggleModalVisibility } from '../store/usersSlice.ts';
import EditUserButton from '../assets/EditUserButton.tsx';
import DeleteUserButton from '../assets/DeleteUserButton.tsx';
import type { User } from '../store/usersSlice.ts';

interface ActionButtonsUsersProps {
  user: User;
}

export default function ActionButtonsUsers({ user }: ActionButtonsUsersProps) {
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const dispatch = useDispatch();

  const openDeletePopUp = () => {
    dispatch(setActiveUser(user));
    setShowDeletePopUp(true);
  };

  const closeDeletePopUp = () => {
    dispatch(setActiveUser(null));
    setShowDeletePopUp(false);
  };

  const handleModalOpen = () => {
    dispatch(setActiveUser(user));
    dispatch(toggleModalVisibility());
  };

  return (
    <div className="flex px-7 gap-0.5 items-center">
      <button
        onClick={handleModalOpen}
        className="p-2 rounded-md hover:bg-indigo-100 transition"
      >
        <EditUserButton />
      </button>

      <button
        onClick={openDeletePopUp}
        className=" rounded-md hover:bg-red-100 transition"
      >
        <DeleteUserButton />
      </button>

      {showDeletePopUp && (
        <DeletePopUpUsers user={user} onCancel={closeDeletePopUp} />
      )}
    </div>
  );
}
