import React, {PropTypes, Component} from 'react';
import CanvasElement from '../CanvasElement/CanvasElement';
import canvasHelpers from '../CanvasElement/canvasHelpers';
import update from 'immutability-helper'

var classNames = require('classnames');

export default class Modal extends Component {
	
	constructor(props){
		super(props)
		
		this.state = {
			canvas : {
				preloader : true,
				attributes : {
					width : 0,
					height : 0,
					left : 0,
					top : 0,
					src : {
						width : props.modalData.dimensions.width,
						height : props.modalData.dimensions.height,
						url : props.modalData.data.image,
						draw: (refs, props) => {
							let canvasElement = refs[props.canvasId];
							let context = canvasElement.getContext('2d');
							let img = new Image();
							let sizedWidth = canvasElement.width = props.canvasAttributes.width
							let sizedHeight = canvasElement.height = props.canvasAttributes.height
							
							img.onload = () => {
								if(this.props.displayMode === 'mobile') {
									context.drawImage(img,0,0,sizedWidth, sizedHeight)
								} else {
									canvasHelpers.drawImageProp(context,img,-props.canvasAttributes.left,-props.canvasAttributes.top,window.innerWidth,window.innerHeight);	
								}
								
								//change preloader state
								let delta = update(this.state, { canvas : { preloader : { $set : false } } })
								this.setState(delta)
							}
							
							img.src = props.canvasAttributes.src.url;
							
						}
					}
				}
			}
		}
		this.mount = {
			stateDefaults : () => {
				
				const canvasAttributes = this.helpers.getAttributes.canvas()
				
				let delta = update(this.state, {
					canvas : {
						attributes : {
							width : { $set : canvasAttributes.width },
							height : { $set : canvasAttributes.height },
							left : { $set : canvasAttributes.left },
							top : { $set : canvasAttributes.top }
						}
					}
				})
				
				this.setState(delta);
			}
		}
		this.helpers = {
			getAttributes : {
					canvas : () => {
						if(props.displayMode === 'mobile'){
						
						const dimensions = canvasHelpers.readFilename(props.modalData.data.image)
						
						return {
							width : props.modalData.dimensions.width,
							height : Math.floor(props.modalData.dimensions.width * (dimensions.height / dimensions.width )),
							left : 0, 
							top : 0 
						}
					
					} else {
						
						return {
							width : props.modalData.dimensions.width,
							height : window.innerHeight - props.modalData.position.top,
							left :	props.modalData.position.left, 
							top : props.modalData.position.top
						}
					
					}
				}
			}
		}
		
	}

	componentWillMount(){
		this.mount.stateDefaults();
	}
	
	render() {
		
		const style = {
			modal : {
				default : {
					top : this.props.modalData.position.top,
					left : this.props.modalData.position.left,
					width : this.props.modalData.dimensions.width
				},
				desktop : {
					height : this.props.modalData.dimensions.height
				},
				mobile : {
					height : this.props.modalData.dimensions.height - this.props.modalData.position.left
				},
				applyStyle(mode){
					return Object.assign({},this.default,this[mode])
				}
			},
			
		}
		
		const modalClass = classNames(
			{ mobile :  this.props.displayMode == 'mobile'},
			{ desktop :  this.props.displayMode == 'desktop'},
			{ preloader :  this.state.canvas.preloader == true}
		)
			
		return (
			
			<div id="modal" className={modalClass} tabIndex="0" style={style.modal.applyStyle(this.props.displayMode)}>
				<div className="wrapper">
					
					<CanvasElement canvasId="vignette" canvasRef="vignette" canvasAttributes={this.state.canvas.attributes}  />
					
					<div className="controls" tabIndex="-1" role="button" aria-label="Close">
						<div className="icon" onClick={this.props.closeModal}></div>
					</div>
					<div className={`info quadrant-${this.props.modalData.data.text.quadrant} ${this.props.modalData.data.text.color}`}>
						<section>
							<h2>{this.props.modalData.data.name}</h2>
							<h3>{this.props.modalData.data.title}</h3>
							<p>{this.props.modalData.data.summary}</p>
						</section>
					</div>
				</div>
			</div>
		)
	}
}

Modal.propTypes = {
	closeModal : PropTypes.func.isRequired
}