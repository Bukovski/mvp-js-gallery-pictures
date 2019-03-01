class Event {
  constructor(name) {
    this.name = name;
    this.callbacks = [];
  }
  
  registerCallback(callback) {
    this.callbacks.push(callback);
  };
}

class EventReacts {
  constructor() {
    this.events = {};
  }

  registerListener(eventName) {
    this.events[eventName] = new Event(eventName);
  }
  
  addListener(eventName, callback) {
    this.events[eventName].registerCallback(callback);
  }
  
  runListener(eventName, eventArgs) {
    this.events[eventName].callbacks.forEach(function(callback) {
      callback(eventArgs);
    });
  }
}

const customEvents = new EventReacts();
