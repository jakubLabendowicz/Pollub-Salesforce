({
    onShowSettings: function(component, event, helper) {
        let showSettings = component.get('v.showSettings');
        component.set('v.showSettings', !showSettings);
    },

    onSourceChange: function(component, event, helper) {
        let source = component.find('source').get('v.value');
        component.set('v.source', source);
    },

    onMarketChange: function(component, event, helper) {
        let market = component.find('market').get('v.value');
        component.set('v.market', market);
    },

    onRecordsLimitChange: function(component, event, helper) {
        let recordsLimit = component.find('recordsLimit').get('v.value');
        component.set('v.recordsLimit', recordsLimit);
    },

    onOffsetChangeDown: function(component, event, helper) {
        component.set("v.spinner", true);

        let query = component.find('nameInput').get('v.value');
        let market = component.get('v.market');
        let recordsLimit = component.get('v.recordsLimit');
        let page = component.get('v.page');

        page--;
        component.set('v.page', page);

        helper.searchArtists(component, event, query, market, recordsLimit, page*recordsLimit, "Spotify");
        helper.searchTracks(component, event, query, market, recordsLimit, page*recordsLimit, "Spotify");
    },

    onOffsetChangeUp: function(component, event, helper) {
        component.set("v.spinner", true);

        let query = component.find('nameInput').get('v.value');
        let market = component.get('v.market');
        let recordsLimit = component.get('v.recordsLimit');
        let page = component.get('v.page');

        page++;
        component.set('v.page', page);

        helper.searchArtists(component, event, query, market, recordsLimit, page*recordsLimit, "Spotify");
        helper.searchTracks(component, event, query, market, recordsLimit, page*recordsLimit, "Spotify");
    },

    onChange: function(component, event, helper) {
        component.set("v.spinner", true);

        let query = component.find('nameInput').get('v.value');
        let market = component.get('v.market');
        let source = component.get('v.source');
        let recordsLimit = component.get('v.recordsLimit');
        let page = component.get('v.page');
        page = 0;
        component.set('v.page', page);

        helper.searchArtists(component, event, query, market, recordsLimit, page*recordsLimit, source);
        helper.searchTracks(component, event, query, market, recordsLimit, page*recordsLimit, source);
    },

//    showSpinner: function(component, event, helper) {
//        component.set("v.spinner", true);
//    },

    hideSpinner: function(component, event, helper) {
        component.set("v.spinner", false);
    },

    onViewChange: function(component, event, helper) {
        let view = component.find('view').get('v.value');
        component.set("v.view", view);
    },
})