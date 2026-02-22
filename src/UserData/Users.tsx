import { useEffect } from 'react';
import TableHeaderUsers from './TableHeaderUsers.tsx';
import CreateEditUserForm from './CreateEditUserForm.tsx';
import Sidebar from '../Layout/Sidebar.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUsersError,
  getUsersLoading,
  getUsersSuccess,
} from '../store/usersSlice.ts';

import UserInformation from './UserInformation.tsx';
import Loading from '../Loading/Loading.tsx';
import type { RootState } from '../store/store.tsx';

const columns = ['First Name', 'Last Name', 'Age', 'Username'];

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.usersSlice.data);
  const loading = useSelector((state: RootState) => state.usersSlice.loading);
  const error = useSelector((state: RootState) => state.usersSlice.error);
  const isModalOpen = useSelector(
    (state: RootState) => state.usersSlice.isModalOpen
  );

  useEffect(() => {
    const getUsers = async () => {
      dispatch(getUsersLoading());
      try {
        const res = await fetch('https://dummyjson.com/users?limit=25');
        const data = await res.json();
        dispatch(getUsersSuccess(data.users));
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to fetch users';
        dispatch(getUsersError(message));
      }
    };
    getUsers();
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto my-12  bg-white rounded-xl">
      {error && <p>Failed to load users</p>}
      <Sidebar />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <CreateEditUserForm />
          </div>
        </div>
      )}

      <TableHeaderUsers columns={columns} />

      <ul className="text-xl">
        {users.map((user) => (
          <UserInformation key={user.id} user={user} />
        ))}

        <div className="flex items-center justify-center">
          {loading && <Loading />}
        </div>
      </ul>
    </div>
  );
}
