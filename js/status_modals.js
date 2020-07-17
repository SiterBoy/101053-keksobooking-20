'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var errorMessage = function (message) {
    var currentError = errorTemplate.cloneNode(true);
    currentError.querySelector('.error__message').textContent = message;

    currentError.querySelector('.error__button').addEventListener('click', function () {
      currentError.remove();
    });

    var onEscPress = function (evt) {
      evt.preventDefault();
      if (evt.key === 'Escape') {
        currentError.remove();
        document.removeEventListener('keydown', onEscPress);
      }
    };

    var onDocumentClick = function () {
      currentError.remove();
      document.removeEventListener('click', onDocumentClick);
    };

    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', onDocumentClick);

    currentError = main.appendChild(currentError);
  };


  var successMessage = function () {
    var currentSuccess = successTemplate.cloneNode(true);

    var onEscPress = function (evt) {
      if (evt.key === 'Escape') {
        currentSuccess.remove();
        document.removeEventListener('keydown', onEscPress);
      }
    };

    var onDocumentClick = function () {
      window.card.deleteCurrent();
      currentSuccess.remove();
      document.removeEventListener('click', onDocumentClick);
    };

    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', onDocumentClick);
    main.appendChild(currentSuccess);
  };

  window.statusModals = {
    errorMessage: errorMessage,
    successMessage: successMessage
  };

})();
