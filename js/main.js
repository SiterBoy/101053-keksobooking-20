'use strict';

(function () {

  var apartments = window.data.generateApartments();

  var isActive = false;

  var activatePage = function () {
    window.consts.map.classList.remove('map--faded');
    window.consts.adForm.classList.remove('ad-form--disabled');
    window.pins.renderPins(apartments);
    window.form.init(true);
    isActive = true;
  };

  var deactivatePage = function () {
    window.consts.map.classList.add('map--faded');
    window.consts.adForm.classList.add('ad-form--disabled');
    window.form.init(false);
    isActive = false;
  };

  var onMainPinClick = function () {
    if (!isActive) {
      activatePage();
    }
  };

  window.consts.mainPin.addEventListener('click', onMainPinClick);

  deactivatePage();

  window.main = {
    apartments: apartments,
  };

})();
