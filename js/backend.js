'use strict';

(function () {

  var LOAD_URL = 'https://javascript.pages.academy/keksobooking/data';

  var createXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    });

    xhr.addEventListener('timeout', function () {
      window.statusModals.errorMessage('Превышен интервал ожидания запроса');
    });

    xhr.addEventListener('error', function () {
      window.statusModals.errorMessage('непредвиденная ошибка! Попробуйте перезагрузить страницу.');
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  window.backend = {
    load: load
  };

})();
