import React, {Component} from 'react';
const bowser = require('bowser');

export default class BodyClass extends Component {
	
	constructor(props) {
		
		//console.log('props', props)
		
		super(props);
		
		this.state = {
			bodyClasses : props.addClasses
		}
		
		this.methods = {
			UAClass : () => {
		
				switch(true){
				 
				 case (bowser.name == 'Microsoft Edge'):
				 	this.methods.addUAClass('edge',Math.floor(bowser.version));
				 	break;
				 case (bowser.name == 'Internet Explorer'):
				 	this.methods.addUAClass('ie',Math.floor(bowser.version));
				 	break;
				 case (bowser.name == 'Safari'):
				 	const ver = (bowser.version * 1).toString();
				 	this.methods.addUAClass('sf', ver.replace('.','-') );
				 	break;
				 case (bowser.name == 'Chrome'):
				 	this.methods.addUAClass('ch',Math.floor(bowser.version));
				 	break;
				 case (bowser.name == 'Opera'):
				 	this.methods.addUAClass('op',Math.floor(bowser.version));
				 	break;
				 case (bowser.name == 'Firefox'):
				 	this.methods.addUAClass('ff',Math.floor(bowser.version));
				 	break; 
			    }
			},
			addUAClass: (slug,ver) => {
		
				if(slug !== undefined && ver !== undefined){
					this.helpers.addClass(slug+ver);
				
					this.methods.bodyClassProps();
				}
			},
			bodyClassProps: () => {
		
				if(!this.state.bodyClasses)
					return
				
				let array = this.state.bodyClasses.split(' ');
				
				array.map((bodyClass) => {
					this.helpers.addClass(bodyClass);
				})
		
			}
		}
		this.helpers = {
			el : document.body,
			hasClass : className =>  {
				if (this.helpers.el.classList)
					return this.helpers.el.classList.contains(className)
				else
					return !!this.helpers.el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
			},
			addClass : className => {
				if (this.helpers.el.classList)
					this.helpers.el.classList.add(className)
				else if (!this.hasClass(this.helpers.el, className)) this.helpers.el.className += " " + className
			},
			removeClass : className => {
				if (this.helpers.el.classList)
					this.helpers.el.classList.remove(className)
				else if (this.hasClass(this.helpers.el, className)) {
					var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
					this.helpers.el.className = this.helpers.el.className.replace(reg, ' ')
				}
			}
		}
	}
	
	componentWillReceiveProps(nextProps){
		console.log('next', nextProps.addClasses)
		
		if(nextProps.addClasses != this.state.bodyClasses){
			this.setState({
				bodyClasses : nextProps.addClasses
			})
			console.log('saved state',this.state.bodyClasses)
		}
	}
	
	
	componentWillMount() {

		if(this.props.sniffUA && bowser){
			this.methods.UAClass();
		} else {
			this.methods.bodyClassProps();
		}
		
	}
	
	componentWillUnmount() {
		
		document.body.className = '';

	}
	
	render(){
		
		return this.props.children
		
	}
}