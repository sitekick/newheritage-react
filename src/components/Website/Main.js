import React, {Component, PropTypes} from 'react';
import Selector from '../Selector/Selector';

export default class Main extends Component {
	
	render() {
		return (
			<main>
				{this.props.currentPage !== 'contact' && this.props.displayMode === 'mobile' &&
					<Selector 
					displayMode={this.props.displayMode}
					key={this.props.currentPage} 
					selectorData={this.props.componentData[this.props.currentPage]}
					modalState={this.props.modalState}
					selectorItemLoadModal={this.props.selectorSelectorItemLoadModal}
					selectorDisableModal={this.props.selectorSelectorDisableModal}
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