({
    init: function (component, event, helper) {
        helper.getMapMarkersByName(component, "");
    },

    onSelectMethod: function(component, event, helper) {
        helper.onSelect(component, event);
    },

    handleIdParam: function(component, event, helper) {
        let id = event.getParam("id");
        console.log("AccountMapController: " + id);
        helper.getMapMarkersById(component, id);
    },

    handleNameParam: function(component, event, helper) {
        let name = event.getParam("name");
        console.log("AccountMapController: " + name);
        helper.getMapMarkersByName(component, name);
    }
});