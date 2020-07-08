'use strict';

(function () {

  var mapFilters = document.querySelector('.map__filters-container');
  var typeFilter = mapFilters.querySelector('#housing-type');

  var onTypeFilterChange = function (evt) {
    var filtredApartments = window.main.apartments.slice().filter(function (apart) {
      return apart.offer.type === evt.target.value;
    });
    window.pins.render(filtredApartments);
    window.card.deleteCurrent();
  };

  typeFilter.addEventListener('change', onTypeFilterChange);
})();
