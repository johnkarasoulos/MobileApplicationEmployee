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

  class saveEmployeeChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      // Sets the progress variable to true
      $page.variables.saveEmployeeChainInProgress = true;

      // Validates Employee form
      const validateFormResult = await Actions.callChain(context, {
        chain: 'flow:validateFormChain',
        params: {
          validationGroupId: 'validation-group',
        },
      });

      if (validateFormResult === true) {
        const callRestSaveEmployeeResult = await Actions.callRest(context, {
          endpoint: 'businessObjects/update_Employee',
          body: $page.variables.employee,
          uriParams: {
            'Employee_Id': $page.variables.employeeId,
          },
        }, { id: 'saveEmployee' });

        if (callRestSaveEmployeeResult.ok) {
          $page.variables.employee = callRestSaveEmployeeResult.body;
          $page.variables.employeeETag = callRestSaveEmployeeResult.headers.get('ETag');

          await Actions.fireNotificationEvent(context, {
            summary: 'Employee saved',
            message: 'Employee record successfully updated',
            displayMode: 'transient',
            type: 'confirmation',
          }, { id: 'fireSuccessNotification' });

          await Actions.navigateBack(context, {
          }, { id: 'navigateBack' });
        } else {
          // Create error message
          const errorMessage = callRestSaveEmployeeResult.body?.['o:errorDetails']?.[0]?.detail ||
                               `Could not update Employee: status ${callRestSaveEmployeeResult.status}`;
          // Fires a notification event about failed save
          await Actions.fireNotificationEvent(context, {
              summary: 'Save failed',
              message: errorMessage,
          }, { id: 'fireErrorNotification' });
        }
      }

      // Sets the progress variable to false
      $page.variables.saveEmployeeChainInProgress = false;
    }
  }

  return saveEmployeeChain;
});
