import React from 'react';

const NewFriend = ({firstName, lastName, email}) => {
	return (
		<div className="New-Friend">
			<span>{firstName}</span>
			<span>{lastName}</span>
			<span>{email}</span>
		</div>
	);
};

export default NewFriend;