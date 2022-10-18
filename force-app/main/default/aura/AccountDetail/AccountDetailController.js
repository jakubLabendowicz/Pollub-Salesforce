({
    handleParam: function(component, event, helper) {
        let id = event.getParam("id");
        component.set('v.id', id);
    },

    viewAccount : function (component, event, helper) {
        var navigateToSObject = $A.get("e.force:navigateToSObject");
        let id = component.get('v.id');
        console.log(id);
        navigateToSObject.setParams({
          "recordId": id,
          "slideDevName": "related"
        });
        navigateToSObject.fire();
    },

    editAccount : function (component, event, helper) {
        var editRecord = $A.get("e.force:editRecord");
        let id = component.get('v.id');
        console.log(id);
        editRecord.setParams({
          "recordId": id
        });
        editRecord.fire();
    }
})