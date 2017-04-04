import React, {PropTypes, Component} from 'react';
import MainMenu from '../components/Website/MainMenu/MainMenu';
import Main from '../components/Website/Main';
import Footer from '../components/Website/Footer';
import Sidebar from '../components/Website/Sidebar';
import BackgroundCanvas from '../components/Modal/BackgroundCanvas';
import Modal from '../components/Modal/Modal';
import resizeQuery from '../js/resizeQuery.2.0';
import BodyClass from '../components/BodyClass';
import DragScroll from '../components/ui/DragScroll';
import { Link } from 'react-router';
import update from 'immutability-helper'

export default class Website extends Component {
	
	constructor(props) {
		
		super(props);
		
		this.state = {
			viewport : '',
			currentPage : 'projects',
			appData : props.route.appData,
			modal : {
				state: false,
				data : {},
				canvas : {}
			}
		}
		
		this.handlers = {
			MainMenu : {
				mainMenuOnClick: e => {
		
					const navTags = ['A','IMG']
					if(navTags.indexOf(e.target.tagName) < 0 )
						return
		
					this.setState({
						currentPage : (e.target.tagName === 'IMG') ? 'projects' : e.target.id
					});
				}
			},
			Link : {
				onClick : (e) => {
					this.handlers.MainMenu.mainMenuOnClick(e)
				}
			}
		}
		this.methods = {
			BackgroundCanvas : {
				canvasElementRenderCallback: backCanvas => {
					
					let delta = update(this.state, {
						modal : {
							canvas : { $set : backCanvas}
						}
					})
					this.setState(delta);
				}
			},
			Modal : {
				closeModal : () => {
					
					let delta = update(this.state, {
						modal : {
							state : { $set : false },
							data : { $set : {} },
							canvas : { $set : {} }
						}
					})
					
					this.setState(delta);
				}
			},
			components : {
				loadModal : modalData => {
					
					let pos = {
						top : this.refs.header.clientHeight,
						left : this.refs.main.refs.mainWrapper.offsetLeft
					}
					let dims = {
						width : window.innerWidth - (pos.left * 2),
						height : window.innerHeight - pos.top
					}	
					
					let delta = update(this.state, {
						modal : {
							state : { $set : true },
							data : {
								data : { $set : modalData },
								position: { $set : pos },
								dimensions : { $set : dims }
							}
						}
						})
					this.setState(delta)
				},
				closeModal: () => {
					this.methods.Modal.closeModal()
				}
			}
		}
		this.helpers = {
			initResizeQuery: () => {
				const events = {
					'(max-width: 768px)' : () => { 
							this.setState({viewport : 'mobile'})
					},
					'(max-width: 1024px)' : () => { 
							this.setState({viewport : 'desktop'})
					},
					'(min-width: 1024px) and (max-width: 1324px)' : () => { 
							this.setState({viewport : 'desktop'})
					},
					'(min-width: 1324px)' : () => { 
							this.setState({viewport : 'desktop'})
					}
				};
		
				const viewportObj = resizeQuery(events, true)
			}
		}
	}
	
	componentWillMount() {
		this.helpers.initResizeQuery()
	}
	
	render() {
		
		const style = {
			modal : {
				wrapper : {
					position: "absolute",
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					backgroundColor: "#EF4136"
				}
			}
		}
		
		return (
			<BodyClass sniffUA={true} >
			<div className="wrapper" >
				{this.state.modal.state && 
					<div style={style.modal.wrapper}>
					{this.state.viewport === 'desktop' &&
						<BackgroundCanvas srcImage={this.state.modal.data.data.image} canvasElementRenderCallback={this.methods.BackgroundCanvas.canvasElementRenderCallback} />
					}
					
					<Modal modalData={this.state.modal.data} displayMode={this.state.viewport} closeModal={this.methods.Modal.closeModal} />
					</div>
				}
				
				<div id="content" className={ this.state.modal.state === true ? "modal" : ''}>
					<div className="wrapper" >
						<header ref="header">
							<div className="wrapper">
								<div className="logo">
									<Link to="/" onClick={this.handlers.Link.onClick} >
										<img src="src/img/logo/white.svg" className="autosize svg" alt="new heritage logo" />
									</Link>
								</div>
							</div>
						</header>
						<MainMenu mainMenuOnClick={this.handlers.MainMenu.mainMenuOnClick} modalState={this.state.modal.state} />
						<Main ref="main" children={this.props.children} displayMode={this.state.viewport} modalState={this.state.modal.state} componentData={this.state.appData} currentPage={this.state.currentPage} selectorSelectorItemLoadModal={this.methods.components.loadModal} selectorSelectorDisableModal={this.methods.components.closeModal}
						/>
						<Footer />
					</div>				
				</div>
				<Sidebar displayMode={this.state.viewport} componentData={this.state.appData} modalState={this.state.modal.state} currentPage={this.state.currentPage} selectorSelectorItemLoadModal={this.methods.components.loadModal} selectorSelectorDisableModal={this.methods.components.closeModal}
				/>
				
			</div>
			</BodyClass>
		)
	}
}