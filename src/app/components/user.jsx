import React from 'react';
import Qualitie from './qualitie';
import BookMark from './bookmark';

const User = ({
	_id,
	name,
	qualities,
	profession,
	completedMeetings,
	rate,
	onDelete,
	bookmark,
	onToggleBookMark,
}) => {
	return (
		<tr>
			<td>{name}</td>
			<td>
				{qualities.map(qual => (
					<Qualitie key={qual._id} {...qual} />
				))}
			</td>
			<td>{profession.name}</td>
			<td>{completedMeetings}</td>
			<td>{rate}/5</td>
			<td>
				<BookMark status={bookmark} onClick={() => onToggleBookMark(_id)} />
			</td>
			<td>
				<button
					className={'btn btn-outline-danger'}
					onClick={() => onDelete(_id)}
				>
					Delete
				</button>
			</td>
		</tr>
	);
};

export default User;
