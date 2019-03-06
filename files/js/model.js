class GalleryModel {
  constructor() {
    this._categoryData = [];
    this._pictureData = [];
    this._buttonFilterIndex = "0";
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
  
    customEvents.runListener(EVENT.ACTIVE_FILTER_CATEGORY);
  }
  
  getInputTextSearch() {
    return this._textInputSearch;
  }
  setInputTextSearch(text) {
    this._textInputSearch = text;
    
    customEvents.runListener(EVENT.INPUT_SEARCH_FILTER);
  }
}