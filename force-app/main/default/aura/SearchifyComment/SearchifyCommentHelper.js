({
    editComment: function(component, event, helper) {
        component.set('v.mode', 'Edit');
    },

    updateComment: function(component, event, helper) {
        component.set('v.mode', 'View');

        var action = component.get("c.upsertComment");
        const object = component.get('v.object');
        action.setParams({comment : object});
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let object = response.getReturnValue();
                component.set('v.object', object);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    },

    deleteComment: function(component, event, helper) {
        component.set('v.isDeleted', true);

        var action = component.get("c.deleteComment");
        const object = component.get('v.object');
        action.setParams({comment : object});
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let object = response.getReturnValue();
                component.set('v.object', object);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    },

    sendInformation: function(component, event, helper) {
        let searchifyCommentDeletedInformation = $A.get("e.c:SearchifyCommentDeletedInformation");
//        searchifySendObject.setParams({
//           object: object
//        });
        searchifyCommentDeletedInformation.fire();
    }
})