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
