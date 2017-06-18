import React from 'react';

const NewFriend = ({firstName, lastName, email}) => {
	return (
		<div className="New-Friend">
			<div className="fisrtName">{firstName}</div>
			<div className="SecondName">{lastName}</div>
			<div className="email">{email}</div>
			<hr></hr>
			<div className="StartConversation"> Start <span>&#8594;</span></div>

</div>
	);
};

export default NewFriend;
