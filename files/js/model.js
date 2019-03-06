class GalleryModel {
  constructor() {
    this._categoryData = [];
    this._pictureData = [];
    this._buttonFilterIndex = "all";
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
  
  get buttonFilterIndex() {
    return this._buttonFilterIndex;
  }
  set buttonFilterIndex(index) {
    this._buttonFilterIndex = index;
  
    customEvents.runListener(EVENT.ACTIVE_FILTER_CATEGORY);
  }
  
  get inputTextSearch() {
    return this._textInputSearch;
  }
  set inputTextSearch(text) {
    this._textInputSearch = text;
    
    customEvents.runListener(EVENT.INPUT_SEARCH_FILTER);
  }
}