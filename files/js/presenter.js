class GalleryPresenter {
  constructor(model, view) {
    this._model = model;
    this._view = view;
  }
  
  initialize() {
    this._model.readDataFromFiles();
  
    this.rebuildButtonsFilter();
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
      
      this._model.setButtonFilterIndex(indexButton, () => this.toggleActiveClassButtonsFilter());
    }
    
    return false;
  }
  
  async rebuildButtonsFilter() {
    await this.createButtonsFilter();
    this.addActiveClassButtonsFilter();
    
    this._view.bindToggleButtonsFilter(this.toggleButtonsFilter.bind(this))
  }
  
  
  
}