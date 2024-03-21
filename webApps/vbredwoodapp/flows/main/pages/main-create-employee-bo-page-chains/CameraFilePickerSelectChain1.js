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

  class CameraFilePickerSelectChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object[]} params.files 
     */
    async run(context, { files }) {
      const { $page, $flow, $application } = context;

      const callRestGetImagesPostResult = await Actions.callRest(context, {
        endpoint: 'getImages/post',
        headers: {
          title: $page.variables.employee.name,
          'content-type': 'application/octet-stream',
        },
        body: files,
      });

      if (!callRestGetImagesPostResult.ok) {
        await Actions.fireNotificationEvent(context, {
          message: callRestGetImagesPostResult.status,
          summary: 'Error',
        });
      
        return;
      }

      $page.variables.employee.picture = callRestGetImagesPostResult.headers.get('content-location');
    }
  }

  return CameraFilePickerSelectChain1;
});
