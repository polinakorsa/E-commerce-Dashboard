import { createSlice } from '@reduxjs/toolkit';
import {
  createUserThunk,
  editUserThunk,
  deleteUserThunk,
  deleteAllUsersThunk,
} from './thunkUsers';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  username: string;
}

interface UsersState {
  data: User[];
  activeUser: User | null;
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  selectedUsers: number[];
}

const initialState: UsersState = {
  data: [],
  activeUser: null,
  loading: false,
  error: null,
  isModalOpen: false,
  selectedUsers: [],
};

export const usersSlice = createSlice({
  name: 'usersSliceName',
  initialState,
  reducers: {
    getUsersLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    getUsersSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },

    getUsersError: (state, action) => {
      state.error = action.payload ?? null;
      state.loading = false;
    },

    toggleModalVisibility: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },

    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },

    selectUser: (state, action) => {
      const id = action.payload;
      if (state.selectedUsers.includes(id)) {
        state.selectedUsers = state.selectedUsers.filter(
          (selectedId) => selectedId !== id
        );
      } else {
        state.selectedUsers = [...state.selectedUsers, id];
      }
    },

    selectAllUsers: (state) => {
      if (state.selectedUsers.length === state.data.length) {
        state.selectedUsers = [];
      } else {
        state.selectedUsers = state.data.map((user) => user.id);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })

      .addCase(editUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserThunk.fulfilled, (state, action) => {
        state.data = state.data.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
        state.loading = false;
      })
      .addCase(editUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })

      .addCase(deleteUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.data = state.data.filter((user) => user.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })

      .addCase(deleteAllUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllUsersThunk.fulfilled, (state, action) => {
        const ids = action.payload;
        state.data = state.data.filter((user) => !ids.includes(user.id));
        state.selectedUsers = [];
        state.loading = false;
      })
      .addCase(deleteAllUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

export const {
  getUsersLoading,
  getUsersSuccess,
  getUsersError,
  toggleModalVisibility,
  setActiveUser,
  selectUser,
  selectAllUsers,
} = usersSlice.actions;

export default usersSlice.reducer;
