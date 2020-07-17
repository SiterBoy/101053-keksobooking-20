'use strict';

(function () {

  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsArea = document.querySelector('.map__pins');

  var createPin = function (apartment) {
    var onePin = pinTemplate.cloneNode(true);
    var pinImage = onePin.querySelector('img');
    var pinX = apartment.location.x - PIN_WIDTH / 2;
    var pinY = apartment.location.y - PIN_HEIGHT;
    onePin.style.cssText = 'left:' + pinX + 'px; top:' + pinY + 'px;';
    pinImage.src = apartment.author.avatar;
    pinImage.alt = apartment.offer.title;

    onePin.addEventListener('click', function () {
      window.card.deleteCurrent();
      window.card.render(apartment);
      window.card.addCloseEvents();
    });
    return onePin;
  };

  var clean = function () {
    var pins = pinsArea.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (elem) {
      elem.remove();
    });
  };

  var render = function (apartments) {
    clean();

    var fragment = document.createDocumentFragment();
    apartments.forEach(function (elem) {
      fragment.appendChild(createPin(elem));
    });
    pinsArea.appendChild(fragment);
  };

  window.pins = {
    render: render,
    clean: clean
  };

})();
