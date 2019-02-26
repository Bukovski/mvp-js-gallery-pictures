class GalleryPresenter {
  constructor(model, view) {
    this._model = model;
    this._view = view;
  }
  
  initialize() {
    this._model.readDataFromFiles();
  
    this.rebuildButtonsFilter()
  }
  
  async createButtonsFilter() {
    const categories = await this._model.getCategoryCollection();
    let listHtml = this._view.createListButtonsFilter("All", "all"); //static first button for show all categories
    
    categories.forEach(category => {
      return listHtml += this._view.createListButtonsFilter(category.categoryName, category.id)
    });
    
    this._view.showButtonsFilter(listHtml);
  }
  
  async rebuildButtonsFilter() {
    await this.createButtonsFilter();
    this._view.toggleClassActiveButtonsFilter(0); //add active class for active button "filter category" after all buttons loaded
  }
  
  
}