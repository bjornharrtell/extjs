Ext.define('KitchenSink.view.calendar.ValidationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.calendar-validation',

    onBeforeDragStart: function(view, o) {
        var notAllowed = ['Not draggable', 'Not draggable/resizable'];
        return !Ext.Array.contains(notAllowed, o.event.getTitle());
    },

    onBeforeResizeStart: function(view, o) {
        var notAllowed = ['Not resizable', 'Not draggable/resizable'];
        return !Ext.Array.contains(notAllowed, o.event.getTitle());
    },

    confirmAction: function(view, o) {
        o.validate = o.validate.then(function() {
            return new Ext.Promise(function(resolve, reject) {
                Ext.Msg.confirm('Are you sure', 'Allow the action to go ahead?', function(btn) {
                    resolve(btn === 'yes');
                });
            });
        });
    }
});