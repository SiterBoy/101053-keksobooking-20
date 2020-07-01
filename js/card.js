'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var createFeatures = function (features) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var li = document.createElement('li');
      li.classList = 'popup__feature popup__feature--' + features[i];
      fragment.appendChild(li);
    }
    return fragment;
  };

  var createFotos = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var img = document.createElement('img');
      img.src = photos[i];
      img.classList.add('popup__photo');
      img.alt = 'Фотография жилья';
      img.width = 45;
      img.height = 40;
      fragment.appendChild(img);
    }
    return fragment;
  };

  var createTimeSentense = function (rooms, guests) {
    var roomsEnd = '';
    var guestsEnd = 'ей';
    switch (rooms) {
      case 1:
        roomsEnd = 'a';
        break;
      case 2:
      case 3:
      case 4:
        roomsEnd = 'ы';
        break;
    }

    if (guests === 1) {
      guestsEnd = 'я';
    }
    return rooms + ' комнат' + roomsEnd + ' для ' + guests + ' гост' + guestsEnd;
  };


  var createCard = function (apartment) {
    var oneCard = cardTemplate.cloneNode(true);
    var cardImg = oneCard.querySelector('.popup__avatar');
    var typeOfApart = '';
    switch (apartment.offer.type) {
      case 'flat':
        typeOfApart = 'Квартира';
        break;
      case 'bungalo':
        typeOfApart = 'Бунгало';
        break;
      case 'house':
        typeOfApart = 'Дом';
        break;
      case 'palace':
        typeOfApart = 'Дворец';
        break;
    }

    cardImg.src = apartment.author.avatar;
    cardImg.alt = apartment.offer.title;
    oneCard.querySelector('.popup__avatar').src = apartment.author.avatar;
    oneCard.querySelector('.popup__title').textContent = apartment.offer.title;
    oneCard.querySelector('.popup__text--address').textContent = apartment.offer.address;
    oneCard.querySelector('.popup__text--price').textContent = apartment.offer.price + '₽/ночь';
    oneCard.querySelector('.popup__type').textContent = typeOfApart;
    oneCard.querySelector('.popup__text--capacity').textContent = createTimeSentense(apartment.offer.rooms, apartment.offer.guests);
    oneCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + apartment.offer.checkin + ', выезд до ' + apartment.offer.checkout;
    oneCard.querySelector('.popup__features').innerHTML = '';
    oneCard.querySelector('.popup__features').appendChild(createFeatures(apartment.offer.features));
    oneCard.querySelector('.popup__description').textContent = apartment.offer.description;
    oneCard.querySelector('.popup__photos').innerHTML = '';
    oneCard.querySelector('.popup__photos').appendChild(createFotos(apartment.offer.photos));
    return oneCard;
  };

  var render = function (apartment) {
    var card = createCard(apartment);
    window.map.mapFiltersContainer.insertAdjacentElement('beforebegin', card);
  };

  var addCloseEvents = function () {
    var popupCard = document.querySelector('.popup__close');
    popupCard.addEventListener('click', window.card.onPopupClick);
    document.addEventListener('keydown', window.card.onPopupEscPress);
  };

  var deleteCurrent = function () {
    var currentCard = document.querySelector('.map__card');
    if (currentCard) {
      currentCard.remove();
    }
  };

  var onPopupClick = function (evt) {
    evt.preventDefault();
    deleteCurrent();
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      deleteCurrent();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  window.card = {
    deleteCurrent: deleteCurrent,
    render: render,
    onPopupClick: onPopupClick,
    onPopupEscPress: onPopupEscPress,
    addCloseEvents: addCloseEvents
  };

})();


