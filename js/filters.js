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

  var giveValueInNormalType = function (elem) {
    if (elem.value === 'any') {
      return elem.value;
    } else {
      return parseInt(elem.value, 10);
    }
  };

  var init = function (aparts) {
    var apartments = aparts;

    var featuresElems = Array.from(mapForm.querySelectorAll('#housing-features input:checked'));
    var filtredApartments = [];
    var typeValue = typeElem.value;
    var priceValue = priceElem.value;
    var roomValue = giveValueInNormalType(numOfRoomElem);
    var guestsValue = giveValueInNormalType(colOfGuestsElem);

    for (var i = 0; i < apartments.length; i++) {
      if (filtredApartments.length === MAX_COL_PINS) {
        break;
      }

      var checkOffer = checkCurrentOffer(apartments[i]);
      if (!checkOffer) {
        continue;
      }

      var typeCheck = typeValue === 'any' ? true : apartments[i].offer.type === typeValue;
      if (!typeCheck) {
        continue;
      }

      var numOfRoomCheck = roomValue === 'any' ? true : apartments[i].offer.rooms === roomValue;
      if (!numOfRoomCheck) {
        continue;
      }

      var colOfGuestsCheck = checkGuests(guestsValue, apartments[i].offer.guests);
      if (!colOfGuestsCheck) {
        continue;
      }

      var priceCheck = checkPriceLimit(priceValue, apartments[i].offer.price);
      if (!priceCheck) {
        continue;
      }

      var featuresCheck = compareFeatures(featuresElems, apartments[i].offer.features);
      if (!featuresCheck) {
        continue;
      }


      if (checkOffer && typeCheck && numOfRoomCheck && colOfGuestsCheck && priceCheck && featuresCheck) {
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
