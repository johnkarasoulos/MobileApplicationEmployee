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

  class navigateToCreateEmployeeChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;
      const navigateToPageMainCreateEmployeeBoResult = await Actions.navigateToPage(context, {
        page: 'main-create-employee-bo',
        params: {},
      });
    }
  }

  return navigateToCreateEmployeeChain;
});
