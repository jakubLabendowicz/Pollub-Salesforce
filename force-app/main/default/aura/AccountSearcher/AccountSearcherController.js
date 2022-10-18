({
    handleParam: function(component, event, helper) {
        let name = event.getParam("name");
        component.set('v.name', name);
    }
})