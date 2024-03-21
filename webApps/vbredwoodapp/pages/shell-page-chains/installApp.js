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

  class installApp extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{getInstallPromptEvent:object}} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application } = context;

      const callComponentMethodInstallDialogOpenResult = await Actions.callComponentMethod(context, {
        selector: '#installDialog',
        method: 'open',
      });
    }
  }

  return installApp;
});
