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

  class ojListView2416309531ChangeSelectionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.employeeId
     */
    async run(context, { employeeId }) {
      const { $page, $flow, $application } = context;
      $page.variables.oj_list_view_241630953_1SelectedId = employeeId;
    }
  }

  return ojListView2416309531ChangeSelectionChain;
});
