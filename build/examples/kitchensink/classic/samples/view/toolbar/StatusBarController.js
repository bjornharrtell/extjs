Ext.define('KitchenSink.view.toolbar.StatusBarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.statusbar-demo',
    requires: [
        'KitchenSink.data.Success'
    ],

    saveStatusForm: function() {
        var fp = this.lookupReference('status-form'),
            sb = this.lookupReference('form-statusbar');

        if (fp.getForm().isValid()) {
            sb.showBusy('Saving form...');
            fp.getForm().submit({
                waitMsg: new String,
                url: '/kitchensink/success.php',
                success: function(){
                    sb.setStatus({
                        text: 'Form saved!',
                        iconCls: '',
                        clear: true
                    });
                }
            });
        }
    },

    loadFn: function(button) {
        var statusBar = button.up('panel').down('statusbar');

        button.disable();
        statusBar.showBusy();

        Ext.defer(function() {
            if (!statusBar.destroyed) { 
                statusBar.clearStatus({
                    useDefaults: true
                });
                button.enable();
            }
        }, 2000);
    },

    showWarning: function () {
        this.lookupReference('basic-statusbar').setStatus({
            text: 'Oops!',
            iconCls: 'x-status-error',
            clear: true // auto-clear after a set interval
        });
    },
    
    showBusy: function () {
        // Set the status bar to show that something is processing:
        this.lookupReference('basic-statusbar').showBusy();
    },
    
    clearStatus: function () {
        this.lookupReference('basic-statusbar').clearStatus(); 
    },

    onWpRender: function() {
        var textArea = this.lookupReference('wordTextarea'),
            clock = this.lookupReference('clock'),
            wordStatus = this.lookupReference('wordStatus'),
            wordCount = this.lookupReference('wordCount'),
            charCount = this.lookupReference('charCount'),
            event = Ext.isOpera ? 'keypress' : 'keydown', // opera behaves a little weird with keydown
            clockTask;

        // Kick off the clock timer that updates the clock el every second:
        clockTask = Ext.TaskManager.start({
            run: function() {
                // If it gets destroyed, we stop the task
                if (clock.destroyed) {
                    return false;
                }
                Ext.fly(clock.getEl()).update(Ext.Date.format(new Date(), 'g:i:s A'));
            },
            interval: 1000
        });

        // This sets up a fake auto-save function.  It monitors keyboard activity and after no typing
        // has occurred for 1.5 seconds, it updates the status message to indicate that it's saving.
        // After a fake delay so that you can see the save activity it will update again to indicate
        // that the action succeeded.
        textArea.on(event, function() {
            wordStatus.showBusy('Saving draft...');
            Ext.defer(function() {
                wordStatus.setStatus({
                    iconCls: 'x-status-saved',
                    text: 'Draft auto-saved at ' + Ext.Date.format(new Date(), 'g:i:s A')
                });
            }, 4000);
        }, null, {buffer:1500});

        // Set up our event for updating the word/char count
        textArea.on(event, function(comp) {
            var v = comp.getValue(),
                wc = 0, 
                cc = v.length ? v.length : 0;

            if (cc > 0) {
                wc = v.match(/\b/g);
                wc = wc ? wc.length / 2 : 0;
            }
            wordCount.update('Words: ' + wc);
            charCount.update('Chars: ' + cc);
        }, null, {buffer: 1});
    }
});