({
    searchArtists: function(component, event, query, market, recordsLimit, offset, source) {
        var action = component.get("c.searchArtists");
        action.setParams({
            query : query,
            market: market,
            recordsLimit: recordsLimit,
            offset: offset,
            source: source
            });
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let objects = response.getReturnValue();
                component.set('v.artists', objects);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    },

    searchTracks: function(component, event, query, market, recordsLimit, offset, source) {
        var action = component.get("c.searchTracks");
        action.setParams({
            query : query,
            market: market,
            recordsLimit: recordsLimit,
            offset: offset,
            source: source
            });
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let objects = response.getReturnValue();
                component.set('v.tracks', objects);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    }
})