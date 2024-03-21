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

  class createEmployeeChain extends ActionChain {

    /**
     * Saves changes and creates new Employee record.
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      // Sets the progress variable to true
      $page.variables.createEmployeeChainInProgress = true;

      // Validates Employee form
      const validateFormResult = await Actions.callChain(context, {
        chain: 'flow:validateFormChain',
        params: {
          validationGroupId: 'employee-validation-group-1777832857-1',
        },
      }, { id: 'validateEmployee' });

      if (validateFormResult) {
        // Call REST creating new Employee record
        const callRestCreateEmployeeResult = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_Employee',
          body: $page.variables.employee,
        }, { id: 'saveEmployee' });

        if (callRestCreateEmployeeResult.ok) {
          // Fires a notification event about successful save
          await Actions.fireNotificationEvent(context, {
            summary: 'Employee saved',
            message: 'Employee record successfully created',
            displayMode: 'transient',
            type: 'confirmation',
          }, { id: 'fireSuccessNotification' });

          // Resets employee variable to the default state
          await Actions.resetVariables(context, {
            variables: [
              '$page.variables.employee',
            ],
          }, { id: 'resetEmployee' });
        } else {
          // Create error message
          const errorMessage = callRestCreateEmployeeResult.body?.['o:errorDetails']?.[0]?.detail ||
                               `Could not create new Employee: status ${callRestCreateEmployeeResult.status}`;
          // Fires a notification event about failed save
          await Actions.fireNotificationEvent(context, {
              summary: 'Save failed',
              message: errorMessage,
          }, { id: 'fireErrorNotification' });
        }
      }

      // Sets the progress variable to false
      $page.variables.createEmployeeChainInProgress = false;
    }
  }

  return createEmployeeChain;
});
