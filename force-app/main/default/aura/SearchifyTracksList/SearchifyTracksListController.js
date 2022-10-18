({
    onInit: function(component, event, helper) {
        component.set("v.spinner", true);

        let type = component.get('v.type');
        if(type == 'Favorite Tracks') {
            helper.getFavoriteTracks(component, event, helper);
        } else if(type == 'Tracks Black List') {
            helper.getBlackListTracks(component, event, helper);
        } else if(type == 'Recent Favorite Tracks') {
            helper.getRecentFavoriteTracks(component, event, helper);
        } else if(type == 'Recent Black List Tracks') {
            helper.getRecentBlackListTracks(component, event, helper);
        }
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