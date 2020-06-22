'use strict';
(function () {

  var MAIN_PIN_HEIGTH = 70;
  var MAIN_PIN_WIDTH = 65;

  var MIN_X = 0;
  var MAX_X = window.map.MAP_WIDTH;
  var MIN_Y = window.map.MAP_MIN_Y;
  var MAX_Y = window.map.MAP_MAX_Y;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var giveCoordsOfTarget = function () {
    var coords = {
      x: Math.floor(parseInt(mainPin.style.left, 10) - MAIN_PIN_WIDTH / 2),
      y: Math.floor(parseInt(mainPin.style.top, 10)) - MAIN_PIN_HEIGTH
    };
    return coords;
  };

  var setPosition = function (x, y) {
    mainPin.style.left = x + 'px';
    mainPin.style.top = y + 'px';
  };

  var onMainPinClick = function (evt) {
    evt.preventDefault();
    if (!window.main.isActive) {
      window.main.activatePage();
    }

    var startCoords = giveCoordsOfTarget();
    var startX = evt.clientX;
    var startY = evt.clientY;

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      var shiftX = evtMove.clientX - startX;
      var shiftY = evtMove.clientY - startY;

      var coordX = startCoords.x + shiftX;
      var coordY = startCoords.y + shiftY;

      coordX = MIN_X > coordX ? MIN_X : coordX;
      coordX = MAX_X < coordX ? MAX_X : coordX;

      coordY = MIN_Y > coordY ? MIN_Y : coordY;
      coordY = MAX_Y < coordY ? MAX_Y : coordY;

      setPosition(coordX, coordY);

      window.form.changeAdress();

    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.form.changeAdress();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  };

  mainPin.addEventListener('mousedown', onMainPinClick);

  window.mainPin = {
    giveCoordsOfTarget: giveCoordsOfTarget,
  };

})();
