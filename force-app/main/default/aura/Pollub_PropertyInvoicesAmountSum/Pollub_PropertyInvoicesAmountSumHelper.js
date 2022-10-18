({
    getPropertyInvoicesAmountSum : function(component, event, helper) {
        const id = component.get('v.recordId');
        var action = component.get("c.selectPropertyInvoicesAmountSum");
        action.setParams({id : id});
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let value = response.getReturnValue();
                component.set('v.propertyInvoicesAmountSum', value);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    }
})