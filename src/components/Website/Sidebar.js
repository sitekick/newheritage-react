import React, {Component, PropTypes} from 'react';
import Selector from '../Selector/Selector';

export default class Sidebar extends Component {
	
	constructor(props) {
		super(props)
		
		this.state = {width : 0}
	}
	
	componentDidMount(){
		this.setState({ width : this.refs.sidebar.clientWidth });
	}
	
	componentWillReceiveProps(){
		if(this.state.width !== this.refs.sidebar.clientWidth) 
			this.setState({ width : this.refs.sidebar.clientWidth });
	}
	
	render(){
		
		return (
			
			<div id="sidebar" ref="sidebar">
				
				{this.props.currentPage !== 'contact' && this.props.displayMode === 'desktop' && this.state.width &&  
				
				<Selector displayMode={this.props.displayMode} key={this.props.currentPage} selectorData={this.props.componentData[this.props.currentPage]} modalState={this.props.modalState} selectorWidth={this.state.width} selectorItemLoadModal={this.props.selectorSelectorItemLoadModal} selectorDisableModal={this.props.selectorSelectorDisableModal} />
				
				}
			
			</div>
		)
	}
		
}

Sidebar.propTypes = {
	selectorSelectorItemLoadModal : PropTypes.func.isRequired,
	selectorSelectorDisableModal : PropTypes.func.isRequired
}