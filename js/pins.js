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

  var render = function (apartments) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < apartments.length; i++) {
      fragment.appendChild(createPin(apartments[i]));
    }
    pinsArea.appendChild(fragment);
  };

  window.pins = {
    render: render,
  };

})();
