'use strict';

(function () {

  var MAX_COL_PINS = 5;

  var mapFilters = document.querySelector('.map__filters-container');
  var mapForm = mapFilters.querySelector('.map__filters');
  var typeElem = mapForm.querySelector('#housing-type');
  var priceElem = mapForm.querySelector('#housing-price');
  var numOfRoomElem = mapForm.querySelector('#housing-rooms');
  var colOfGuestsElem = mapForm.querySelector('#housing-guests');

  var checkCurrentOffer = function (apartment) {
    return apartment.offer ? true : false;
  };

  var checkPriceLimit = function (desiredPrice, apartmentPrice) {
    switch (desiredPrice) {
      case 'any' : return true;
      case 'middle': return apartmentPrice >= 10000 && apartmentPrice <= 50000;
      case 'low': return apartmentPrice < 10000;
      case 'high': return apartmentPrice > 50000;
    }
    return false;
  };

  var checkGuests = function (desiredGuests, apartmentGuests) {
    switch (desiredGuests) {
      case 'any' : return true;
      case 0 : return apartmentGuests === 0;
      default: return apartmentGuests >= desiredGuests;
    }
  };

  var compareFeatures = function (desiredFeatures, apartmentFeatures) {
    var status = desiredFeatures.every(function (elem) {
      return apartmentFeatures.includes(elem.value);
    });
    return status;
  };

  var checkTypeOrRoom = function (inputValue, apartmentValue) {
    return inputValue === 'any' ? true : apartmentValue === inputValue;
  };

  var checkContinue = function (elem) {
    return elem;
  };

  var init = function (aparts) {
    var apartments = aparts;

    var featuresElems = Array.from(mapForm.querySelectorAll('#housing-features input:checked'));
    var filtredApartments = [];
    var typeValue = typeElem.value;
    var priceValue = priceElem.value;
    var roomValue = (numOfRoomElem.value === 'any') ? numOfRoomElem.value : parseInt(numOfRoomElem.value, 10);
    var guestsValue = (colOfGuestsElem.value === 'any') ? colOfGuestsElem.value : parseInt(colOfGuestsElem.value, 10);
    for (var i = 0; i < apartments.length; i++) {
      if (filtredApartments.length === MAX_COL_PINS) {
        break;
      }

      var check =
      [
        checkCurrentOffer(apartments[i]),
        checkTypeOrRoom(typeValue, apartments[i].offer.type),
        checkTypeOrRoom(roomValue, apartments[i].offer.rooms),
        checkGuests(guestsValue, apartments[i].offer.guests),
        checkPriceLimit(priceValue, apartments[i].offer.price),
        compareFeatures(featuresElems, apartments[i].offer.features)
      ].every(checkContinue);

      if (!check) {
        continue;
      } else {
        filtredApartments.push(apartments[i]);
      }

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
