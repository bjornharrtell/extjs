Ext.require([
    'Ext.form.field.File',
    'Ext.form.field.Number',
    'Ext.form.Panel',
    'Ext.window.MessageBox'
]);

Ext.onReady(function() {

//  Class which shows invisible file input field.
    if (window.location.href.indexOf('debug') !== -1) {
        Ext.getBody().addCls('x-debug');
    }

    var msg = function(title, msg) {
        Ext.Msg.show({
            title: title,
            msg: msg,
            minWidth: 200,
            modal: true,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK
        });
    };

    var fibasic = Ext.create('Ext.form.field.File', {
        renderTo: 'fi-basic',
        width: 400,
        hideLabel: true
    });

    Ext.create('Ext.button.Button', {
        text: 'Get File Path',
        renderTo: 'fi-basic-btn',
        handler: function(){
            var v = fibasic.getValue();
            msg('Selected File', v && v !== '' ? v : 'None');
        }
    });

    Ext.create('Ext.form.field.File', {
        renderTo: 'fi-button',
        buttonOnly: true,
        hideLabel: true,
        listeners: {
            'change': function(fb, v){
                var el = Ext.get('fi-button-msg');
                el.update('<b>Selected:</b> '+v);
                if(!el.isVisible()){
                    el.slideIn('t', {
                        duration: 200,
                        easing: 'easeIn',
                        listeners: {
                            afteranimate: function() {
                                el.highlight();
                                el.setWidth(null);
                            }
                        }
                    });
                }else{
                    el.highlight();
                }
            }
        }
    });

    var tpl = new Ext.XTemplate(
        'File processed on the server.<br />',
        'Name: {fileName}<br />',
        'Size: {fileSize:fileSize}'
    );
    Ext.create('Ext.form.Panel', {
        renderTo: 'fi-form',
        width: 500,
        frame: true,
        title: 'File Upload Form',
        bodyPadding: '10 10 0',

        defaults: {
            anchor: '100%',
            allowBlank: false,
            msgTarget: 'side',
            labelWidth: 50
        },

        items: [{
            xtype: 'textfield',
            fieldLabel: 'Name'
        },{
            xtype: 'filefield',
            id: 'form-file',
            emptyText: 'Select an image',
            fieldLabel: 'Photo',
            name: 'photo-path',
            buttonText: '',
            buttonConfig: {
                iconCls: 'upload-icon'
            }
        }],

        buttons: [{
            text: 'Save',
            handler: function(){
                var form = this.up('form').getForm();
                if(form.isValid()){
                    form.submit({
                        url: 'file-upload.php',
                        waitMsg: 'Uploading your photo...',
                        success: function(fp, o) {
                            msg('Success', tpl.apply(o.result));
                        }
                    });
                }
            }
        },{
            text: 'Reset',
            handler: function() {
                this.up('form').getForm().reset();
            }
        }]
    });

    Ext.create('Ext.form.Panel', {
        renderTo: 'fi-form-failure',
        width: 500,
        frame: true,
        title: 'Upload error test',
        bodyPadding: '10 10 0',

        defaults: {
            anchor: '100%',
            allowBlank: false,
            msgTarget: 'side',
            labelWidth: 70
        },

        items: [{
            xtype: 'textfield',
            fieldLabel: 'Name'
        },{
            xtype: 'filefield',
            id: 'form-file-fail',
            emptyText: 'Select an image',
            fieldLabel: 'Photo',
            name: 'photo-path',
            buttonText: '',
            buttonConfig: {
                iconCls: 'upload-icon'
            }
        }, {
            xtype: 'numberfield',
            fieldLabel: 'HTTP status',
            value: 200,
            minValue: 200,
            maxValue: 599,
            allowBlank: false,
            name: 'returnResponse'
        }],

        buttons: [{
            text: 'Save',
            handler: function(){
                var form = this.up('form').getForm();
                if(form.isValid()){
                    form.submit({
                        url: 'file-upload.php',
                        waitMsg: 'Uploading your photo...',
                        success: function(fp, o) {
                            msg('Success', 'Processed file "' + o.result.file + '" on the server');
                        },
                        failure: function() {
                            Ext.Msg.alert("Error", Ext.JSON.decode(this.response.responseText).message);
                        }
                    });
                }
            }
        },{
            text: 'Reset',
            handler: function() {
                this.up('form').getForm().reset();
            }
        }]
    });

});