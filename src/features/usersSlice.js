import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkApi) => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	return await response.json();
});

const usersSlice = createSlice({
	name: 'users',
	initialState: {
		loading: false,
		users: [],
		error: null
	},
	reducers: {
		deleteUser: (state, action) => {
			state.users = state.users.filter(user => user.id !== action.payload);
		},
		addUser: (state, action) => {
			const newUser = { id: nanoid(), ...action.payload };
			state.users.push(newUser);
		}
	},
	/* 
	-------
		I don't want to install the older rtk just to use object notation lol 
	-------
	*/
	// extraReducers: {
	//     [fetchUsers.pending]: (state, action) => {
	//         state.loading = true;
	//     },
	//     [fetchUsers.rejected]: (state, action) => {
	//         state.error = action.error;
	//     },
	//     [fetchUsers.fulfilled]: (state, action) => {
	//         state.users = action.payload;
	//     }
	// }
	extraReducers: builder => {
		builder
			.addCase(fetchUsers.pending, state => {
				state.loading = true;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.error = action.error;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.users = action.payload;
			});
	}
});

export const { addUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
