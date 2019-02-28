class GalleryModel {
  constructor() {
    this._categoryData = [];
    this._pictureData = [];
    this._buttonFilterIndex = 0;
    this._buttonSortOrder = "asc";
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
}