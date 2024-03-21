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

  class deleteEmployeeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.employeeId 
     */
    async run(context, { employeeId }) {
      const { $page, $flow, $application } = context;

      const callRestDeleteEmployeeResult = await Actions.callRest(context, {
        endpoint: 'businessObjects/delete_Employee',
        uriParams: {
          'Employee_Id': employeeId,
        },
      }, { id: 'deleteEmployee' });

      if (callRestDeleteEmployeeResult.ok) {
        // Resets selection variable
        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.oj_list_view_241630953_1SelectedId',
          ],
        }, { id: 'resetSelection' });

        await Actions.fireDataProviderEvent(context, {
          target: $page.variables.employeeListSDP,
          refresh: null,
        }, { id: 'refreshDataProvider' });

        await Actions.fireNotificationEvent(context, {
          summary: 'Employee deleted',
          message: `Employee [${employeeId}] successfully deleted`,
          displayMode: 'transient',
          type: 'confirmation',
        }, { id: 'fireSuccessNotification' });
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Delete failed',
          message: `Could not delete data: status ${callRestDeleteEmployeeResult.status}`,
          displayMode: 'persist',
          type: 'error',
        }, { id: 'fireErrorNotification' });
      }
    }
  }

  return deleteEmployeeChain;
});
