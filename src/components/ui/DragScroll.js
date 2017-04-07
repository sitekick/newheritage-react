import React, {Component} from 'react';
import update from 'immutability-helper'

var classNames = require('classnames');

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
			},
			scrollRef : {}
		}
		
		this.mount = {
			stateDefaults : () => {
				this.setState({ scrollRef : this.refs['dragWrapper'].firstChild})
			}
		}
		this.handlers = {
			mouseUp: e => {
				console.log(this.state.scrolling)
				this.helpers.scrollStop(e);
			},
			mouseDown: e => {
				this.helpers.scrollStart(e);
			},
			mouseMove: e => {
				this.helpers.scrollSet(e);
			}
		}
		this.helpers = {
			scrollStart: e => {
				let delta = update(this.state, {
					scrolling : {
						dragging : { $set : true },
						mouseStart : { $set : (this.state.vertical === false) ? e.clientX : e.clientY },
						objPos : { $set : this.state.scrollRef[this.state.scrollDir] }
					}
				})
				
				this.setState(delta);
			},
			scrollSet: e => {
				let scrollDelta = this.state.scrolling.mouseStart - ((this.state.vertical === false) ? e.clientX : e.clientY)

				if(this.state.scrolling.dragging === true){
					this.state.scrollRef[this.state.scrollDir] = this.state.scrolling.objPos + scrollDelta;
				};
				
				let delta = update(this.state, {
					scrolling : {
						delta : { $set : scrollDelta },
					}
				})
				this.setState(delta);
				
			},
			scrollStop: e => {
				let delta = update(this.state, {
					scrolling : {
						dragging : { $set :  false },
						mouseStart : { $set : this.state.vertical === false ? e.clientX : e.clientY }
					}
				})
				this.setState(delta);
				
				//if scrolled prevent capturing mouseup
				if(this.state.scrolling.objPos != this.state.scrollRef[this.state.scrollDir])
					e.stopPropagation()
				
			}
		}
	}
	
	componentDidMount() {
		this.mount.stateDefaults()
	}
	render() {
		
		const wrapperClass = classNames(
			'drag-wrapper',
			this.props.wrapperClass,
			{dragging : this.state.scrolling.dragging === true}
		)
		
		return (
			<div 
			className={wrapperClass} 
			ref="dragWrapper" 
			onMouseDown={ e => this.handlers.mouseDown(e)}
			onMouseUpCapture={ e => this.handlers.mouseUp(e)}
			onMouseMove={ e => this.handlers.mouseMove(e)}
			>
				{this.props.children}
			</div>
		)
	}
	
}