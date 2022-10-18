({
    getContactById : function(component, id) {
        var action = component.get("c.getContactById");
        action.setParams({id : id});
        action.setCallback(this, function(response) {
            if(response.getState() === 'SUCCESS') {
                let contact = response.getReturnValue();
                component.set('v.contact', contact);
            } else if(response.getState() === 'ERROR') {

            }
        });
        $A.enqueueAction(action);
    },

    readFile: function(component, helper, file) {
        if (!file) return;
        if (!file.type.match(/(image.*)/)) {
            return alert('Image file not supported');
        }
        var reader = new FileReader();
        reader.onloadend = function() {
            var dataURL = reader.result;
            console.log(dataURL);
            component.set("v.pictureSrc", dataURL);
            helper.upload(component, file, dataURL.match(/,(.*)$/)[1]);
        };
        reader.readAsDataURL(file);
    },

    upload: function(component, file, base64Data) {
        var action = component.get("c.saveAttachment");
        action.setParams({
            parentId: component.get("v.recordId"),
            fileName: file.name,
            base64Data: base64Data,
            contentType: file.type
        });
        action.setCallback(this, function(a) {
            component.set("v.message", "Image uploaded");
        });
        component.set("v.message", "Uploading...");
        $A.enqueueAction(action);
    }
})