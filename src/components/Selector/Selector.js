import React, {Component, PropTypes}  from 'react';
import SelectorItem from './SelectorItem';
import DragScroll from '../ui/DragScroll';

export default class Selector extends Component {
	
	constructor(props){
		
		super(props)
		
		this.state = {
			width : 0,
			height : 0
		}
		
		this.mount = {
			stateDefaults: (properties) => {
				this.setState({ 
					width : properties.selectorWidth,
					height : properties.displayMode === 'mobile' ? 185 : window.innerHeight
				})
			}
		}
		this.handlers = {
			windowResize: () => {
			if(props.modalState === true)
				props.selectorDisableModal()
			}
		}
		this.methods = {
			Selector : {
				loadModal: (e,optionIndex) => {
					const modalData = props.selectorData[optionIndex];
					this.props.selectorItemLoadModal(modalData);
				}
			}
		}
	}
	
	componentWillMount(){
		this.mount.stateDefaults(this.props);
	}
	
	componentWillReceiveProps(nextProps){
		if(this.props.selectorWidth !== nextProps.selectorWidth) 
			this.mount.stateDefaults(nextProps);
	}
	
	componentDidMount(){
		window.addEventListener('resize', this.handlers.windowResize);
	}
	
	componentWillUnmount(){
		window.removeEventListener('resize', this.handlers.windowResize);
	}
	
	render() {
		
		const style = {
			selector : {
				width : this.state.width,
				height : this.state.height,
				visibility: this.props.modalState ? 'hidden' : 'visible'
			}
		}
		
		return (
			<DragScroll wrapperClass="sidebar" scrollAxis={this.props.displayMode === 'desktop' ? 'y' : 'x'}>
			<div id="selector" tabIndex="0" style={style.selector} >
					<div className="wrapper">
					{this.props.selectorData.map((option, index)=> {
						var that = this;
						return (
							<SelectorItem key={'canvas-'+index} itemIndex={index} itemData={option}  
							displayMode= {that.props.displayMode}
							selectorDims={ { width : this.state.width, height : this.state.height} }
							loadModal={this.methods.Selector.loadModal}
							/>
						)
						})}
					</div>
			</div>
			</DragScroll>
		)
	}
}

Selector.propTypes = {
	selectorItemLoadModal : PropTypes.func.isRequired,
	selectorDisableModal : PropTypes.func.isRequired
}