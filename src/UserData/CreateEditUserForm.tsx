import { useEffect, useState } from 'react';
import {
  setActiveUser,
  toggleModalVisibility,
  type User,
} from '../store/usersSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading.tsx';
import { createUserThunk, editUserThunk } from '../store/thunkUsers.ts';
import type { RootState } from '../store/store.tsx';
import * as React from 'react';

const emptyUser: User = {
  id: 0,
  firstName: '',
  lastName: '',
  username: '',
  age: 0,
};

export default function CreateEditUserForm() {
  const dispatch = useDispatch();
  const activeUser = useSelector(
    (state: RootState) => state.usersSlice.activeUser
  );
  const [user, setUser] = useState<User>(emptyUser);
  const loading = useSelector((state: RootState) => state.usersSlice.loading);
  const error = useSelector((state: RootState) => state.usersSlice.error);

  useEffect(() => {
    if (activeUser) {
      setUser(activeUser);
    } else {
      setUser(emptyUser);
    }
  }, [dispatch, activeUser]);

  const handleCreateUser = () => {
    dispatch(createUserThunk(user));
  };

  const handleEditUser = () => {
    dispatch(editUserThunk(user));
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]:
        event.target.name === 'age'
          ? Number(event.target.value)
          : event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (user.id) {
      handleEditUser();
    } else {
      handleCreateUser();
    }
    onCancel();
  };

  const onCancel = () => {
    dispatch(toggleModalVisibility());
    dispatch(setActiveUser(null));
  };

  return (
    <div>
      <div className="p-10 md:p-16 flex flex-col justify-center">
        {error && <p>Failed to edit or create user information</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={user?.firstName}
              onChange={handleUserChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                       focus:outline-none focus:ring-2 focus:ring-purple-500
                                       focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={user?.lastName}
              onChange={handleUserChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                       focus:outline-none focus:ring-2 focus:ring-purple-500
                                       focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={user?.age}
              onChange={handleUserChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                       focus:outline-none focus:ring-2 focus:ring-purple-500
                                       focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={user?.username}
              onChange={handleUserChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                       focus:outline-none focus:ring-2 focus:ring-purple-500
                                       focus:border-transparent transition"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 py-4 bg-purple-600 hover:bg-purple-700
                                       text-white font-semibold rounded-xl shadow-md
                                       transition transform hover:scale-105"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-4 border border-gray-300
                                       text-gray-700 font-semibold rounded-xl
                                       hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
}
