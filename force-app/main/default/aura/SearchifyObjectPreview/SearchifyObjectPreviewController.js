({
    onEvent: function(component, event, helper) {
        let type = component.get('v.type');
        let object = event.getParam("object");
        let spotifyId = object.SpotifyId__c;
        let id = object.Id;
        if(spotifyId == "") {
            spotifyId = undefined;
        }
        if(id == "") {
            id = undefined;
        }
        console.log(spotifyId);
        console.log(id);
        let objectsType = "";

        if(type == "Object") {
            if(object.Type__c == 'artist') {
                objectsType = "Artist";
            } else if(object.Type__c == 'track') {
                objectsType = "Track";
            }
        } else if(type == "Related Objects") {
            if(object.Type__c == 'artist') {
                objectsType = "Tracks";
            } else if(object.Type__c == 'track') {
                objectsType = "Artists";
            }
        }

        component.set('v.object', object);
        component.set('v.spotifyId', spotifyId);
        component.set('v.id', id);
        component.set('v.objectsType', objectsType);
    },
})