'use strict';

(function () {

  var onLoad = function (response) {
    window.main.apartments = response.slice();
    window.filters.init(window.main.apartments);
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
    deactivatePage: deactivatePage,
    activatePage: activatePage
  };

})();
