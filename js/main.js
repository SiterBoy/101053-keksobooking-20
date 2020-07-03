'use strict';

(function () {
  var apartments = [];

  var onLoad = function (response) {
    apartments = response;
    window.pins.render(apartments);
  };

  var onError = function (error) {
    window.statusModals.errorMessage('Данные не были получены с сервера. Ошибка: ' + error);
  };

  var isActive = false;

  var activatePage = function () {
    window.backend.load(onLoad, onError);
    window.map.activate();
    window.form.activate();
    isActive = true;
  };

  var deactivatePage = function () {
    window.pins.clean();
    window.map.deactivate();
    window.form.deactivate();
    isActive = false;
  };

  deactivatePage();

  window.main = {
    isActive: isActive,
    apartments: apartments,
    deactivatePage: deactivatePage,
    activatePage: activatePage
  };

})();
