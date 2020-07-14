'use strict';

(function () {

  var MAX_COL_PINS = 5;

  var mapFilters = document.querySelector('.map__filters-container');
  var mapForm = mapFilters.querySelector('.map__filters');
  var typeElem = mapForm.querySelector('#housing-type');
  var priceElem = mapForm.querySelector('#housing-price');
  var numOfRoomElem = mapForm.querySelector('#housing-rooms');
  var colOfGuestsElem = mapForm.querySelector('#housing-guests');

  var checkCurrentOffer = function (apart) {
    return apart.offer ? true : false;
  };

  var checkPriceLimit = function (apart, objFilters) {
    var apartPrice = apart.offer.price;
    switch (objFilters.price) {
      case 'any' : return true;
      case 'middle': return apartPrice >= 10000 && apartPrice <= 50000;
      case 'low': return apartPrice < 10000;
      case 'high': return apartPrice > 50000;
    }
    return false;
  };

  var checkGuests = function (apart, objFilters) {
    var apartGuests = apart.offer.guests;
    switch (objFilters.guests) {
      case 'any' : return true;
      case 0 : return apartGuests === 0;
      default: return apartGuests >= objFilters.guests;
    }
  };

  var compareFeatures = function (apart, objFilters) {
    var status = objFilters.features.every(function (elem) {
      return apart.offer.features.includes(elem.value);
    });
    return status;
  };

  var checkTypeOrRoom = function (apart, objFilters) {
    return objFilters.type === 'any' ? true : apart.offer.type === objFilters.type;
  };

  var checkAllFilters =
  [
    checkCurrentOffer,
    checkTypeOrRoom,
    checkTypeOrRoom,
    checkGuests,
    checkPriceLimit,
    compareFeatures
  ];

  var init = function (aparts) {
    var filtredApartments = [];
    var apartments = aparts;

    var filters = {
      features: Array.from(mapForm.querySelectorAll('#housing-features input:checked')),
      type: typeElem.value,
      price: priceElem.value,
      rooms: (numOfRoomElem.value === 'any') ? numOfRoomElem.value : parseInt(numOfRoomElem.value, 10),
      guests: (colOfGuestsElem.value === 'any') ? colOfGuestsElem.value : parseInt(colOfGuestsElem.value, 10)
    };

    for (var i = 0; i < apartments.length; i++) {
      var apart = apartments[i];
      if (filtredApartments.length === MAX_COL_PINS) {
        break;
      }

      var check = checkAllFilters.every(function (elem) {
        return elem(apart, filters);
      });

      if (!check) {
        continue;
      }

      filtredApartments.push(apartments[i]);

    }

    window.pins.render(filtredApartments);
    window.card.deleteCurrent();
  };

  var initDebounce = window.debounce(function () {
    init(window.main.apartments);
  });

  mapForm.addEventListener('change', initDebounce);

  window.filters = {
    init: init
  };

})();
