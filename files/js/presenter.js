class GalleryPresenter {
  constructor(model, view) {
    this._model = model;
    this._view = view;
  }
  initialize() {
    this._model.readDataFromFiles();
  
    this.buildGalleryPictures();
    
    customEvents.registerListener(EVENT.SORT_ORDER_GALLERY);
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
  
  initGalleryPicturesPosition() {
    const galleryPictures = this._view.getGalleryPictures();
    const positionPicturesObj = []; //[{category: ["1", "5"], title: "busy streets", x: 5, y: 5}, {category: ["2", "5"], title: "luminous night", x: 255, y: 5} ...]
    
    galleryPictures.each((index, wrapperDiv) => {
      const attributes = wrapperDiv.dataset;
      
      const wrapperDivInfo = {
        category: attributes.category.split(","),
        title: attributes.sort,
        x: wrapperDiv.offsetLeft,
        y: wrapperDiv.offsetTop
      };
      
      positionPicturesObj.push(wrapperDivInfo);
    });
    
    this._model.setGalleryPosition(positionPicturesObj);
  }
  
  async sortOrderGallery() {
    const sortOrder = this._model.getButtonSortOrder();
    const picturesPosition = this._model.getGalleryPosition();
    const copyPicturesPosition = picturesPosition.slice(0);
    const galleryPictures = this._view.getGalleryPictures();
    
    if (sortOrder === "random") {
      picturesPosition.sort(sorting.random);
  
      this._model.setGalleryPosition("");
    } else {
      picturesPosition.sort((sortOrder === "asc") ? sorting.up("title") : sorting.down("title"));
    }
    
    const newPositionData = {};
    
    picturesPosition.forEach((elem, index) => {
      newPositionData[elem.title] = {
        category: elem.category,
        title: elem.title,
        x: copyPicturesPosition[index].x - elem.x,
        y: copyPicturesPosition[index].y - elem.y
      }
    });
  
    const positionGallery = (index, elem) => {
      const dataAttr = $(elem).attr("data-sort");
      const position = newPositionData[dataAttr];
    
      this._view.changePositionAnimate(elem, position.x, position.y);
    };
    
    galleryPictures.each(positionGallery)
  }
  
  resetPosition() {
    const galleryPictures = this._view.getGalleryPictures();
    
    galleryPictures.each((index, elem) => {
      this._view.changePositionAnimate(elem, 0, 0)
    })
  }
  
  async buildGalleryPictures() {
    await this.createListPicture();
  
    customEvents.addListener(EVENT.SORT_ORDER_GALLERY, () => {
      this.resetPosition();
      setTimeout(this.initGalleryPicturesPosition.bind(this), 500);
      setTimeout(this.sortOrderGallery.bind(this), 550);
    });
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
    customEvents.registerListener(EVENT.INPUT_SEARCH_WATCHER);
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
    this._model.setButtonSortOrder("random");
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
    customEvents.addListener(EVENT.SORT_ORDER_GALLERY, () => this.toggleActiveClassButtonsSortOrder());
    customEvents.addListener(EVENT.INPUT_SEARCH_WATCHER, (inputValue) => console.log("Тут могла быть ваша рекламма", inputValue)); //TODO При вводе данных в инпут дергаем отображение отфильрованных картинок. Запихнуть вызов перерисовки в callback
  
  }
}