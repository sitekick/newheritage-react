import React, {Component, PropTypes} from 'react';

export default class CanvasElement extends Component {
	
	
	componentDidMount(){
 		this.props.canvasAttributes.src.draw(this.refs, this.props);
	}
	
	componentDidUpdate(){
		this.props.canvasAttributes.src.draw(this.refs, this.props);
	}
	
	shouldComponentUpdate(nextProps, nextState){
		if(nextProps.canvasAttributes.width !== this.props.canvasAttributes.width)
			return true;
			
		return false;
	}
	
	render(){
		
		const style = {
			canvas : {
				width : this.props.canvasAttributes.width,
				height : this.props.canvasAttributes.height
			}
		}
		
		return <canvas className={this.props.canvasClass} id={this.props.canvasId} ref={this.props.canvasId} style={style.canvas}>Canvas not supported</canvas>
		
		
	}
	
}

CanvasElement.propTypes = {
	renderCallback : PropTypes.func
}