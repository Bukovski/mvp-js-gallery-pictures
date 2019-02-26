class Template {
  valueButtonFilter(value, count) {
    return `<li class="filter__button" data-filter="${ count }">${ value }</li>`;
  }
  itemListGallery(srcImg, altImg, counter, title, categoryNumbers, sortData) {
    return `<div class="gallery" data-category="${ categoryNumbers }" data-sort="${ sortData }">
      <img class="gallery__img" src="${ srcImg }" alt="${ altImg }">
      <div class="gallery__position">${ counter }</div>
      <span class="gallery__title">${ title }</span>
    </div>`
  }
}