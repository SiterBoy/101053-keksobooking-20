'use strict';

(function () {

  var IMAGES_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

  var userAvatarChooser = document.querySelector('.ad-form__field input[type="file"]');
  var userAvatarElem = document.querySelector('.ad-form-header__preview');
  var userApartPhotoChooser = document.querySelector('.ad-form__upload input[type="file"]');
  var userApartPhotoElem = document.querySelector('.ad-form__photo');

  var createImg = function (image, parent) {
    var createdImg = document.createElement('img');
    createdImg.src = image;
    createdImg.classList.add('apart_preview');
    parent.appendChild(createdImg);
  };

  var createReader = function (file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    return reader;
  };

  var validateImage = function (file, evt) {
    var validity = IMAGES_TYPES.some(function (it) {
      return it === file.type;
    });

    if (!validity) {
      evt.target.setCustomValidity('Файл должен быть изображением');
    } else {
      evt.target.setCustomValidity('');
    }

    evt.target.reportValidity();
    return validity;
  };

  var onAvatarChose = function (evt) {
    var imgElem = userAvatarElem.querySelector('img');
    var file = evt.target.files[0];
    if (file && validateImage(file, evt)) {
      var reader = createReader(file);
      reader.addEventListener('load', function () {
        imgElem.src = reader.result;
      });
    }
  };

  var onApartImageChose = function (evt) {
    var file = evt.target.files[0];
    if (file && validateImage(file, evt)) {
      var reader = createReader(file);
      reader.addEventListener('load', function () {
        createImg(reader.result, userApartPhotoElem);
      });
    }
  };

  userAvatarChooser.addEventListener('change', onAvatarChose);
  userApartPhotoChooser.addEventListener('change', onApartImageChose);

})();
