import React, {Component, PropTypes} from 'react';
import Selector from '../Selector/Selector';

export default class Main extends Component {
	
	
	constructor(props) {
		super(props)
		this.state = {width : 0}
	}
	
	componentDidMount(){
		this.setState({width : this.refs.main.clientWidth});
	}
	
	componentWillReceiveProps(){
		if(this.state.width !== this.refs.main.clientWidth) 
			this.setState({width : this.refs.main.clientWidth})
	}
	
	render() {
		return (
			<main ref="main">
				{this.props.currentPage !== 'contact' && this.props.displayMode === 'mobile' && this.state.width &&
					<Selector 
					displayMode={this.props.displayMode}
					key={this.props.currentPage} 
					selectorData={this.props.componentData[this.props.currentPage]}
					modalState={this.props.modalState}
					selectorItemLoadModal={this.props.selectorSelectorItemLoadModal}
					selectorDisableModal={this.props.selectorSelectorDisableModal}
					selectorWidth={this.state.width}
					/>
				}
				<div className="wrapper" ref="mainWrapper">
					{this.props.children}
				</div>
			</main>
		)
	}
	
}

Main.propTypes = {
	selectorSelectorItemLoadModal : PropTypes.func.isRequired,
	selectorSelectorDisableModal : PropTypes.func.isRequired
}