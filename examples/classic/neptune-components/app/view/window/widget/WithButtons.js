Ext.define('Neptune.view.window.widget.WithButtons', {
    extend: 'Neptune.view.window.widget.Basic',
    xtype: 'windowWithButtons',
    draggable: false,
    buttons: [
        { text: 'Submit' },
        { text: 'Cancel' }
    ]
});