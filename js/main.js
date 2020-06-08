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
var apartments = [];

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsArea = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var map = document.querySelector('.map');
var mapFiltersContainer = map.querySelector('.map__filters-container');

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
  var pinImage = onePin.querySelector('img');
  var pinX = apartment.location.x - PIN_WIDTH / 2;
  var pinY = apartment.location.y - PIN_HEIGHT;
  onePin.style.cssText = 'left:' + pinX + 'px; top:' + pinY + 'px;';
  pinImage.src = apartment.author;
  pinImage.alt = apartment.offer.title;
  return onePin;
};

var renderPins = function () {
  generateApartments();
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


map.classList.remove('map--faded');
renderPins();

var renderCard = function (data) {
  var card = createCard(data);
  mapFiltersContainer.insertAdjacentElement('beforebegin', card);
};

renderCard(apartments[0]);




