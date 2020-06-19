'use strict';

(function () {

  var apartments = window.data.generateApartments();

  var isActive = false;

  var activatePage = function () {
    window.map.activate(true);
    window.pins.render(apartments);
    window.form.activate(true);
    isActive = true;
  };

  var deactivatePage = function () {
    window.map.activate(false);
    window.form.activate(false);
    isActive = false;
  };

  var onMainPinClick = function () {
    if (!isActive) {
      activatePage();
    }
  };

  window.consts.mainPin.addEventListener('click', onMainPinClick);

  deactivatePage();

})();
