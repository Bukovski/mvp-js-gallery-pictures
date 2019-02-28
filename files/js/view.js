class GalleryView {
  constructor(template) {
    this._template = template;
    this.$filter = $(".filter");
    this.$sortOrderGrid = $(".sort__grid");
    this.$sortOrderButton = $(".sort__button");
    this.$searchInput = $(".sort__search");
    this.$sortShuffle = $(".sort__shuffle");
  }
  
  createListButtonsFilter(value, count) {
    return this._template.valueButtonFilter(value, count);
  }
  
  showButtonsFilter(htmlList) {
    this.$filter.html(htmlList)
  }
  
  removeClassActiveButtonsFilter() {
    this.$filter.find(".filter__button--active")
      .removeClass("filter__button--active");
  }
  
  addClassActiveButtonsFilter(index) {
    this.$filter.find(".filter__button").eq(index)
      .addClass("filter__button--active");
  }
  
  bindToggleButtonsFilter(callback) {
    this.$filter.on("click", ".filter__button", callback)
  }
  
  addClassActiveButtonsOrderSort(order) {
    this.$sortOrderGrid.find(`.sort__button[data-order="${ order }"]`)
      .addClass("sort__button--active");
  }
  
  removeClassActiveButtonsOrderSort() {
    this.$sortOrderGrid.find(".sort__button--active")
      .removeClass("sort__button--active");
  }
  
  bindToggleButtonsOrderSort(callback) {
    this.$sortOrderButton.on("click", callback)
  }
  
  bindInputSearch(callback) {
    this.$searchInput.on("input", callback)
  }
  
  bindToggleButtonShuffleSort(callback) {
    this.$sortShuffle.on("click", callback);
  }
}