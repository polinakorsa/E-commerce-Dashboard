import { createAsyncThunk } from '@reduxjs/toolkit';

export const createUserThunk = createAsyncThunk(
  'users/createUser',
  async (user, { rejectWithValue }) => {
    try {
      const res = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error);
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editUserThunk = createAsyncThunk(
  'users/editUser',
  async (user, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://dummyjson.com/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error);
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  'users/deleteUser',
  async (user, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://dummyjson.com/users/${user.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error);
      }

      const deletedUser = await res.json();
      return deletedUser.id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAllUsersThunk = createAsyncThunk(
  'users/deleteAllUsers',
  async (_, { getState, rejectWithValue }) => {
    const { selectedUsers } = getState().usersSlice;

    if (selectedUsers.length === 0) {
      return [];
    }

    try {
      await Promise.all(
        selectedUsers.map((id) =>
          fetch(`https://dummyjson.com/users/${id}`, {
            method: 'DELETE',
          })
        )
      );
      return selectedUsers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
