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
          validationGroupId: 'validation-group',
        },
      }, { id: 'validateEmployee' });

      if (validateFormResult === true) {
        const callRestCreateEmployeeResult = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_Employee',
          body: $page.variables.employee,
        }, { id: 'createEmployee' });

        if (callRestCreateEmployeeResult.ok) {
          await Actions.fireNotificationEvent(context, {
            summary: 'Employee saved',
            message: 'Employee record successfully created',
            displayMode: 'transient',
            type: 'confirmation',
          }, { id: 'fireSuccessNotification' });

          await Actions.navigateBack(context, {
          }, { id: 'navigateBack' });
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
