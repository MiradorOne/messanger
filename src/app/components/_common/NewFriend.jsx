import React from 'react';

const NewFriend = ({firstName, id, lastName, startConversation, email}) => {
	return (
		<div className="New-Friend">
		<div className="position-align">
		  <div className="user-list-image"></div>
			<div className="fisrtName">{firstName}</div>
			<div className="SecondName">{lastName}</div>
			<div className="email">{email}</div>
		</div>
			<div className="StartConversation" onClick={startConversation.bind(this,{
				firstName,
				lastName,
				email,
				id
			})}>
			<div className="user-list-button-position">
		      <div className="user-list-button">Add</div>
		    </div>
			</div>

</div>
	);
};

export default NewFriend;
