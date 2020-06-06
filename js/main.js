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
        price: getRandomNumber(1, 1000000),
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

var generatePin = function (apartment) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var onePin = pinTemplate.cloneNode(true);
  var pinImage = onePin.querySelector('img');
  onePin.style.cssText = 'left:' + (apartment.location.x + PIN_WIDTH / 2) + 'px; top:' + (apartment.location.y + PIN_HEIGHT) + 'px;';
  pinImage.src = apartment.author;
  pinImage.alt = apartment.offer.title;
  return onePin;
};

var renderPins = function () {
  generateApartments();
  document.querySelector('.map').classList.remove('map--faded');
  var pinsArea = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < apartments.length; i++) {
    fragment.appendChild(generatePin(apartments[i]));
  }
  pinsArea.appendChild(fragment);
};

renderPins();
