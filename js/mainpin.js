'use strict';
(function () {

  var MAIN_PIN_HEIGTH = 70;
  var MAIN_PIN_WIDTH = 65;

  var START_COORD_X = 602;
  var START_COORD_Y = 445;

  var MIN_X = 0;
  var MAX_X = window.map.MAP_WIDTH;
  var MIN_Y = window.map.MAP_MIN_Y;
  var MAX_Y = window.map.MAP_MAX_Y;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var giveCoordsOfTarget = function () {
    return {
      x: Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2),
      y: Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGTH)
    };
  };

  var setPosition = function (x, y) {
    mainPin.style.left = (x - MAIN_PIN_WIDTH / 2) + 'px';
    mainPin.style.top = (y - MAIN_PIN_HEIGTH) + 'px';
  };

  var setStartPisition = function () {
    setPosition(START_COORD_X, START_COORD_Y);
    window.form.changeAdress();
  };

  var onMainPinEnterPress = function () {
    window.main.activatePage();
    document.removeEventListener('keypress', onMainPinEnterPress);
  };

  var init = function () {
    document.addEventListener('keypress', onMainPinEnterPress);
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
    init: init,
    giveCoordsOfTarget: giveCoordsOfTarget,
    setStartPisition: setStartPisition
  };

})();
