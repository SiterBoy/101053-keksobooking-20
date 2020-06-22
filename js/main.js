'use strict';

(function () {

  var apartments = window.data.generateApartments();

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
    isActive: isActive,
    activatePage: activatePage
  };

})();
