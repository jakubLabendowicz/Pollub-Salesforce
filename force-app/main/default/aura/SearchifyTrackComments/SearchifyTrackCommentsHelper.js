({
    getComments : function(component, event, helper, spotifyId, id) {
        var action = component.get("c.getComments");
        var objects;
        action.setParams({
            spotifyId : spotifyId,
            id: id
            });
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                objects = response.getReturnValue();
                component.set('v.objects', objects);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    },

    getShowNewButton : function(component, event, helper, spotifyId, id) {
        var action = component.get("c.getShowNewButton");
        action.setParams({
            spotifyId : spotifyId,
            id: id
        });
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let showNewButton = response.getReturnValue();
                component.set("v.showNewButton", showNewButton);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    },

    showNew: function(component, event, helper) {
        let object = component.get('v.object');
        object.Contents__c = "";
        component.set('v.object', object);
        component.set('v.showNew', true);
    },

    closeNew: function(component, event, helper) {
        component.set('v.showNew', false);
    },

    insertComment : function(component, event, helper, spotifyId, id) {
        let action = component.get("c.insertComment");
        let object = component.get('v.object');
        object.SpotifyId__c = spotifyId;
        object.TrackId__c = id;
        action.setParams({comment : object});
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let objects = response.getReturnValue();
//                component.set('v.objects', objects);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    },
})