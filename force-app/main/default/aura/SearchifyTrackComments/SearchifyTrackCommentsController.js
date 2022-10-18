({
    onInit: function(component, event, helper) {
        var spotifyId = "";
        var id = "";

        var sPageURL = decodeURIComponent(window.location.search.substring(1));
        var sURLVariables = sPageURL.split('&');
        var sParameterName;
        var i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === 'c__spotifyId') {
                sParameterName[1] === undefined ? 'Not found' : sParameterName[1];
                spotifyId = sParameterName[1];
            }
            if (sParameterName[0] === 'c__id') {
                sParameterName[1] === undefined ? 'Not found' : sParameterName[1];
                id = sParameterName[1];
            }
        }
        component.set('v.spotifyId', spotifyId);
        component.set('v.id', id);
        helper.getComments(component, event, helper, spotifyId, id);
        helper.getShowNewButton(component, event, helper, spotifyId, id);
    },

    onNew: function(component, event, helper) {
        helper.showNew(component, event, helper);
    },

    onCancel: function(component, event, helper) {
        helper.closeNew(component, event, helper);
    },

    onSave: function(component, event, helper) {
        let spotifyId = component.get('v.spotifyId');
        let id = component.get('v.id');
        helper.insertComment(component, event, helper, spotifyId, id);
        helper.closeNew(component, event, helper);
        helper.getComments(component, event, helper, spotifyId, id);
        helper.getShowNewButton(component, event, helper, spotifyId, id);
    }
})