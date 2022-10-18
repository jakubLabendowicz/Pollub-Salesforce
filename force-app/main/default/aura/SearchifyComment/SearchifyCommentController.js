({
    onEdit: function(component, event, helper) {
        helper.editComment(component, event, helper);
    },

    onSave: function(component, event, helper) {
        helper.updateComment(component, event, helper);
    },

    onDelete: function(component, event, helper) {
        helper.deleteComment(component, event, helper);
        helper.sendInformation(component, event, helper);
    }
})