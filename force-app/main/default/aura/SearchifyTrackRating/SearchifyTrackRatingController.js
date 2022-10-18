({
    onInit: function(component, event, helper) {
        var spotifyId = undefined;
        var id = undefined;

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
        helper.getRate(component, event, helper, spotifyId, id);
    },

    onChange: function(component, event, helper) {
        let number = event.getSource().get("v.value");

        let object = component.get('v.object');
        object.Stars__c = number;
        component.set('v.object', object);

        let rate = [];
        for(let i = 1; i<=5; i++) {
            if(number >= i) {
                let star = {show: true, number: i};
                rate.push(star);
            } else {
                let star = {show: false, number: i};
                rate.push(star);
            }
        }
        component.set('v.rate', rate);

        let spotifyId = component.get('v.spotifyId');
        let id = component.get('v.id');
        helper.upsertRate(component, event, helper, spotifyId, id);
        helper.sendObject(component, event, helper, spotifyId, id);
    }
})