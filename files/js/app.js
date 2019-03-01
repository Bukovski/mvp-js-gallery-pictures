const model = new GalleryModel();
const galleryPresenter = new GalleryPresenter(model, new GalleryView());
const presenter = new ManagementPresenter(model, new ManagementView());

const setView = () => presenter.initialize(galleryPresenter);

window.onload = setView;
