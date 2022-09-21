import React from 'react';
import User from './user';

const Users = ({ users, ...rest }) => {
	return (
		<>
			{users.length > 0 && (
				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>Name</th>
							<th scope='col'>Qualities</th>
							<th scope='col'>Job</th>
							<th scope='col'>Meets, times</th>
							<th scope='col'>Rating</th>
							<th scope='col'>Favorite</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<User key={user._id} {...rest} {...user} />
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

export default Users;
