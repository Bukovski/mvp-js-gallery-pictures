class GalleryPresenter {
  constructor(model, view) {
    this._model = model;
    this._view = view;
  }
  initialize() {
    this._model.readDataFromFiles();
  
    this.initListeners();
    this.buildGalleryPictures();
  }
  
  initListeners() {
    customEvents.registerListener(EVENT.ACTIVE_FILTER_CATEGORY);
    customEvents.registerListener(EVENT.INPUT_SEARCH_FILTER);
  }
  
  async createListPicture() {
    const pictures = await this._model.getPicturesCollection();
    
    const joinPictures = pictures.reduce((prev, picture) => {
      picture.category = picture.category.join(",");
      picture.path = PATH.IMAGE + picture.path;
      picture.dataSort = picture.name.toLowerCase();
      
      return prev += this._view.templateGallery(picture)
    }, "");
    
    this._view.showListPictures(joinPictures);
  }
  
  hideGalleryFilter() {
    const galleryPictures = this._view.getGalleryPictures();
    const inputTextSearch = this._model.inputTextSearch;
    const category = this._model.buttonFilterIndex;
    
    const categoryInAttributes = (attributes, category) => attributes.split(",").includes(category);
    
    const hideRoles = (index, elem) => {
      const sortAttr = $(elem).attr("data-sort");
      const categoryAttr = $(elem).attr("data-category");
      
      if (!sortAttr.includes(inputTextSearch)) {
        this._view.hideBlockAnimate(elem);
        return;
      }
      if (categoryInAttributes(categoryAttr, category) || category === "all") {
        this._view.showBlockAnimate(elem);
        return;
      }
      
      this._view.hideBlockAnimate(elem);
    };
    
    galleryPictures.each(hideRoles);
  }
  
  async buildGalleryPictures() {
    await this.createListPicture();
    
    customEvents.addListener(EVENT.ACTIVE_FILTER_CATEGORY, () => this.hideGalleryFilter());
    customEvents.addListener(EVENT.INPUT_SEARCH_FILTER, () => this.hideGalleryFilter());
  }
}



class ManagementPresenter {
  constructor(model, view) {
    this._model = model;
    this._view = view;
  }
  
  initialize(presenter) {
    presenter.initialize();
    
    this.buildButtonsFilter();
  }
  
  async createButtonsFilter() {
    const categories = await this._model.getCategoryCollection();
    let listHtml = this._view.templateButtonFilter("All", "all"); //static first button for show all categories
    
    categories.forEach(category => {
      return listHtml += this._view.templateButtonFilter(category.categoryName, category.id)
    });
    
    this._view.showButtonsFilter(listHtml);
  }
  
  //add active class for active button "filter category" after all buttons loaded
  addActiveClassButtonsFilter() {
    const buttonIndex = this._model.buttonFilterIndex;
    
    this._view.addClassActiveButtonsFilter(buttonIndex);
  }
  
  //remove active class before added active class for current button which pressed
  toggleActiveClassButtonsFilter() {
    this._view.removeClassActiveButtonsFilter();
    this.addActiveClassButtonsFilter();
  }
  
  toggleButtonsFilter(event) {
    const currentButton = $(event.target);
    const isActive = currentButton.hasClass("filter__button--active");
    let indexButton = currentButton.attr("data-filter");
    
    if (!isActive) {
      this._model.buttonFilterIndex = indexButton.toString();
    }
  }
  
  //search input filter article
  inputSearchChangeWatcher(event) {
    const input = $(event.target);
    const inputValue = input.val();
    const maxLengthValue = input.attr("data-input-max");
    
    if (!validate.isTextAndNumbers(inputValue)) {
      return input.val(validate.onlyTextAndNumbers(inputValue))
    }
    if (inputValue.length > maxLengthValue) {
      return input.val(inputValue.substr(0, maxLengthValue))
    }
    
    this._model.inputTextSearch = inputValue.toLowerCase();
  }
  
  async buildButtonsFilter() {
    await this.createButtonsFilter();
    this.addActiveClassButtonsFilter();
    
    this._view.bindToggleButtonsFilter(this.toggleButtonsFilter.bind(this));
    this._view.bindInputSearch(this.inputSearchChangeWatcher.bind(this));
  
    customEvents.addListener(EVENT.ACTIVE_FILTER_CATEGORY, () => this.toggleActiveClassButtonsFilter());
  }
}