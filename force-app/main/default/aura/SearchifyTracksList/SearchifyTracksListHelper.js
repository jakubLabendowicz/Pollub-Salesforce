({
    getFavoriteTracks: function(component, event, query) {
        var action = component.get("c.getFavoriteTracks");
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let limit = component.get('v.limit');
                let offset = component.get('v.offset');
                let objects = response.getReturnValue();
                let objectsToDisplay = [];
                let index = 0;
                for(let object of objects) {
                    if(index < limit + offset && index >= offset) {
                        objectsToDisplay.push(object);
                    }
                    index++;
                }
                component.set('v.objects', objectsToDisplay);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    },

    getBlackListTracks: function(component, event, query) {
        var action = component.get("c.getBlackListTracks");
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let limit = component.get('v.limit');
                let offset = component.get('v.offset');
                let objects = response.getReturnValue();
                let objectsToDisplay = [];
                let index = 0;
                for(let object of objects) {
                    if(index < limit + offset && index >= offset) {
                        objectsToDisplay.push(object);
                    }
                    index++;
                }
                component.set('v.objects', objectsToDisplay);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    },

    getRecentFavoriteTracks: function(component, event, query) {
        var action = component.get("c.getFavoriteTracks");
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let limit = component.get('v.limit');
                let offset = component.get('v.offset');
                let objects = response.getReturnValue();
                let objectsToDisplay = [];
                let index = 0;
                for(let object of objects) {
                    if(index < limit + offset && index >= offset) {
                        objectsToDisplay.push(object);
                    }
                    index++;
                }
                component.set('v.objects', objectsToDisplay);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    },

    getRecentBlackListTracks: function(component, event, query) {
        var action = component.get("c.getBlackListTracks");
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let limit = component.get('v.limit');
                let offset = component.get('v.offset');

                let objects = response.getReturnValue();
                let objectsToDisplay = [];
                let index = 0;
                for(let object of objects) {
                    if(index < limit + offset && index >= offset) {
                        objectsToDisplay.push(object);
                    }
                    index++;
                }
                component.set('v.objects', objectsToDisplay);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    },
})