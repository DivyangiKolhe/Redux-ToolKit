import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// create action
export const createUser = createAsyncThunk(
  'createUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://66f6f21eb5d85f31a341a161.mockapi.io/crud',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

// read action
export const showUser = createAsyncThunk(
  'showUser',
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://66f6f21eb5d85f31a341a161.mockapi.io/crud'
      );

      if (!response.ok) {
        throw new Error('Users not found');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

// delete action
export const deleteUser = createAsyncThunk(
  'deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://66f6f21eb5d85f31a341a161.mockapi.io/crud/${id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

// update action
export const updateUser = createAsyncThunk(
  'updateUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://66f6f21eb5d85f31a341a161.mockapi.io/crud/${data.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const userDetail = createSlice({
  name: 'userDetail',
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: [],
  },

  reducers: {
    searchUser: (state, action) => {
      console.log(action.payload);
      state.searchData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (id) {
          state.users = state.users.filter((ele) => ele.id !== id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export default userDetail.reducer;

export const { searchUser } = userDetail.actions;
