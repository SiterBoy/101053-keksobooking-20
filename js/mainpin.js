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

  var giveCoords = function () {
    var coords = {
      x: Math.round(parseInt(mainPin.style.left, 10)),
      y: Math.round(parseInt(mainPin.style.top, 10))
    };
    return coords;
  };

  var giveCoordsOfTarget = function () {
    var coords = {
      x: Math.floor(parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2),
      y: Math.floor(parseInt(mainPin.style.top, 10)) + MAIN_PIN_HEIGTH
    };
    return coords;
  };

  var onMainPinClick = function (evt) {
    evt.preventDefault();
    if (!window.main.isActive) {
      window.main.activatePage();
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      var currentCoords = giveCoords();

      var realXOffsetPin = Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2);
      var realYOffsetPin = Math.floor(mainPin.offsetTop + MAIN_PIN_HEIGTH);

      var deltaCoords = {
        x: evtMove.clientX - startCoords.x,
        y: evtMove.clientY - startCoords.y
      };

      startCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      if (realXOffsetPin >= MIN_X && realXOffsetPin <= MAX_X) {
        mainPin.style.left = currentCoords.x + deltaCoords.x + 'px';
      } else if (realXOffsetPin < MIN_X) {
        mainPin.style.left = MIN_X - MAIN_PIN_WIDTH / 2 + 'px';
      } else {
        mainPin.style.left = MAX_X - MAIN_PIN_WIDTH / 2 + 'px';
      }

      if (realYOffsetPin >= 130 && realYOffsetPin <= 630 + MAIN_PIN_HEIGTH) {
        mainPin.style.top = currentCoords.y + deltaCoords.y + 'px';
      } else if (realYOffsetPin < 130) {
        mainPin.style.top = MIN_Y - MAIN_PIN_HEIGTH + 'px';
      } else {
        mainPin.style.top = MAX_Y + 'px';
      }

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
