({
    onChange: function(component, event) {
        const name = component.find('nameInput').get('v.value');

        const accountSearcherEvent = component.getEvent('AccountSearcherEvent');
        accountSearcherEvent.setParams({
           name: name
        });
        accountSearcherEvent.fire();

        const accountSearcherAppEvent = $A.get('e.c:AccountSearcherAppEvent');
        accountSearcherAppEvent.setParams({
           name: name
        });
        accountSearcherAppEvent.fire();
    }
})