exports.drawImageProp = function (ctx, img, x, y, w, h, offsetX, offsetY) {	
   
    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill    
    if (nw < w) ar = w / nw;
    if (nh < h) ar = h / nh;
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;
	
    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
     
}

exports.grayscaleImg = function (ctx, width, height) {
    
    var imgData = ctx.getImageData(0, 0, width, height);
	var data = imgData.data;
        
    for (var i = 0; i < data.length; i += 4) {
          
	    var value = data[i] * .3 + data[i+1] * .59 + data[i+2] * .11;
			  	
		data[i] = value;        // red
		data[i+1] = value;      // green
		data[i+2] = value;       // blue
    }
        
    ctx.putImageData(imgData, 0, 0);
}

exports.tintImage = function(ctx, width, height, R, G, B) { 
  
  var imgData = ctx.getImageData(0, 0, width, height);
  var data = imgData.data;
   
   for (var i = 0; i < data.length; i += 4) {
    data[i    ] = R * data[i    ] / 255;
    data[i + 1] = G * data[i + 1] / 255;
    data[i + 2] = B * data[i + 2] / 255;
  	}  
            
   ctx.putImageData(imgData, 0, 0);
}

/*
exports.canvasClone = function(canvas) {		
	var colCanvas = document.createElement('canvas');
	var colContext = colCanvas.getContext('2d');
	colCanvas.id = canvas.id + '-color';
	colCanvas.className = 'canvas-color';
	colCanvas.width = canvas.width;
	colCanvas.height = canvas.height;
	colContext.drawImage(canvas, 0, 0, canvas.width, canvas.height  );
	
	return colCanvas;
}
*/
	
exports.readFilename = function (imagepath){
		
	//get image dimensions from filename; example 1000x669.jpg
	let delimeters = imagepath.split('/')
	let filename = delimeters[4];
	let src_width = Number( filename.substring(0, filename.indexOf("x") ) );
	let src_height = Number( filename.substring(filename.indexOf("x") + 1, filename.indexOf(".jpg")) );
	
	return { width: src_width, height : src_height };
}	
	
	
/*
exports.canvasDimension = function (src_dimensions, mode, calc_value){
	// src_dimensions: array [0]width [1]height of source image
	// mode: string to determine what to calculate ('width' || 'height')
	// calc_value: number to use for calculation (width || height)
	
	var perc;
	
	switch(mode){
			
		case 'height' :
			//calculate height;
			perc = calc_value / src_dimensions.width;
			return Math.floor(perc * src_dimensions.height);
			break;
		case 'width' :
			//calculate width;
			perc = calc_value / src_dimensions.height;
			return Math.floor(perc * src_dimensions.width);
			break;
		default :
			return 300;
			break;
		}
}
*/
