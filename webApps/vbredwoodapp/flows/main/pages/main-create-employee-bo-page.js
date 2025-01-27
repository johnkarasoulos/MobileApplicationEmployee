define([], function () {
'use strict';

  var PageModule = function PageModule() {};

    /**
     *
     * @param {String} arg1
     * @return {String}
     */
    PageModule.prototype.addImageFile = function (file) {
      return new Promise(resolve => {
        const blobURL = URL.createObjectURL(file);
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          // convert image file to base64 string
          console.log(reader.result);
          resolve({
            data: reader.result,
            url: blobURL
          });
          document.getElementById("mypic").onload = function () {
            URL.revokeObjectURL(blobURL);
          };
        }, false);

        if (file) {
          reader.readAsDataURL(file);
        }
      });
    };
  
  return PageModule;
});
