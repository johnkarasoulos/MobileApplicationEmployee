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

  class WelcomePageTemplateSpSecondaryActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const navigateToPageMainEditEmployeeResult = await Actions.navigateToPage(context, {
        page: 'main-edit-employee',
      });
    }
  }

  return WelcomePageTemplateSpSecondaryActionChain;
});
