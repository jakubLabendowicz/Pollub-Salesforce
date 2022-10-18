({
    getObjects : function(component, event, helper, spotifyId, id, type) {
        if(type == 'Tracks') {
            var action = component.get("c.getRelatedTracks");
        } else if(type == 'Artists') {
           var action = component.get("c.getRelatedArtists");
       }

       action.setParams({
           spotifyId : spotifyId,
           id: id
           });
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let objects = response.getReturnValue();
                component.set('v.objects', objects);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    },
})