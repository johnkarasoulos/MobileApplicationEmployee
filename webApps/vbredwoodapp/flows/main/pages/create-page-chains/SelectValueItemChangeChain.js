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

  class SelectValueItemChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application } = context;

      const callRestCountriesGetNameNameResult = await Actions.callRest(context, {
        endpoint: 'countries/getNameName',
        uriParams: {
          code: data,
        },
      });

      $page.variables.employee.country = callRestCountriesGetNameNameResult.body[0].name.official;
    }
  }

  return SelectValueItemChangeChain;
});
