import React, {PropTypes, Component} from 'react';
import CanvasElement from '../CanvasElement/CanvasElement';
import canvasHelpers from '../CanvasElement/canvasHelpers';

export default class Modal extends Component {
	
	constructor(props){
		super(props)
		
		this.state = {
			canvas : {
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
							
							console.log()
							img.onload = () => {
								if(this.props.displayMode === 'mobile') {
									context.drawImage(img,0,0,sizedWidth, sizedHeight)
								} else {
									canvasHelpers.drawImageProp(context,img,-props.canvasAttributes.left,-props.canvasAttributes.top,window.innerWidth,window.innerHeight);	
								}
								
							}
							
							img.src = props.canvasAttributes.src.url;
							
						}
					}
				}
			}
		}
	
		
	}

	assignCanvasDimensions(modalData, mode) {
		
		if(mode === 'mobile'){
			let width = window.innerWidth - (modalData.position.left * 2);
			let dimensions = canvasHelpers.readFilename(modalData.data.image)
			this.state.canvas.attributes.width = width;
			this.state.canvas.attributes.height = Math.floor(width * (dimensions.height / dimensions.width ));
			this.state.canvas.attributes.left = 0; 
			this.state.canvas.attributes.top = 0 ;
		} else {
			this.state.canvas.attributes.width = window.innerWidth - (modalData.position.left * 2);
			this.state.canvas.attributes.height = window.innerHeight - modalData.position.top;
			this.state.canvas.attributes.left =	modalData.position.left; 
			this.state.canvas.attributes.top = modalData.position.top;
		}
		
		this.setState(this.state);
			
	}
	
	componentWillMount(){
		this.assignCanvasDimensions(this.props.modalData, this.props.displayMode)
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
		
		return (
			
			<div id="modal" className={this.props.displayMode} tabIndex="0" style={style.modal.applyStyle(this.props.displayMode)}>
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