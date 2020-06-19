'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsArea = document.querySelector('.map__pins');

  var giveCoordMainPin = function () {
    var coords = {};
    coords.x = Math.round(parseInt(window.consts.mainPin.style.left, 10) + window.consts.MAIN_PIN_WIDTH / 2);
    coords.y = Math.round(parseInt(window.consts.mainPin.style.top, 10) + window.consts.MAIN_PIN_HEIGTH / 2);
    return coords;
  };


  var createPin = function (apartment) {
    var onePin = pinTemplate.cloneNode(true);
    onePin.dataset.id = apartment.id;
    var pinImage = onePin.querySelector('img');
    var pinX = apartment.location.x - window.consts.PIN_WIDTH / 2;
    var pinY = apartment.location.y - window.consts.PIN_HEIGHT;
    onePin.style.cssText = 'left:' + pinX + 'px; top:' + pinY + 'px;';
    pinImage.src = apartment.author;
    pinImage.alt = apartment.offer.title;

    onePin.addEventListener('click', function () {
      window.card.deleteCurrent();
      window.card.render(apartment);
      window.card.addCloseEvents();
    });
    return onePin;
  };

  var render = function (apartments) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < apartments.length; i++) {
      fragment.appendChild(createPin(apartments[i]));
    }
    pinsArea.appendChild(fragment);
  };

  window.pins = {
    render: render,
    giveCoordMainPin: giveCoordMainPin
  };

})();
