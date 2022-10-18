({
    onInit: function(component, event, helper) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1));
        var sURLVariables = sPageURL.split('&');
        var sParameterName;
        var i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === 'c__spotifyId') {
                sParameterName[1] === undefined ? 'Not found' : sParameterName[1];
                var spotifyId = sParameterName[1];
                component.set('v.spotifyId', spotifyId);
                component.set('v.id', "");
            } else if (sParameterName[0] === 'c__id') {
                sParameterName[1] === undefined ? 'Not found' : sParameterName[1];
                var id = sParameterName[1];
                component.set('v.spotifyId', "");
                component.set('v.id', id);
            }
        }
    }
})