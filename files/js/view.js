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
  
  toggleClassActiveButtonsFilter(index) {
    this.$filter.find(".filter__button").eq(index).addClass("filter__button--active");
  }
}