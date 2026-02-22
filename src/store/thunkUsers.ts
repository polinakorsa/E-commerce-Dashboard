import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from './usersSlice.ts';
import type { RootState } from './store.ts';

type NewUser = Omit<User, 'id'>;

export const createUserThunk = createAsyncThunk<
  User,
  NewUser,
  { rejectValue: string }
>('users/createUser', async (user, { rejectWithValue }) => {
  try {
    const res = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    return await res.json();
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Unknown network error';
    return rejectWithValue(message);
  }
});

export const editUserThunk = createAsyncThunk<
  User,
  User,
  { rejectValue: string }
>('users/editUser', async (user, { rejectWithValue }) => {
  try {
    const res = await fetch(`https://dummyjson.com/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    return await res.json();
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Unknown network error';
    return rejectWithValue(message);
  }
});

export const deleteUserThunk = createAsyncThunk<
  number,
  { id: number },
  { rejectValue: string }
>('users/deleteUser', async ({ id }, { rejectWithValue }) => {
  try {
    const res = await fetch(`https://dummyjson.com/users/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    return data.id ?? id;
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Unknown network error';
    return rejectWithValue(message);
  }
});

export const deleteAllUsersThunk = createAsyncThunk<
  number[],
  number[],
  { rejectValue: string; state: RootState }
>(
  'users/deleteAllUsers',

  async (selectedUsersIds: number[], { rejectWithValue }) => {
    if (selectedUsersIds.length === 0) {
      return [];
    }

    try {
      await Promise.all(
        selectedUsersIds.map((id) =>
          fetch(`https://dummyjson.com/users/${id}`, {
            method: 'DELETE',
          }).then((res) => {
            return res.json();
          })
        )
      );
      return selectedUsersIds;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Unknown network error';
      return rejectWithValue(message);
    }
  }
);
