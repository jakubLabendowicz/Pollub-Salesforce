({
    updateObject : function(component, event, helper) {
        const object = component.get('v.object');
        if(object.Type__c == 'track') {
            var action = component.get("c.updateTrack");
            action.setParams({track : object});
        } else if(object.Type__c == 'artist') {
           var action = component.get("c.updateArtist");
           action.setParams({artist : object});
       }
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let track = response.getReturnValue();
                component.set('v.object', track);

                if(track.Rate__c == null || track.Rate__c == '') {
                    track.Rate__c = 0;
                }
                let rate = [];
                for(let i = 1; i<=5; i++) {
                    if(track.Rate__c >= i) {
                        let star = {show: true};
                        rate.push(star);
                    } else {
                        let star = {show: false};
                        rate.push(star);
                    }
                }
                component.set('v.rate', rate);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    },

    createTitles: function(component, event, helper) {
        const object = component.get('v.object');
        var title = object.Name.split(" ");
        var subtitle = "";
        if(object.Type__c == 'track' && object.ArtistName__c != null) {
            subtitle = object.ArtistName__c.split(" ");
        } else if(object.Type__c == 'artist' && object.Genres__c != null) {
            subtitle = object.Genres__c.split(" ");
       }

       component.set('v.title', title);
       component.set('v.subtitle', subtitle);
    },

//    getArtists : function(component, event, helper) {
//        const object = component.get('v.object');
//        if(object.Type__c == 'track') {
//            var action = component.get("c.getRelatedArtists");
//            action.setParams({spotifyId : object.SpotifyId__c});
//            action.setCallback(this, function(response) {
//                if(response.getState() === 'SUCCESS') {
//                    let artists = response.getReturnValue();
//                    component.set('v.artists', artists);
//                } else if(response.getState() === 'ERROR') {
//
//                }
//            });
//            $A.enqueueAction(action);
//        }
//    },

    fireSelectEvent: function(component, event) {
        let object = component.get('v.object');
        if(object.SpotifyId__c == null || object.SpotifyId__c == "" || object.SpotifyId__c == undefined) {
            object.SpotifyId__c = "";
        }
        if(object.Id == null || object.Id == "" || object.Id == undefined) {
            object.Id = "";
        }
        let searchifyObjectSelect = $A.get("e.c:SearchifyObjectSelect");
        searchifyObjectSelect.setParams({
           object: object
        });
        searchifyObjectSelect.fire();
    },

    save: function(component, event, helper) {
        var object = component.get('v.object');
        var newObject;
        if(object.Type__c == 'track') {
            var action = component.get("c.saveTrack");
            action.setParams({track : object});
        } else if(object.Type__c == 'artist') {
           var action = component.get("c.saveArtist");
           action.setParams({artist : object});
       }
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                newObject = response.getReturnValue();
                component.set('v.object', newObject);
                if(newObject.Id == null || newObject.Id == "") {
                    helper.showNotification(component, 'Success!', "Record deleted.");
                } else {
                    helper.showNotification(component, 'Success!', "Record saved.");
                }
            } else if(response.getState() === 'ERROR') {

            }
        });
        helper.sendObject(component, event, helper);
        $A.enqueueAction(action);
    },

    setFavoriteTrack : function(component, event, helper) {
        var action = component.get("c.setFavoriteTrack");
        const object = component.get('v.object');
        action.setParams({track : object});
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let track = response.getReturnValue();
                component.set('v.object', track);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
        if(object.Favorite__c == false || object.Favorite__c == null) {
            helper.showNotification(component, 'Success!', 'Track added to Favorite.');
        } else {
            helper.showNotification(component, 'Success!', 'Track deleted from Favorite.');
        }
    },

    setBlackListTrack : function(component, event, helper) {
        var action = component.get("c.setBlackListTrack");
        const object = component.get('v.object');
        action.setParams({track : object});
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let track = response.getReturnValue();
                component.set('v.object', track);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
        if(object.BlackList__c == false || object.BlackList__c == null) {
            helper.showNotification(component, 'Success!', "Track added to Black List.");
        } else {
            helper.showNotification(component, 'Success!', "Track deleted from Black List.");
        }
    },

    showNotification : function(component, title, message) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message,
            "type": "Success"
        });
        toastEvent.fire();
    },

    showObject : function(component, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");

        const object = component.get('v.object');
        if(object.SpotifyId__c != null && object.SpotifyId__c != ''){
            if(object.Type__c == 'track') {
                urlEvent.setParams({
                  "url": "/lightning/n/Track/?c__spotifyId=" + object.SpotifyId__c
                });
            } else if(object.Type__c == 'artist') {
                urlEvent.setParams({
                    "url": "/lightning/n/Artist/?c__spotifyId=" + object.SpotifyId__c
                });
            }
        } else {
            if(object.Type__c == 'track') {
                urlEvent.setParams({
                  "url": "/lightning/n/Track/?c__id=" + object.Id
                });
            } else if(object.Type__c == 'artist') {
                urlEvent.setParams({
                    "url": "/lightning/n/Artist/?c__id=" + object.Id
                });
            }
        }
        urlEvent.fire();
    },

    openSpotifyUrl : function(component, event, helper) {
        var url = component.get('v.object.SpotifyUrl__c');
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
        "url": url
        });
        urlEvent.fire();
    },

    sendObject : function(component, event, helper) {
        let object = component.get('v.object');
        let searchifySendObject = $A.get("e.c:SearchifySendObject");
        searchifySendObject.setParams({
           object: object
        });
        searchifySendObject.fire();
    },

    receiveObject: function(component, event, helper) {
        let object = event.getParam("object");
        let thisObject = component.get("v.object");

        if((object.Id === thisObject.Id && object.Id != null && object.Id != undefined && object.Id != "") || (object.SpotifyId__c === thisObject.SpotifyId__c && object.SpotifyId__c != null && object.SpotifyId__c != undefined && object.SpotifyId__c != "")){
            helper.updateObject(component, event, helper);
        }
    },
})