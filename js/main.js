'use strict';

(function () {
  var apartments = [];

  var onLoad = function (response) {
    apartments = response;
  };

  var onError = function (error) {
    window.statusModals.errorMessage('Данные не были получены с сервера. Ошибка: ' + error);
  };

  window.backend.load(onLoad, onError);

  var isActive = false;

  var activatePage = function () {
    window.map.activate();
    window.pins.render(apartments);
    window.form.activate();
    isActive = true;
  };

  var deactivatePage = function () {
    window.map.deactivate();
    window.form.deactivate();
    isActive = false;
  };

  deactivatePage();

  window.main = {
    apartments: apartments,
    isActive: isActive,
    activatePage: activatePage
  };

})();
