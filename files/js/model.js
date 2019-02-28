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
  setButtonFilterIndex(index, callback) {
    this._buttonFilterIndex = index;
    
    if (callback) {
      callback();
    }
  }
  
  getButtonSortOrder() {
    return this._buttonSortOrder;
  }
  setButtonSortOrder(sortOrder, callback) {
    
    this._buttonSortOrder = sortOrder;
    
    if (callback) {
      callback();
    }
  }
  
  getInputTextSearch() {
    return this._textInputSearch;
  }
  setInputTextSearch(text, callback) {
    this._textInputSearch = text;
    
    if (callback) {
      callback(); //TODO замениь на Event. При вводе данных дергаем отображение записей и фильтруем их
    }
  }
}