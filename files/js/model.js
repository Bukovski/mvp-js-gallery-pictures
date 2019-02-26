class GalleryModel {
  constructor() {
    this._categoryData = [];
    this._pictureData = [];
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
}