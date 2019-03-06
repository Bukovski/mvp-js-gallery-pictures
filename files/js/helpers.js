const PATH = {
  IMAGE: "files/pictures/",
  DB_IMAGE: "files/db/picture.json",
  DB_CATEGORY: "files/db/category.json"
};

const EVENT = {
  ACTIVE_FILTER_CATEGORY: "ActiveFilterCategory",
  INPUT_SEARCH_FILTER: "InputSearchFilter",
};

const validate = {
  isTextAndNumbers(value) {
    return (/^[а-я\w\s]*$/gi.test(value));
  },
  onlyTextAndNumbers(value) {
    return (value.replace(/[^а-я\w\s]*/gi, ""));
  }
};

const sorting = {
  up: (field) => (a, b) => (a[field] < b[field]) ? -1 : (a[field] > b[field]) ? 1 : 0,
  down: (field) => (a, b) => (a[field] > b[field]) ? -1 : (a[field] < b[field]) ? 1 : 0,
  random: (a, b) => Math.random() - 0.5
};
