'use strict';

(function () {

  var MAP_WIDTH = 1200;
  var MAP_MIN_Y = 130;
  var MAP_MAX_Y = 630;

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  var activate = function () {
    map.classList.remove('map--faded');
  };

  var deactivate = function () {
    map.classList.add('map--faded');
  };

  window.map = {
    activate: activate,
    deactivate: deactivate,
    MAP_WIDTH: MAP_WIDTH,
    MAP_MIN_Y: MAP_MIN_Y,
    MAP_MAX_Y: MAP_MAX_Y,
    mapFiltersContainer: mapFiltersContainer
  };

})();
