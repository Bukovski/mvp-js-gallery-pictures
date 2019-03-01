class GalleryPresenter {
  constructor(model, view) {
    this._model = model;
    this._view = view;
  }
  initialize() {
    this._model.readDataFromFiles();
  
    this.buildGalleryPictures();
  }
  
  async createListPicture() {
    const pictures = await this._model.getPicturesCollection();
    
    const joinPictures = pictures.reduce((prev, picture) => {
      picture.category = picture.category.join(",");
      picture.path = PATH.IMAGE + picture.path;
      picture.dataSort = picture.name.toLowerCase();
      
      return prev += this._view.createListPictures(picture)
    }, "");
    
    this._view.showListPictures(joinPictures);
  }
  
  async buildGalleryPictures() {
    await this.createListPicture();
  }
  
}



class ManagementPresenter {
  constructor(model, view) {
    this._model = model;
    this._view = view;
  }
  
  initialize(presenter) {
    presenter.initialize();
    
    this.initListeners();
    this.buildButtonsFilter();
  }
  
  initListeners() {
    customEvents.registerListener(EVENT.ACTIVE_CLASS_BUTTON_FILTER);
    customEvents.registerListener(EVENT.BUTTONS_SORT_ORDER);
    customEvents.registerListener(EVENT.INPUT_SEARCH_WATCHER);
    customEvents.registerListener(EVENT.BUTTON_SORT_SHUFFLE); //TODO рандомная сортировка картинок но пока не подключена
  }
  
  async createButtonsFilter() {
    const categories = await this._model.getCategoryCollection();
    let listHtml = this._view.createListButtonsFilter("All", "all"); //static first button for show all categories
    
    categories.forEach(category => {
      return listHtml += this._view.createListButtonsFilter(category.categoryName, category.id)
    });
    
    this._view.showButtonsFilter(listHtml);
  }
  
  //add active class for active button "filter category" after all buttons loaded
  addActiveClassButtonsFilter() {
    const buttonIndex = this._model.getButtonFilterIndex();
    
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
      indexButton =  (indexButton === "all") ? 0 : indexButton;
      
      this._model.setButtonFilterIndex(indexButton);
    }
  }
  
  //sort order buttons (asc desc)
  addActiveClassButtonsSortOrder() {
    const sortOrder = this._model.getButtonSortOrder();
    
    this._view.addClassActiveButtonsOrderSort(sortOrder);
  }
  
  toggleActiveClassButtonsSortOrder() {
    this._view.removeClassActiveButtonsOrderSort();
    this.addActiveClassButtonsSortOrder();
  }
  
  toggleButtonsSortOrder(event) {
    const currentButton = $(event.target);
    const isActive = currentButton.hasClass("sort__button--active");
    let sortOrder = currentButton.attr("data-order");
  
    if (!isActive && validate.isSortOrder(sortOrder)) {
      this._model.setButtonSortOrder(sortOrder);
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
    
    this._model.setInputTextSearch(inputValue);
  }
  
  //press button shuffle
  toggleButtonSortShuffle(event) {
    const currentButton = $(event.target);
     //TODO Рандомное отображение картинок при клике на кнопку SHUFFLE
    customEvents.runListener(EVENT.BUTTON_SORT_SHUFFLE);
  }
  
  async buildButtonsFilter() {
    await this.createButtonsFilter();
    this.addActiveClassButtonsFilter();
    this.addActiveClassButtonsSortOrder();
    
    this._view.bindToggleButtonsFilter(this.toggleButtonsFilter.bind(this));
    this._view.bindToggleButtonsOrderSort(this.toggleButtonsSortOrder.bind(this));
    this._view.bindInputSearch(this.inputSearchChangeWatcher.bind(this));
    this._view.bindToggleButtonShuffleSort(this.toggleButtonSortShuffle.bind(this));
  
    customEvents.addListener(EVENT.ACTIVE_CLASS_BUTTON_FILTER, () => this.toggleActiveClassButtonsFilter());
    customEvents.addListener(EVENT.BUTTONS_SORT_ORDER, () => this.toggleActiveClassButtonsSortOrder());
    customEvents.addListener(EVENT.INPUT_SEARCH_WATCHER, (inputValue) => console.log("Тут могла быть ваша рекламма", inputValue)); //TODO При вводе данных в инпут дергаем отображение отфильрованных картинок. Запихнуть вызов перерисовки в callback
    customEvents.addListener(EVENT.BUTTON_SORT_SHUFFLE, () => console.log("Опа чирик")); //TODO Рандомное отображение картинок при клике на кнопку SHUFFLE
  
  }
}