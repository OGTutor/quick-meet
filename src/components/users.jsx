import React, { useState } from 'react';
import api from '../api';

const Users = () => {
	const [users, setUsers] = useState(api.users.fetchAll());
	let [numberOfUsers, setNumberOfUsers] = useState(users.length);

	const handleDelete = userId => {
		setUsers(users.filter(user => user._id !== userId));
	};
	const renderPhrase = number => {
		const lastOne = Number(number.toString().slice(-1));
		if (number > 4 && number < 15) return 'people hang';
		if ([2, 3, 4].indexOf(lastOne) >= 0) return 'people are hanging';
		if (lastOne === 1) return 'person hangs';
	};

	return (
		<>
			<h2>
				<span
					className={'badge bg-' + (users.length > 0 ? 'primary' : 'danger')}
				>
					{users.length > 0
						? `${users.length} ${renderPhrase(
								users.length
						  )} out with you today!`
						: 'Nobody hangs out with you!'}
				</span>
			</h2>
			{users.length > 0 && (
				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>Name</th>
							<th scope='col'>Qualities</th>
							<th scope='col'>Job</th>
							<th scope='col'>Meets, times</th>
							<th scope='col'>Rating</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr key={user.id}>
								<td>{user.name}</td>
								<td>
									{user.qualities.map(qualitie => (
										<span
											className={'badge m-1 bg-' + qualitie.color}
											key={qualitie._id}
										>
											{qualitie.name}
										</span>
									))}
								</td>
								<td>{user.profession.name}</td>
								<td>{user.completedMeetings}</td>
								<td>{user.rate}/5</td>
								<td>
									<button
										className={'btn btn-outline-danger'}
										onClick={() => handleDelete(user._id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

export default Users;
