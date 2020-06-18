'use strict';
var NUM_OF_APARTS = 8;
var AVATAR_URL = 'img/avatars/user0';
var TITLES = ['Моя хата с краю', 'Апарты у ЕЖА', 'Квартира бегемота и его друзей', 'Большой дом для грустных людей', 'Квартира с прекрасным видом', 'Болшой квартир для светил', 'Дом для вас', 'Дорогая халупка для жизни'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MAX_ROOMS = 12;
var MAX_GUESTS = 20;
var CHEKINS = ['12:00', '13:00', '14:00'];
var CHEKOUTS = ['12:00', '13:00', '14:00'];
var FEAUTERES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Описание номер один', 'Описание номер два', 'Описание номер три', 'Описание номер четыре', 'Описание номер пять', 'Описание номер шесть', 'Описание номер семь', 'Описание номер восемь'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_WIDTH = 1200;
var MAP_MIN_Y = 130;
var MAP_MAX_Y = 630;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var MAIN_PIN_HEIGTH = 80;
var MAIN_PIN_WIDTH = 65;
var apartments = [];

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsArea = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var map = document.querySelector('.map');
var mapFiltersContainer = map.querySelector('.map__filters-container');
var adForm = document.querySelector('.ad-form');
var mapForm = mapFiltersContainer.querySelector('.map__filters');
var mainPin = document.querySelector('.map__pin--main');
var isActive = false;

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomElements = function (array) {
  var colElemes = getRandomNumber(1, array.length);
  var oldMassive = array.slice();
  var resultArray = [];

  for (var i = 0; i < colElemes; i++) {
    var currentRandomIndex = getRandomNumber(0, oldMassive.length - 1);
    resultArray.push(oldMassive.splice(currentRandomIndex, 1));
  }

  // Делаем из массива с подмассивами просто массив
  var finalArray = [];
  for (var j = 0; j < resultArray.length; j++) {
    finalArray.push(resultArray[j][0]);
  }
  return finalArray;
};


var generateApartments = function () {
  for (var i = 0; i < NUM_OF_APARTS; i++) {
    var coordX = getRandomNumber(0, MAP_WIDTH);
    var coordY = getRandomNumber(MAP_MIN_Y, MAP_MAX_Y);
    apartments[i] = {
      author: AVATAR_URL + (i + 1) + '.png',
      offer: {
        title: TITLES[i],
        address: coordX + ', ' + coordY,
        price: getRandomNumber(1, 100000),
        type: TYPES[getRandomNumber(0, TYPES.length - 1)],
        rooms: getRandomNumber(1, MAX_ROOMS),
        guests: getRandomNumber(1, MAX_GUESTS),
        checkin: CHEKINS[getRandomNumber(0, CHEKINS.length - 1)],
        checkout: CHEKOUTS[getRandomNumber(0, CHEKOUTS.length - 1)],
        features: getRandomElements(FEAUTERES),
        description: DESCRIPTIONS[i],
        photos: PHOTOS.slice(),
      },
      location: {
        x: coordX,
        y: coordY
      }
    };
  }
};

//
var createPin = function (apartment) {
  var onePin = pinTemplate.cloneNode(true);
  onePin.dataset.id = apartment.id;
  var pinImage = onePin.querySelector('img');
  var pinX = apartment.location.x - PIN_WIDTH / 2;
  var pinY = apartment.location.y - PIN_HEIGHT;
  onePin.style.cssText = 'left:' + pinX + 'px; top:' + pinY + 'px;';
  pinImage.src = apartment.author;
  pinImage.alt = apartment.offer.title;

  onePin.addEventListener('click', function () {
    deleteCurrentCard();
    renderCard(apartment);
    var popupCard = document.querySelector('.popup__close');
    popupCard.addEventListener('click', onPopupClick);
    document.addEventListener('keydown', onPopupEscPress);
  });
  return onePin;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < apartments.length; i++) {
    fragment.appendChild(createPin(apartments[i]));
  }
  pinsArea.appendChild(fragment);
};

var createFeatures = function (features) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var li = document.createElement('li');
    li.classList = 'popup__feature popup__feature--' + features[i];
    fragment.appendChild(li);
  }
  return fragment;
};

