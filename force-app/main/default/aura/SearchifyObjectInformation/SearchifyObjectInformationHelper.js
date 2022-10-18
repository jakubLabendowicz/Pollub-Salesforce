({
    getObject : function(component, event, helper, spotifyId, id, type) {
        if(type == 'Track') {
            var action = component.get("c.getTrack");
        } else if(type == 'Artist') {
           var action = component.get("c.getArtist");
       }
       action.setParams({
           spotifyId : spotifyId,
           id: id
           });
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let object = response.getReturnValue();
                let objects = [object];
                component.set('v.object', objects);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    },
})