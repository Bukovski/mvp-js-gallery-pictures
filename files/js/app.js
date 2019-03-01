const model = new GalleryModel();
const template = new Template();
const view = new ManagementView(template);
const controller = new ManagementPresenter(model, view);

const setView = () => controller.initialize();

window.onload = setView;
