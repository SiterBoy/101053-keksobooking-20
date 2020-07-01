'use strict';

(function () {

  var errorMessage = function (message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var currentError = errorTemplate.cloneNode(true);
    currentError.querySelector('.error__message').textContent = message;
    currentError.querySelector('.error__button').addEventListener('click', function () {
      document.body.removeChild(currentError);
    });

    document.body.appendChild(currentError);
  };

  window.statusModals = {
    errorMessage: errorMessage
  };

})();
