class GalleryView {
  constructor() {
    this.$content = $(".content");
  }
  
  itemListGallery(imageObj) {
    const { path, name, id, category, dataSort } = imageObj;
    
    return `<div class="gallery" data-category="${ category }" data-sort="${ dataSort }">
      <img class="gallery__img" src="${ path }" alt="${ name }">
      <div class="gallery__position">${ id }</div>
      <span class="gallery__title">${ name }</span>
    </div>`
  }
  
  createListPictures(dataObj) {
    return this.itemListGallery(dataObj)
  }
  
  showListPictures(htmlList) {
    this.$content.html(htmlList)
  }
  
  getGalleryPictures() {
    return this.$content.find(".gallery");
  }
  
  hideBlockAnimate(currentElement) {
    $(currentElement).animate({
      "margin-left": "-300px",
      opacity: 0
    }, 500);
  }
  
  showBlockAnimate(currentElement) {
    $(currentElement).animate({
      "margin-left": "5px",
      opacity: 1
    }, 500);
  }
}


class ManagementView {
  constructor() {
    this.$filter = $(".filter");
    this.$searchInput = $(".sort__search");
  }
  
  valueButtonFilter(value, count) {
    return `<li class="filter__button" data-filter="${ count }">${ value }</li>`;
  }
  
  createListButtonsFilter(value, count) {
    return this.valueButtonFilter(value, count);
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
  
  bindInputSearch(callback) {
    this.$searchInput.on("input", callback)
  }
}