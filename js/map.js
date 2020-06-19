'use strict';

(function () {
  var activate = function (status) {
    if (status) {
      window.consts.map.classList.remove('map--faded');
    } else {
      window.consts.map.classList.add('map--faded');
    }
  };

  window.map = {
    activate: activate
  };

})();
