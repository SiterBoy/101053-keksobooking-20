'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');

  var changeAdress = function () {
    var coords = window.mainPin.giveCoordsOfTarget();
    adForm.querySelector('input[name="address"]').value = coords.x + ', ' + coords.y;
  };

  var roomNumberElement = document.querySelector('#room_number');
  var guestNumberElement = document.querySelector('#capacity');

  var validateRoomsAndGuests = function () {
    var roomNumberValue = parseInt(roomNumberElement.value, 10);
    var guestNumbervalue = parseInt(guestNumberElement.value, 10);

    if (roomNumberValue === 100 && guestNumbervalue !== 0) {
      guestNumberElement.setCustomValidity('Когда комнат ' + roomNumberValue + ', тогда это жилье не для гостей. ');
    } else if (guestNumbervalue === 0 && roomNumberValue !== 100) {
      guestNumberElement.setCustomValidity('Если Ваше жилье не для гостей, то у Вас должно быть больше комнат.');
    } else if (roomNumberValue < guestNumbervalue) {
      guestNumberElement.setCustomValidity('По правилам сервиса максимум 1 гость на 1 комнату!');
    } else {
      guestNumberElement.setCustomValidity('');
    }
  };

  var onRoomsAndGuestsChange = function () {
    validateRoomsAndGuests();
    guestNumberElement.reportValidity();
  };

  roomNumberElement.addEventListener('change', onRoomsAndGuestsChange);
  guestNumberElement.addEventListener('change', onRoomsAndGuestsChange);

  // validation

  var typeOfApartSelect = adForm.querySelector('#type');
  var priceOfApart = adForm.querySelector('#price');

  var onChangeTypeOfApartAndPrice = function (evt) {
    var value = 0;
    switch (evt.target.value) {
      case 'flat':
        value = 1000;
        break;
      case 'bungalo':
        value = 0;
        break;
      case 'house':
        value = 5000;
        break;
      case 'palace':
        value = 10000;
        break;
    }

    priceOfApart.min = value;
    priceOfApart.placeholder = value;
  };

  typeOfApartSelect.addEventListener('change', onChangeTypeOfApartAndPrice);

  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');

  var onTimeInChange = function (evt) {
    timeOutSelect.value = evt.target.value;
  };

  var onTimeOutChange = function (evt) {
    timeInSelect.value = evt.target.value;
  };

  timeInSelect.addEventListener('change', onTimeInChange);
  timeOutSelect.addEventListener('change', onTimeOutChange);

  var avatarFileInput = adForm.querySelector('#avatar');
  var imagesFileInput = adForm.querySelector('#images');

  var onInputPhotosChange = function (evt) {
    var currentType = evt.target.files[0].type;
    if (currentType !== 'image/jpeg' && currentType !== 'image/png') {
      evt.target.setCustomValidity('Файл должен быть изображением');
    } else {
      evt.target.setCustomValidity('');
    }
    evt.target.reportValidity();
  };

  avatarFileInput.addEventListener('change', onInputPhotosChange);
  imagesFileInput.addEventListener('change', onInputPhotosChange);

  var switchElementsStatus = function (array, status) {
    array.forEach(function (elem) {
      elem.disabled = status;
    });
  };

  var fieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelectorAll('.map__filter');
  var mapForm = window.map.mapFiltersContainer.querySelector('.map__filters');

  var switchAllForms = function (status) {
    // Инверсия статуса для стилей
    var newStatus = status ? false : true;
    switchElementsStatus(fieldsets, newStatus);
    switchElementsStatus(mapFilters, newStatus);
    mapForm.querySelector('.map__features').disabled = newStatus;
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    var data = new FormData(adForm);

    var onLoad = function () {
      window.statusModals.successMessage();
      adForm.reset();
      window.main.deactivatePage();
    };

    var onError = function (status) {
      window.statusModals.errorMessage('Произошла ошибка. Код: ' + status + ' Попробуйте еще раз!');
    };

    window.backend.upload(onLoad, onError, data);
  };

  adForm.addEventListener('submit', onFormSubmit);

  var activate = function () {
    switchAllForms(true);
    validateRoomsAndGuests();
    changeAdress();
    adForm.classList.remove('ad-form--disabled');
  };

  var deactivate = function () {
    switchAllForms(false);
    validateRoomsAndGuests();
    changeAdress();
    adForm.classList.add('ad-form--disabled');
  };

  window.form = {
    activate: activate,
    deactivate: deactivate,
    changeAdress: changeAdress
  };

})();
