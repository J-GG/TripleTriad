var Events = (function() {
	var subscribers = [];

	class Subscriber {
		constructor(object, events) {
			this.object = object;
			this.events = events;
		}
		
		getObject() {
			return this.object;
		}

		getEvents() {
			return this.events;
		}
	}


	return {
		subscribe: function(subscriber, events) {
			if(typeof subscriber !== "object") {
				logger.warning("The subscriber is empty or is not an object. The subscription failed.");
				return;
			}
			if(events === undefined) {
				logger.warning("There is no event object. The subscription failed.");
				return;
			}
			var sub = new Subscriber(subscriber, events);
			subscribers.push(sub);
		},

	    unsubscribe: function(subscriber) {
	        subscribers = subscribers.filter(
	            function(item) {
	                if (item.getObject() !== subscriber) {
	                    return item;
	                }
	            }
	        );
	    },

		notify: function(event, ...args) {
			for(subscriber in subscribers) {
				var object = subscribers[subscriber].getObject();
				var fct = subscribers[subscriber].getEvents()[event];
				if(fct) {
					logger.debug("Transmitted event " + event + " to " + object.constructor.name);
					object[fct](...args);
				}
			}
		}
	}
})();