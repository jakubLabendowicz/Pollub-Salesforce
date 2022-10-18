({
      init: function(component, event, helper) {
          helper.getAccountsByName(component, "");
      },

      searchAccountsByName: function(component, event, helper) {
          helper.getAccountsByName(component, event.getParam("value"));
      }
})