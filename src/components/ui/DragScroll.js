import React, {Component} from 'react';

export default class DragScroll extends Component {
	
	constructor(props) {
		
		super(props)
		
		this.state = {
			vertical : (props.scrollAxis === 'y') ? true : false,
			scrollDir : (props.scrollAxis === 'y') ? 'scrollTop' : 'scrollLeft',
			scrolling : {
				dragging : false,
				delta : undefined,
				mouseStart : undefined,
				objPos : undefined 
			}
		}
	}
	
	_scrollStart(e){
		const scrollObj	 = this.refs['dragWrapper'].firstChild;
		this.state.scrolling.dragging = true;
		this.state.scrolling.mouseStart = (this.state.vertical === false) ? e.clientX : e.clientY;
		this.state.scrolling.objPos = scrollObj[this.state.scrollDir];
		this.setState(this.state);
	};
	
	_scrollSet(e){
		const scrollObj	 = this.refs['dragWrapper'].firstChild;
		this.state.scrolling.delta = this.state.scrolling.mouseStart - ((this.state.vertical === false) ? e.clientX : e.clientY);
		if(this.state.scrolling.dragging === true){
			scrollObj[this.state.scrollDir] = this.state.scrolling.objPos + this.state.scrolling.delta;
		};
		this.setState(this.state);
		
	}
	
	_scrollStop(e) {
		const scrollObj	 = this.refs['dragWrapper'].firstChild;
		this.state.scrolling.dragging = false;
		this.state.scrolling.mouseStart = (this.state.vertical === false) ? e.clientX : e.clientY;
		//check to see if element was scrolled
		if(this.state.scrolling.objPos != scrollObj[this.state.scrollDir]){
				//was scrolled so prevent capturing mouseup
				e.stopPropagation()
			} 
		this.setState(this.state);
	};
	
	_handleMouseUp(e){
		this._scrollStop(e);
	}
	_handleMouseDown(e){
		this._scrollStart(e);
	}
	_handleMouseMove(e){
		this._scrollSet(e);
	}
	
	
	render() {
		
		return (
			<div 
			className={`drag-wrapper ${this.props.wrapperClass}`} 
			ref="dragWrapper" 
			onMouseDown={ e => this._handleMouseDown(e)}
			onMouseUpCapture={ e => this._handleMouseUp(e)}
			onMouseMove={ e => this._handleMouseMove(e)}
			>
				{this.props.children}
			</div>
		)
	}
	
}