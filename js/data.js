'use strict';

(function () {

  var NUM_OF_APARTS = 8;
  var MAX_ROOMS = 12;
  var MAX_GUESTS = 20;

  var AVATAR_URL = 'img/avatars/user0';
  var TITLES = ['Моя хата с краю', 'Апарты у ЕЖА', 'Квартира бегемота и его друзей', 'Большой дом для грустных людей', 'Квартира с прекрасным видом', 'Болшой квартир для светил', 'Дом для вас', 'Дорогая халупка для жизни'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHEKINS = ['12:00', '13:00', '14:00'];
  var CHEKOUTS = ['12:00', '13:00', '14:00'];
  var FEAUTERES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Описание номер один', 'Описание номер два', 'Описание номер три', 'Описание номер четыре', 'Описание номер пять', 'Описание номер шесть', 'Описание номер семь', 'Описание номер восемь'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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
    var apartments = [];
    for (var i = 0; i < NUM_OF_APARTS; i++) {
      var coordX = getRandomNumber(0, window.map.MAP_WIDTH);
      var coordY = getRandomNumber(window.map.MAP_MIN_Y, window.map.MAP_MAX_Y);
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
    return apartments;
  };

  window.data = {
    generateApartments: generateApartments
  };

})();
