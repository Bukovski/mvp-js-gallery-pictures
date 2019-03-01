class GalleryModel {
  constructor() {
    this._categoryData = [];
    this._pictureData = [];
    this._buttonFilterIndex = 0;
    this._buttonSortOrder = "asc";
    this._textInputSearch = "";
  }
  
  readDataFromFiles() {
    this._categoryData = $.get(PATH.DB_CATEGORY);
    this._pictureData = $.get(PATH.DB_IMAGE);
  }
  
  async getCategoryCollection() {
    return await this._categoryData;
  }
  
  async getPicturesCollection() {
    return await this._pictureData;
  }
  
  getButtonFilterIndex() {
    return this._buttonFilterIndex;
  }
  setButtonFilterIndex(index) {
    this._buttonFilterIndex = index;
  
    customEvents.runListener(EVENT.ACTIVE_CLASS_BUTTON_FILTER);
  }
  
  getButtonSortOrder() {
    return this._buttonSortOrder;
  }
  setButtonSortOrder(sortOrder) {
    
    this._buttonSortOrder = sortOrder;
  
    customEvents.runListener(EVENT.BUTTONS_SORT_ORDER);
  }
  
  getInputTextSearch() {
    return this._textInputSearch;
  }
  setInputTextSearch(text) {
    this._textInputSearch = text;
    
    customEvents.runListener(EVENT.INPUT_SEARCH_WATCHER, text);
  }
}