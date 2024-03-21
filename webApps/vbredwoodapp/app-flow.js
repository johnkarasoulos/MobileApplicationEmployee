/* Copyright (c) 2023, Oracle and/or its affiliates */

define(['oj-sp/spectra-shell/config/config'], function() {
  'use strict';

  var AppModule = function AppModule() {};

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.addImage = function (file) {
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

  return AppModule;
});
