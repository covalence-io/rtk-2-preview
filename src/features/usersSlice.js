import { buildCreateSlice, asyncThunkCreator, nanoid } from '@reduxjs/toolkit';

const createSliceWithThunks = buildCreateSlice({
	creators: {
		asyncThunk: asyncThunkCreator
	}
});

const usersSlice = createSliceWithThunks({
	name: 'users',
	initialState: {
		loading: false,
		users: [],
		error: null
	},
	reducers: create => ({
		deleteUser: create.reducer((state, action) => {
			state.users = state.users.filter(user => user.id !== action.payload);
		}),
		addUser: create.preparedReducer(
			user => {
				const newUser = { id: nanoid(), ...user };
				return { payload: newUser };
			},
			(state, action) => {
				state.users.push(action.payload);
			}
		),
		fetchUsers: create.asyncThunk(
			async (_, thunkApi) => {
				const response = await fetch('https://jsonplaceholder.typicode.com/users');
				return await response.json();
			},
			{
				pending: state => {
					state.loading = true;
				},
				rejected: (state, action) => {
					state.error = action.error;
					state.loading = false;
				},
				fulfilled: (state, action) => {
					state.users = action.payload;
				}
			}
		)
	}),
	selectors: {
		getUsers: state => state.users
	}
	// reducers: {
	// 	deleteUser: (state, action) => {
	// 		state.users = state.users.filter(user => user.id !== action.payload);
	// 	},
	// 	addUser: (state, action) => {
	// 		const newUser = { id: nanoid(), ...action.payload };
	// 		state.users.push(newUser);
	// 	}
	// },
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
	// extraReducers: builder => {
	// 	builder
	// 		.addCase(fetchUsers.pending, state => {
	// 			state.loading = true;
	// 		})
	// 		.addCase(fetchUsers.rejected, (state, action) => {
	// 			state.error = action.error;
	// 		})
	// 		.addCase(fetchUsers.fulfilled, (state, action) => {
	// 			state.users = action.payload;
	// 		});
	// }
});

export const { addUser, deleteUser, fetchUsers } = usersSlice.actions;
export const { getUsers } = usersSlice.selectors;
export default usersSlice.reducer;
