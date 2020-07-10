'use strict';

(function () {

  var MAX_COL_PINS = 5;

  var mapFilters = document.querySelector('.map__filters-container');
  var mapForm = mapFilters.querySelector('.map__filters');

  var checkOffer = function (apartment) {
    return apartment.offer ? true : false;
  };

  var init = function () {
    onFormChange();
  };

  var checkPriceLimit = function (desiredPrice, apartmentPrice) {
    var status = false;
    switch (desiredPrice) {
      case 'any' :
        status = true;
        break;
      case 'middle':
        if (apartmentPrice >= 10000 && apartmentPrice <= 50000) {
          status = true;
        }
        break;
      case 'low':
        if (apartmentPrice < 10000) {
          status = true;
        }
        break;
      case 'high':
        if (apartmentPrice > 50000) {
          status = true;
        }
        break;
    }
    return status;
  };

  var compareFeatures = function (desiredFeatures, apartmentFeatures) {
    var status = desiredFeatures.every(function (elem) {
      return apartmentFeatures.includes(elem.value);
    });
    return status;
  };

  var onFormChange = function () {
    var apartments = window.main.apartments;
    var typeElem = mapForm.querySelector('#housing-type').value;
    var priceElem = mapForm.querySelector('#housing-price').value;
    var numOfRoomElem = mapForm.querySelector('#housing-rooms').value;
    var colOfGuestsElem = mapForm.querySelector('#housing-guests').value;
    var featuresElems = Array.from(mapForm.querySelectorAll('#housing-features input:checked'));
    var filtredApartments = [];

    var count = 0;

    for (var i = 0; i < apartments.length; i++) {
      if (count === MAX_COL_PINS) {
        break;
      }
      var typeCheck = typeElem === 'any' ? true : apartments[i].offer.type === typeElem;
      var numOfRoomCheck = numOfRoomElem === 'any' ? true : apartments[i].offer.rooms === parseInt(numOfRoomElem, 10);
      var colOfGuestsCheck = colOfGuestsElem === 'any' ? true : apartments[i].offer.guests >= parseInt(colOfGuestsElem, 10);
      var priceCheck = checkPriceLimit(priceElem, apartments[i].offer.price);
      var featuresCheck = compareFeatures(featuresElems, apartments[i].offer.features);

      if (checkOffer && typeCheck && numOfRoomCheck && colOfGuestsCheck && priceCheck && featuresCheck) {
        filtredApartments.push(apartments[i]);
        count++;
      }
    }

    window.pins.render(filtredApartments);
    window.card.deleteCurrent();
  };

  mapForm.addEventListener('change', window.debounce(onFormChange));

  window.filters = {
    init: init
  };

})();
