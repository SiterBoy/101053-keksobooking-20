'use strict';

(function () {

  var NUM_OF_APARTS = 8;
  var MAP_WIDTH = 1200;
  var MAP_MIN_Y = 130;
  var MAP_MAX_Y = 630;
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var MAIN_PIN_HEIGTH = 80;
  var MAIN_PIN_WIDTH = 65;
  var MAX_ROOMS = 12;
  var MAX_GUESTS = 20;

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var adForm = document.querySelector('.ad-form');
  var mapForm = mapFiltersContainer.querySelector('.map__filters');
  var mainPin = document.querySelector('.map__pin--main');

  window.consts = {
    MAX_ROOMS: MAX_ROOMS,
    MAX_GUESTS: MAX_GUESTS,
    NUM_OF_APARTS: NUM_OF_APARTS,
    MAP_WIDTH: MAP_WIDTH,
    MAP_MIN_Y: MAP_MIN_Y,
    MAP_MAX_Y: MAP_MAX_Y,
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
    MAIN_PIN_HEIGTH: MAIN_PIN_HEIGTH,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    map: map,
    mapFiltersContainer: mapFiltersContainer,
    adForm: adForm,
    mapForm: mapForm,
    mainPin: mainPin
  };

})();
