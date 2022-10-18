({
    onInit: function(component, event, helper) {
        component.set("v.spinner", true);
        
        const preObject = component.get('v.preObject');
        const spotifyId = component.get('v.spotifyId');
        const id = component.get('v.id');
        const type = component.get('v.type');
        const getObject = component.get('v.getObject');

        if(getObject == false) {
            var object = [preObject];
            component.set("v.object", object);
        } else {
            helper.getObject(component, event, helper, spotifyId, id, type);
        }
    },

    hideSpinner: function(component, event, helper) {
        component.set("v.spinner", false);
    },
})