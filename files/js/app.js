const PATH = {
  IMAGE: "files/pictures/",
  DB_IMAGE: "files/db/picture.json",
  DB_CATEGORY: "files/db/category.json"
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

const model = new GalleryModel();
const template = new Template();
const view = new GalleryView(template);
const controller = new GalleryPresenter(model, view);

const setView = () => controller.initialize();

window.onload = setView;
