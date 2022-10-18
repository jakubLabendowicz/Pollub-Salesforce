({
    onInit: function(component, event, helper) {
        component.set("v.spinner", true);

        const spotifyId = component.get('v.spotifyId');
        const id = component.get('v.id');
        const type = component.get('v.type');
        helper.getObjects(component, event, helper, spotifyId, id, type);
    },

    onViewChange: function(component, event, helper) {
        component.set("v.spinner", true);
        
        const view = component.get('v.view');
        if(view == "List") {
            component.set("v.view", "Tiles");
        } else {
            component.set("v.view", "List");
        }
    },

    hideSpinner: function(component, event, helper) {
        component.set("v.spinner", false);
    },
})