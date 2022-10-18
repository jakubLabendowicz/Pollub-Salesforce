({
    getMapMarkersByName : function(component, name) {
        var action = component.get("c.getMapMarkersByName");
        action.setParams({name : name});
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let accounts = response.getReturnValue();
                let mapMarkers = [];
                for(const account of accounts) {
                    let mapMarker = {
                        location: {Country: account.BillingCountry, Street: account.BillingStreet, City: account.BillingCity},
                        title: account.Name,
                        value: account.Id
                    }
                    mapMarkers.push(mapMarker);
                }
                component.set('v.mapMarkers', mapMarkers);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    },

    getMapMarkersById : function(component, id) {
        var action = component.get("c.getMapMarkersById");
        action.setParams({id : id});
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let accounts = response.getReturnValue();
                let mapMarkers = [];
                for(const account of accounts) {
                    let mapMarker = {
                        location: {Country: account.BillingCountry, Street: account.BillingStreet, City: account.BillingCity},
                        title: account.Name,
                        value: account.Id
                    }
                    mapMarkers.push(mapMarker);
                }
                component.set('v.mapMarkers', mapMarkers);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    },

    onSelect: function(component, event) {
        const id = event.getParam("selectedMarkerValue");
        const accountSelectEvent = $A.get("e.c:AccountSelectEvent");
        accountSelectEvent.setParams({
           "id": id
        });
        accountSelectEvent.fire();
    }
})