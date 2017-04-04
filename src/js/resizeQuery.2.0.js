import Modernizr from 'modernizr';

var resizeQuery = (function () {
	
		var mQueries,
			currentMQ;
		
		var monitorMQ = function (eventsobj, init) {
			
			mQueries = _defineQueries(eventsobj);
			currentMQ = _idQuery();
			
			//stores active media query to compare against when resizing
			var tmpMQ = currentMQ;
			//for initial size flag
			if(init === true){
				_fireCallback(eventsobj,currentMQ);
			}
			
			window.onresize = function() {
				var newMQ = _idQuery();
			
				if(newMQ != tmpMQ){
					_fireCallback(eventsobj,newMQ);
					
					if(eventsobj['(any)']){
						_fireCallback(eventsobj,'(any)');
					}
					
					tmpMQ = newMQ;
				};
			};

		} //monitorMQ;
		
		function _defineQueries(events) {
			// create an array containing queries present in the events object; remove 'any' key if present
			function removeAny(str) {
				return str != '(any)';
			}
			
			var queries = Object.keys(events).filter(removeAny) || [];
			
			return queries;
		}

		function _idQuery() {
			// return active media query; if found
			
			var active = currentMQ || '';
			
			for (var i=0 ;i < mQueries.length; i++) {
				
				if(Modernizr.mq(mQueries[i]) === true){
					active = mQueries[i];
					break;
				}
				
			}
			
			return active;
		}
		
		function _fireCallback(events,index) {

			return typeof(events[index]) === 'function' && events[index]();
				
		}
		
		return monitorMQ; 
	
})();

export default resizeQuery;