import React, {Component, PropTypes}  from 'react';
import SelectorItem from './SelectorItem';
import DragScroll from '../ui/DragScroll';

export default class Selector extends Component {
	
	constructor(props){
		
		super(props)
		
		this.state = {
			dims : this.computeDimensions(props)
		}
		
		this.loadModal = this.loadModal.bind(this);
		this.handleResize = this.handleResize.bind(this);
		
		
	}
	
	componentWillReceiveProps(nextProps){
		
		if(this.props.selectorWidth !== nextProps.selectorWidth) {
			this.state.dims = this.computeDimensions(nextProps);
			this.setState(this.state)
		}
	}
	
	componentDidMount(){
		window.addEventListener('resize', this.handleResize);
	}
	
	componentWillUnmount(){
		window.removeEventListener('resize', this.handleResize);
	}
	
	handleResize(){
		if(this.props.modalState === true)
			this.props.selectorDisableModal()
	}
	
	loadModal(e, optionIndex){
		let modalData = this.props.selectorData[optionIndex];
		this.props.selectorItemLoadModal(modalData);
	}
	
	computeDimensions(props){
		
		let computedWidth, computedHeight;
		
		if(props.displayMode === 'mobile') {
			computedWidth = window.innerWidth;
			computedHeight = 185;
		} else {
			computedWidth = props.selectorWidth;
			computedHeight = window.innerHeight;
		}
		return {width : computedWidth, height : computedHeight};
	}
	
	render() {
		
		const style = {
			selector : {
				width : this.state.dims.width,
				height : this.state.dims.height,
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
							selectorDims={this.state.dims}
							loadModal={this.loadModal}
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