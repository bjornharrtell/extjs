Ext.application({
    name: 'StockApp',

    requires: [
        'Ext.MessageBox'
    ],

    stores: [
        'Apple',
        'Google'
    ],

    mainView:'StockApp.view.Main',

    onUpdated: function () {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function (buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
