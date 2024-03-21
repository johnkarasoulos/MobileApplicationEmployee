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

  class ButtonActionChain1 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      const geolocationResult = await Actions.geolocation(context, {
      });

      $page.variables.employee.country = geolocationResult.coords.latitude +" and " + geolocationResult.coords.longitude;
    }
  }

  return ButtonActionChain1;
});
