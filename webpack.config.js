const path = require('path');

module.exports = {
	entry: ['babel-polyfill', './app.js'],
	output: {
		filename: 'bundle.js',
		path: '/users/hunterw/sites/omv.imac/react/newheritage/'
		},
	module : {
		rules: [
			{
				test : /\.js$/,
				exclude : /node_modules/,
				use : [
					'react-hot-loader',
					'babel-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader', {
						loader: 'css-loader',
						options : {
							importLoaders: 1
						}
					},
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.png$/,
				use: [
					'url-loader',
					'img-loader'
				]
			},
			{
				test: /\.jpg$/,
				use: [
					'url-loader',
					'img-loader'
				]
			},
			{
				test: /\.svg$/,
				use: [
					'url-loader',
					'img-loader'
				]
			},
			{
				test: /\.gif$/,
				use: [
					'url-loader',
					'img-loader'
				]
			},
			{
				test: /\.modernizrrc.js$/,
				use: [
					'modernizr-loader'
				]
				
      		},
	  		{
	  			test: /\.modernizrrc(\.json)?$/,
	  			use: [
	  			'modernizr-loader',
	  			'json-loader'
	  			]
	  		}
		]
	},
	resolve: {
    	alias: {
			modernizr$: path.resolve(__dirname, "/users/hunterw/sites/omv.imac/react/newheritage/.modernizrrc")
	    }
  	}
}