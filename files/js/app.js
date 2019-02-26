const PATH = {
  IMAGE: "files/pictures/",
  DB_IMAGE: "files/db/picture.json",
  DB_CATEGORY: "files/db/category.json"
};


const model = new GalleryModel();
const template = new Template();
const view = new GalleryView(template);
const controller = new GalleryPresenter(model, view);

const setView = () => controller.initialize();

window.onload = setView;
