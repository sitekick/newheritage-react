import React, {Component} from 'react';
const bowser = require('bowser');

export default class BodyClass extends Component {
	
	constructor(props) {
		
		super(props);
		this._bodyClassMethods = this._bodyClassMethods.bind(this);
		this._bodyClassProps = this._bodyClassProps.bind(this);
	}
	
	
	_UAClass(){
		
		switch(true){
		 
		 case (bowser.name == 'Microsoft Edge'):
		 	this._addUAClass('edge',Math.floor(bowser.version));
		 	break;
		 case (bowser.name == 'Internet Explorer'):
		 	this._addUAClass('ie',Math.floor(bowser.version));
		 	break;
		 case (bowser.name == 'Safari'):
		 	const ver = (bowser.version * 1).toString();
		 	this._addUAClass('sf', ver.replace('.','-') );
		 	break;
		 case (bowser.name == 'Chrome'):
		 	this._addUAClass('ch',Math.floor(bowser.version));
		 	break;
		 case (bowser.name == 'Opera'):
		 	this._addUAClass('op',Math.floor(bowser.version));
		 	break;
		 case (bowser.name == 'Firefox'):
		 	this._addUAClass('ff',Math.floor(bowser.version));
		 	break; 
	    }

	}
	
	_addUAClass(slug,ver){
		
		if(slug !== undefined && ver !== undefined){
			this._bodyClassMethods().addClass(slug+ver);
			this._bodyClassProps();
		}
	}
	
	_bodyClassMethods() {
		 
		let el = document.body;
		
		return {
			hasClass : function (className) {
				if (el.classList)
					return el.classList.contains(className)
				else
					return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
			},
			addClass : function (className) {
				if (el.classList)
					el.classList.add(className)
				else if (!this.hasClass(el, className)) el.className += " " + className
			},
			removeClass : function (className) {
				if (el.classList)
					el.classList.remove(className)
				else if (this.hasClass(el, className)) {
					var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
					el.className=el.className.replace(reg, ' ')
				}
			}
		}
	}
	
	_bodyClassProps() {
		
		if(!this.props.addClasses)
			return
		
		let array = this.props.addClasses.split(' ');
		
		array.map((bodyClass) => {
			this._bodyClassMethods().addClass(bodyClass);
		})
		
	}
	
	componentWillMount() {

		if(this.props.sniffUA && bowser){
			this._UAClass();
		} else {
			this._bodyClassProps();
		}
		
	}
	
	componentWillUnmount() {
		
		document.body.className = '';

	}
	
	render(){
		
		return this.props.children
		
	}
}