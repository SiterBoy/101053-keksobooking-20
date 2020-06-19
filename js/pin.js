'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsArea = document.querySelector('.map__pins');

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
      window.card.deleteCurrentCard();
      window.card.renderCard(apartment);
      var popupCard = document.querySelector('.popup__close');
      popupCard.addEventListener('click', window.card.onPopupClick);
      document.addEventListener('keydown', window.card.onPopupEscPress);
    });
    return onePin;
  };

  var renderPins = function (apartments) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < apartments.length; i++) {
      fragment.appendChild(createPin(apartments[i]));
    }
    pinsArea.appendChild(fragment);
  };

  window.pins = {
    renderPins: renderPins
  };

})();
