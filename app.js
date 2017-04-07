import React from 'react';
import {render} from 'react-dom';
import Routes from './src/components/Routes';
import axios from 'axios';
import 'babel-polyfill';

require("./src/scss/style.scss");

axios.get('./src/data/newHeritage.json')
.then( response => {
	render(<Routes appData={response.data} />, document.getElementById('app'))
})

/*
.catch( error => {
	render(<p>Could not load data</p>, document.getElementById('app'))
});
*/








