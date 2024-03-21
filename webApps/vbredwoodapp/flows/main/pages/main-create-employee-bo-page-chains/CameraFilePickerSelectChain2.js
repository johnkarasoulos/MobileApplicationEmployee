define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class CameraFilePickerSelectChain2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object[]} params.files 
     */
    async run(context, { files }) {
      const { $page, $flow, $application } = context;

      const callRestGetImagesPostResult = await Actions.callRest(context, {
        endpoint: 'getImages/post',
        body: files,
        headers: {
          title: 'zetzerze',
          'content-type': 'image/jpeg',
        },
      });

      $page.variables.employee.picture = callRestGetImagesPostResult.headers.get('Location');
    }
  }

  return CameraFilePickerSelectChain2;
});
