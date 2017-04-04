import React, {PropTypes, Component } from 'react';
import CanvasElement from '../CanvasElement/CanvasElement';
import canvasHelpers from '../CanvasElement/canvasHelpers';

export default class BackgroundCanvas extends Component {
	
	constructor(props){
		
		super(props)
		
		this.state = {
			canvas : {
				attributes : {
					width : window.innerWidth,
					height : window.innerHeight,
					src : {
						width : 0,
						height : 0,
						url : this.props.srcImage,
						draw: (refs, props) => {
							let canvasElement = refs[props.canvasId];
							let context = canvasElement.getContext('2d');
							let img = new Image();
							let sizedWidth = canvasElement.width = props.canvasAttributes.width
							let sizedHeight = canvasElement.height = props.canvasAttributes.height
							
							img.onload = () => {
								canvasHelpers.drawImageProp(context,img,0,0,sizedWidth,sizedHeight);
							 		canvasHelpers.tintImage(context,sizedWidth,sizedHeight,239,65,54);
							 }
 		
							 img.src = props.canvasAttributes.src.url;
						}
					}
				}
			}
		}
		
	}
	
	assignSourceDimensions(dimensionsObj) {
		
		this.state.canvas.attributes.src.width = dimensionsObj.width;
		this.state.canvas.attributes.src.height = dimensionsObj.height;
		
	}

	assignCanvasDimensions() {
		
		this.state.canvas.attributes.width = window.innerWidth;
		this.state.canvas.attributes.height = window.innerHeight;
				
	}
	
	
	componentWillMount(){
		
		//source
		let sourceDims = canvasHelpers.readFilename(this.props.srcImage);
		this.assignSourceDimensions(sourceDims);
		//canvas
		this.assignCanvasDimensions();
		
		//save
		this.setState(this.state);
		
		
	}
	
	render () {
		return <CanvasElement canvasId="backcanvas" canvasRef="backcanvas" canvasAttributes={this.state.canvas.attributes} renderCallback={this.props.canvasElementRenderCallback}/>
	}
	
}

BackgroundCanvas.propTypes = {
	canvasElementRenderCallback : PropTypes.func.isRequired
}
