import React from 'react';

const NewFriend = ({firstName, id, lastName, startConversation, email}) => {
	return (
		<div className="New-Friend">
			<div className="fisrtName">{firstName}</div>
			<div className="SecondName">{lastName}</div>
			<div className="email">{email}</div>
			<hr></hr>
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
