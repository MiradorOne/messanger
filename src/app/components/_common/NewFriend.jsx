import React from 'react';

const NewFriend = ({firstName, id, lastName, startConversation, email}) => {
	return (
		<div className="New-Friend">
			<div className="info">
				<div className="first-name">{firstName}</div>
				<div className="second-name">{lastName}</div>
				<div className="email">{email}</div>
			</div>
			<div className="StartConversation" onClick={startConversation.bind(this,{
				firstName,
				lastName,
				email,
				id
			})}> Start <span>&#8594;</span></div>

		</div>
	);
};

export default NewFriend;
