({
    init: function(component, event, helper) {
        let urlElements = window.location.href.split('/');

        let id = urlElements.pop();
        id = urlElements.pop();
        helper.getContactById(component, id);

        var action = component.get("c.getProfilePictureById");
        action.setParams({
            parentId: component.get("v.recordId"),
        });
        action.setCallback(this, function(a) {
            var attachment = a.getReturnValue();
            console.log(attachment);
            if (attachment && attachment.Id) {
                component.set('v.pictureSrc', '/servlet/servlet.FileDownload?file=' + attachment.Id);
            }
        });
        $A.enqueueAction(action);
    },

    onDragOver: function(component, event) {
        event.preventDefault();
    },

    onDrop: function(component, event, helper) {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        var files = event.dataTransfer.files;
        if (files.length>1) {
            return alert("You can only upload one profile picture");
        }
        helper.readFile(component, helper, files[0]);
    }
})