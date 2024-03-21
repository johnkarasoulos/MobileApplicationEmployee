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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callChainCameraFilePickerSelectChainResult = await Actions.callChain(context, {
        chain: 'CameraFilePickerSelectChain',
      });
    }
  }

  return ButtonActionChain;
});