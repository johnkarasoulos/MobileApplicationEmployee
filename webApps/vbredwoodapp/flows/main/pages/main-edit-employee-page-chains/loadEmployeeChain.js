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

  class loadEmployeeChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const callRestGetEmployeeResult = await Actions.callRest(context, {
        endpoint: 'businessObjects/get_Employee',
        responseType: 'getEmployeeResponse',
        uriParams: {
          'Employee_Id': $page.variables.employeeId,
        },
      }, { id: 'loadEmployee' });

      if (callRestGetEmployeeResult.ok) {
        $page.variables.employee = callRestGetEmployeeResult.body;
        $page.variables.employeeETag = callRestGetEmployeeResult.headers.get('ETag');
      } else {
        // Create error message
        const errorMessage = callRestGetEmployeeResult.body?.['o:errorDetails']?.[0]?.detail ||
                             `Could not load data: status ${callRestGetEmployeeResult.status}`;
        // Fires a notification event about failed load
        await Actions.fireNotificationEvent(context, {
          summary: 'Could not load data',
          message: errorMessage,
        }, { id: 'fireErrorNotification' });
      }
    }
  }

  return loadEmployeeChain;
});
