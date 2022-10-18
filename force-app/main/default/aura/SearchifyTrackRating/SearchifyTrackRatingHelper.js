({
    getRate : function(component, event, helper, spotifyId, id) {
        var action = component.get("c.getRate");
        action.setParams({
            spotifyId : spotifyId,
            id: id
            });
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let object = response.getReturnValue();
                component.set('v.object', object);

                if(object.Stars__c == null || object.Stars__c == '') {
                    object.Stars__c = 0;
                }
                let rate = [];
                for(let i = 1; i<=5; i++) {
                    if(object.Stars__c >= i) {
                        let star = {show: true, number: i};
                        rate.push(star);
                    } else {
                        let star = {show: false, number: i};
                        rate.push(star);
                    }
                }
                component.set('v.rate', rate);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    },

    upsertRate : function(component, event, helper, spotifyId, id) {
        var action = component.get("c.upsertRate");
        let object = component.get('v.object');
        object.SpotifyId__c = spotifyId;
        object.TrackId__c = id;
        action.setParams({rate : object});
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let object = response.getReturnValue();
                component.set('v.object', object);

                let rate = [];
                for(let i = 1; i<=5; i++) {
                    if(object.Stars__c >= i) {
                        let star = {show: true, number: i};
                        rate.push(star);
                    } else {
                        let star = {show: false, number: i};
                        rate.push(star);
                    }
                }
                component.set('v.rate', rate);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    },

    sendObject : function(component, event, helper, spotifyId, id) {
        let searchifySendObject = $A.get("e.c:SearchifySendObject");
        searchifySendObject.setParams({
           object: {Id: id, SpotifyId__c: spotifyId}
        });
        searchifySendObject.fire();
    },
})