import React, { useState } from 'react';
import Users from './components/users';
import SearchStatus from './components/searchStatus';
import api from './api';

const App = () => {
	const [users, setUsers] = useState(api.users.fetchAll());

	const handleDelete = userId => {
		setUsers(users.filter(user => user._id !== userId));
	};
	const handleToggleBookMark = id => {
		setUsers(
			users.map(user => {
				if (user._id === id) {
					return { ...user, bookmark: !user.bookmark };
				}
				return user;
			})
		);
	};

	return (
		<div>
			<SearchStatus length={users.length} />
			<Users
				onDelete={handleDelete}
				onToggleBookMark={handleToggleBookMark}
				users={users}
			/>
		</div>
	);
};

export default App;
