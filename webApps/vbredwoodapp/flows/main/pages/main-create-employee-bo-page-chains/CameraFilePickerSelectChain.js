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

  class CameraFilePickerSelectChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object[]} params.files 
     */
    async run(context, { files }) {
      const { $page, $flow, $application } = context;

      const callRestGetImagesPost2Result = await Actions.callRest(context, {
        endpoint: 'getImages/post',
        headers: {
          title: 'test',
          'content-type': 'image/jpeg',
        },
        body: files[0],
      });

      if (callRestGetImagesPost2Result.ok) {
        $page.variables.employee.picture = callRestGetImagesPost2Result.headers.get('Location');
      }
    }
  }

  return CameraFilePickerSelectChain;
});
