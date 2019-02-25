const PATH = {
  IMAGE: "files/pictures/",
  DB_IMAGE: "files/db/picture.json",
  DB_CATEGORY: "files/db/category.json"
};


class Event {
  constructor() {
    this._listeners = [];
  }
  addListener(listener) {
    this._listeners.push(listener);
  }
  callListener(args) {
    this._listeners.forEach(listener => {
      listener(args);
    })
  }
}
