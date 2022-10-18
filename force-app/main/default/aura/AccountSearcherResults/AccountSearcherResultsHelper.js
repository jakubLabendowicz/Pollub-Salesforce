({
    getAccountsByName : function(component, name) {
        var action = component.get("c.getAccountsByName");
        action.setParams({name : name});
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let accounts = response.getReturnValue();
                component.set('v.accounts', accounts);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    }
})