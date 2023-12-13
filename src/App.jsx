import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, fetchUsers, getUsers } from './features/usersSlice';

function Users() {
	const [newUserName, setNewUserName] = useState('');
	const users = useSelector(getUsers);
	const dispatch = useDispatch();

	const handleAddUser = () => {
		if (newUserName) {
			dispatch(addUser({ name: newUserName }));
			setNewUserName('');
		}
	};

	const handleDeleteUser = userId => {
		dispatch(deleteUser(userId));
	};

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	return (
		<div className="container mt-3">
			<h2 className="mb-3">Users</h2>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="New user name"
					value={newUserName}
					onChange={e => setNewUserName(e.target.value)}
				/>
				<div className="input-group-append">
					<button className="btn btn-outline-secondary" onClick={handleAddUser}>
						Add User
					</button>
				</div>
			</div>

			<ul className="list-group">
				{users.map(user => (
					<li
						key={user.id}
						className="list-group-item d-flex justify-content-between align-items-center">
						<span>{user.name}</span>
						<button
							className="btn btn-danger btn-sm float-right"
							onClick={() => handleDeleteUser(user.id)}>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Users;
