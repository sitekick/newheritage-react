import React, {Component} from 'react';
import { Router, Route, browserHistory} from 'react-router';
//Containers
import Website from '../containers/Website';
//Components
import Projects from './Website/content/Projects';
import People from './Website/content/People';
import Contact from './Website/content/Contact';
import NotFound from './Website/content/NotFound';

export default class Routes extends Component {
	
	constructor(props) {
		super(props)
		
		this.state = {
			appData : props.appData
			}
	}
	
	componentWillReceiveProps(nextProps){
		
		if( JSON.stringify(this.props.appData) !== JSON.stringify(nextProps.appData) ) {
			this.setState({appData : nextProps.appData})
			console.log('Routes:componentWillReceiveProps')
		}
			
	}
	
	render() {
		
		return (
			
			<Router history={browserHistory} >
				<Route component={Website} appData={this.state.appData}>
					<Router path="/" component={Projects}  />
					<Router path="people" component={People}  />
					<Router path="contact" component={Contact}  />
					<Router path="*" component={NotFound}  />
				</Route>
			</Router>
			
		)
	}
};