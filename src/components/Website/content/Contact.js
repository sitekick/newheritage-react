import React, {PropTypes} from 'react';

const Contact = props => {
	
	return (
					
		<div className="content contact">
			<p>Please complete all fields below to contact New Heritage Realty by email.</p>

			<form method="POST" action="">
				<p><label htmlFor="name">Name</label>
				<input type="text" id="name" maxLength="50" required /></p>
				<p><label htmlFor="phone">Phone</label>
				<input type="tel" id="phone" maxLength="20" required /></p>
				<p><label htmlFor="email">Email</label>
				<input type="email" id="email" maxLength="50" required /></p>
				<p><label htmlFor="comment">Comment</label>
				<textarea id="comment" maxLength="250" rows="5" required></textarea></p>
				<p><label htmlFor="submit">Submit</label>
				<input type="submit" value="Send" /></p>
			</form>

		</div>	
		
	)
}

export default Contact;