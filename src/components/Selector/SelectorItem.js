import React, {PropTypes, Component} from 'react'
import CanvasElement from '../CanvasElement/CanvasElement'
import canvasHelpers from '../CanvasElement/canvasHelpers'
import update from 'immutability-helper'

var classNames = require('classnames');

export default class SelectorItem extends Component {
	
	constructor(props){
		
		super(props);
		
		this.state = {
			canvas : {
				preloader : true,
				attributes : {
					width : this.props.selectorDims.width,
					height : 0,
					src : {
						width : 0,
						height : 0,
						url :	this.props.itemData.image,
						draw : (refs, props) => {
							const canvasElement = refs[props.canvasId];
							const context = canvasElement.getContext('2d');
							const img = new Image();
							const sizedWidth = canvasElement.width = props.canvasAttributes.width
							const sizedHeight = canvasElement.height = props.canvasAttributes.height
							
							img.onload = () => {
								context.drawImage(img,0,0,sizedWidth,sizedHeight);
								//clone the canvas with the canvas to retain color data
								this.helpers.cloneCanvas(canvasElement);
								//convert image to grayscale
								canvasHelpers.grayscaleImg(context,sizedWidth,sizedHeight);
								//change preloader state
								const delta = update(this.state, { canvas : { preloader : { $set : false } } })
								this.setState(delta)
							}
			
							img.src = props.canvasAttributes.src.url;
						}
					},
				}
			}
		}
		this.mount = {
			stateDefaults : () => {
				
				const sourceDimensions = this.helpers.getDimensions.source()
				const canvasDimensions = this.helpers.getDimensions.canvas(sourceDimensions, props.selectorDims)
				const delta = update(this.state, {
					canvas : {
						attributes : {
							width : { $set : canvasDimensions.width},
							height : { $set : canvasDimensions.height},
							src : {
								width : { $set : sourceDimensions.width},
								height : { $set : sourceDimensions.height}
							}
						}
					}
				})
				this.setState(delta)
			}
		}
		this.helpers = {
			getDimensions : {
				source: () => {
					
					const sourceDims = canvasHelpers.readFilename(this.props.itemData.image);
					
					return {
						width : sourceDims.width || 0,
						height : sourceDims.height  || 0
					}

				},
				canvas: (dimensionsObj, selectorDims) => {
					
					if(props.displayMode == 'mobile') {
						return {
							width : Math.floor(dimensionsObj.width * (165 / dimensionsObj.height)),
							height : 165 
						}
					
					} else {
						return {
							width : selectorDims.width,
							height : Math.floor(selectorDims.width * (dimensionsObj.height / dimensionsObj.width ))
						}
					}
				}
			},
			updateOption : newSelectorDims => {
			
				const sourceDimensions = {
					width : this.state.canvas.attributes.src.width,
					height : this.state.canvas.attributes.src.height
				}
				const canvasDimensions = this.helpers.getDimensions.canvas(sourceDimensions, newSelectorDims) 
			
				const delta = update(this.state, {
					canvas : {
						attributes : {
							width : { $set : canvasDimensions.width},
							height : { $set : canvasDimensions.height}
						}
					}
				})
				
				this.setState(delta)
			},
			cloneCanvas: canvas => {
				if(!canvas) 
					return false
					
				const colorCanvas = this.refs[`color-${canvas.id}`]
				const colorCanvasContext = colorCanvas.getContext('2d')
				colorCanvasContext.drawImage(canvas,0,0,canvas.width,canvas.height)
			}
		}
	}
	
	componentWillMount(){
		this.mount.stateDefaults();
	}
	
	componentWillReceiveProps(newProps){
		if(newProps.selectorDims.width != this.props.selectorDims.width)
			this.helpers.updateOption(newProps.selectorDims);
	}
	
	render() {
		
		var optionClass = classNames(
			'option',
			{preloader : this.state.canvas.preloader === true}
		);
		
		return (
			<div className={optionClass} tabIndex="-1" role="button" aria-label="View" onMouseUp={(e) => {
				 this.props.loadModal(e, this.props.itemIndex)}
				 }>
				<canvas id={`color-canvas-${this.props.itemIndex}`} className="canvas-color" ref={`color-canvas-${this.props.itemIndex}`} width={this.state.canvas.attributes.width} height={this.state.canvas.attributes.height} />
				<CanvasElement canvasClass="canvas-bw" canvasId={`canvas-${this.props.itemIndex}`} canvasAttributes={this.state.canvas.attributes}
				/>
			</div>
		)
	}
}

SelectorItem.propTypes = {
	loadModal : PropTypes.func.isRequired
}