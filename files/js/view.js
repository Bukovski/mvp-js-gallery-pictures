class GalleryView {
  constructor(template) {
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
  
  changePositionAnimate(currentElement, first, second){
    $(currentElement).animate({
      left: (first.x - second.x),
      top: (first.y - second.y)
    });
  }
}



class ManagementView {
  constructor() {
    this.$filter = $(".filter");
    this.$sortOrderGrid = $(".sort__grid");
    this.$sortOrderButton = $(".sort__button");
    this.$searchInput = $(".sort__search");
    this.$sortShuffle = $(".sort__shuffle");
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