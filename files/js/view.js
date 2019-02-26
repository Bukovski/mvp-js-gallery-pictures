class GalleryView {
  constructor(template) {
    this._template = template;
    this.$filter = $(".filter");
  }
  
  createListButtonsFilter(value, count) {
    return this._template.valueButtonFilter(value, count);
  }
  
  showButtonsFilter(htmlList) {
    this.$filter.html(htmlList)
  }
  
  removeClassActiveButtonsFilter() {
    this.$filter.find(".filter__button--active").removeClass("filter__button--active");
  }
  
  addClassActiveButtonsFilter(index) {
    this.$filter.find(".filter__button")
      .eq(index).addClass("filter__button--active");
  }
  
  bindToggleButtonsFilter(callback) {
    this.$filter.on("click", ".filter__button", callback)
  }
}