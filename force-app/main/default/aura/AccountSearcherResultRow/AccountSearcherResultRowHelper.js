({
        onSelect: function(component, event) {
            const id = component.get('v.account.Id');
            const accountSelectEvent = $A.get("e.c:AccountSelectEvent");
            accountSelectEvent.setParams({
               "id": id
            });
            accountSelectEvent.fire();
        }
})