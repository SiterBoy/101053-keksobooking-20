'use strict';

(function () {

  var map = document.querySelector('.map');

  var errorMessage = function (message) {
    var elem = document.createElement('div');
    elem.textContent = message;
    elem.classList.add('errorMessage');

    map.appendChild(elem);

    setTimeout(function () {
      map.removeChild(elem);
    }, 3000);
  };

  window.statusModals = {
    errorMessage: errorMessage
  };

})();
