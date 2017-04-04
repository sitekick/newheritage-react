import React, {PropTypes} from 'react';
import NavLink from './NavLink';

const MainMenu = props => {
	
	return (
		<nav>
			<div className="wrapper" style={{display : props.modalState ? 'none' : 'block'}}>
				<ul id="nav" tabIndex="0" onClick={props.mainMenuOnClick}>
					<li><NavLink id="projects" to="/" tabIndex="-1">Structures</NavLink></li>
					<li><NavLink id="people" to="people" tabIndex="-1">People</NavLink></li>
					<li><NavLink id="contact" to="contact" tabIndex="-1">Contact</NavLink></li>
				</ul>
			</div>
		</nav>
	)
	
}

MainMenu.propTypes = {
	mainMenuOnClick : PropTypes.func.isRequired	
}

export default MainMenu;

