const PATH = {
  IMAGE: "files/pictures/",
  DB_IMAGE: "files/db/picture.json",
  DB_CATEGORY: "files/db/category.json"
};

const EVENT = {
  ACTIVE_CLASS_BUTTON_FILTER: "ActiveClassButtonsFilter",
  BUTTONS_SORT_ORDER: "ButtonsSortOrder",
  INPUT_SEARCH_WATCHER: "InputSearchWatcher",
  BUTTON_SORT_SHUFFLE: "ButtonSortShuffle",
  SORT_ORDER_GALLERY: "SortOrderGallery",
};

const validate = {
  isSortOrder(text) {
    return [ "asc", "desc" ].includes(text)
  },
  isTextAndNumbers(value) {
    return (/^[а-я\w\s]*$/gi.test(value));
  },
  onlyTextAndNumbers(value) {
    return (value.replace(/[^а-я\w\s]*/gi, ""));
  }
};

const sorting = {
  up: (field) => (a, b) => (a[field] < b[field]) ? -1 : (a[field] > b[field]) ? 1 : 0,
  down: (field) => (a, b) => (a[field] > b[field]) ? -1 : (a[field] < b[field]) ? 1 : 0
};
