({
    onInit: function(component, event, helper) {
        helper.updateObject(component, event, helper);
        helper.createTitles(component, event, helper);
    },

    onPreview: function(component, event, helper) {
        helper.fireSelectEvent(component, event);
    },

    onSave: function(component, event, helper) {
        helper.save(component, event, helper);
    },

    onFavorite: function(component, event, helper) {
        helper.setFavoriteTrack(component, event, helper);
        helper.sendObject(component, event, helper);
    },

    onBlackList: function(component, event, helper) {
        helper.setBlackListTrack(component, event, helper);
        helper.sendObject(component, event, helper);
    },

    onView : function (component, event, helper) {
        helper.showObject(component, event, helper);
    },

    onViewInSpotify: function(component, event, helper) {
        helper.openSpotifyUrl(component, event, helper);
    },

    onSendObject : function (component, event, helper) {
        helper.receiveObject(component, event, helper);
    },
})