var createFotos = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var img = document.createElement('img');
    img.src = photos[i];
    img.classList.add('popup__photo');
    img.alt = 'Фотография жилья';
    img.width = 45;
    img.height = 40;
    fragment.appendChild(img);
  }
  return fragment;
};

var createTimeSentense = function (rooms, guests) {
  var roomsEnd = '';
  var guestsEnd = 'ей';
  switch (rooms) {
    case 1:
      roomsEnd = 'a';
      break;
    case 2:
    case 3:
    case 4:
      roomsEnd = 'ы';
      break;
  }

  if (guests === 1) {
    guestsEnd = 'я';
  }
  return rooms + ' комнат' + roomsEnd + ' для ' + guests + ' гост' + guestsEnd;
};


var createCard = function (apartment) {
  var oneCard = cardTemplate.cloneNode(true);
  var cardImg = oneCard.querySelector('.popup__avatar');
  var typeOfApart = '';
  switch (apartment.offer.type) {
    case 'flat':
      typeOfApart = 'Квартира';
      break;
    case 'bungalo':
      typeOfApart = 'Бунгало';
      break;
    case 'house':
      typeOfApart = 'Дом';
      break;
    case 'palace':
      typeOfApart = 'Дворец';
      break;
  }

  cardImg.src = apartment.author;
  cardImg.alt = apartment.offer.title;
  oneCard.querySelector('.popup__avatar').src = apartment.author;
  oneCard.querySelector('.popup__title').textContent = apartment.offer.title;
  oneCard.querySelector('.popup__text--address').textContent = apartment.offer.address;
  oneCard.querySelector('.popup__text--price').textContent = apartment.offer.price + '₽/ночь';
  oneCard.querySelector('.popup__type').textContent = typeOfApart;
  oneCard.querySelector('.popup__text--capacity').textContent = createTimeSentense(apartment.offer.rooms, apartment.offer.guests);
  oneCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + apartment.offer.checkin + ', выезд до ' + apartment.offer.checkout;
  oneCard.querySelector('.popup__features').innerHTML = '';
  oneCard.querySelector('.popup__features').appendChild(createFeatures(apartment.offer.features));
  oneCard.querySelector('.popup__description').textContent = apartment.offer.description;
  oneCard.querySelector('.popup__photos').innerHTML = '';
  oneCard.querySelector('.popup__photos').appendChild(createFotos(apartment.offer.photos));
  return oneCard;
};

var renderCard = function (apartment) {
  var card = createCard(apartment);
  mapFiltersContainer.insertAdjacentElement('beforebegin', card);
};

var fieldsets = adForm.querySelectorAll('fieldset');
var mapFilters = adForm.querySelectorAll('.map__filter');

var switchElementsStatus = function (array, status) {
  for (var i = 0; i < array.length; i++) {
    array[i].disabled = status;
  }
};

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  // Включаем все fieldset-ы в блоке формы
  switchElementsStatus(fieldsets, false);
  // Включаем все селекты на форме карты
  switchElementsStatus(mapFilters, false);
  // Включаем чекбоксы на форме карты
  mapForm.querySelector('.map__features').disabled = false;
  generateApartments();
  renderPins();
  validateRoomsAndGuests();
  isActive = true;
};

var deactivatePage = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  // Выключаем все fieldset-ы в блоке формы
  switchElementsStatus(fieldsets, true);
  // Выключаем все селекты на форме карты
  switchElementsStatus(mapFilters, true);
  // Выключаем чекбоксы на форме карты
  mapForm.querySelector('.map__features').disabled = true;
  changeAdress();
  isActive = false;
};

var onMainPinClick = function () {
  if (!isActive) {
    activatePage();
  }
};

var giveCoordMainPin = function () {
  var coords = {};
  coords.x = Math.round(parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2);
  coords.y = Math.round(parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGTH / 2);
  return coords;
};

var changeAdress = function () {
  var coords = giveCoordMainPin();
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
mainPin.addEventListener('click', onMainPinClick);

var deleteCurrentCard = function () {
  var currentCard = document.querySelector('.map__card');
  if (currentCard) {
    currentCard.remove();
  }
};

var onPopupClick = function (evt) {
  evt.preventDefault();
  deleteCurrentCard();
};

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    deleteCurrentCard();
    pinsArea.removeEventListener('keydown', onPopupEscPress);
  }
};

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

deactivatePage();
