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

  class ListViewSwipeActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.navigationItem
     * @param {string} params.employeeId
     * @param {any} params.rowData
     */
    async run(context, { navigationItem, employeeId, rowData }) {
      const { $page, $flow, $application } = context;
      switch (navigationItem) {
        case 'add':
          const callChainNavigateToCreateEmployeeChainResult = await Actions.callChain(context, {
            chain: 'navigateToCreateEmployeeChain',
          });
          break;
        case 'delete':
          const callChainDeleteEmployeeChainResult = await Actions.callChain(context, {
            chain: 'deleteEmployeeChain',
            params: {
              employeeId: employeeId,
            },
          });
          break;
        default:
          break;
      }
    }
  }

  return ListViewSwipeActionChain;
});
