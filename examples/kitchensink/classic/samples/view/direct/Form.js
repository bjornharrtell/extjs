/**
 * This example shows a Form panel with Ext.Direct integration.
 */
Ext.define('KitchenSink.view.direct.Form', {
    extend: 'Ext.panel.Panel',
    xtype: 'direct-form',
    controller: 'directform',
    
    requires: [
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Accordion',
        'KitchenSink.view.direct.FormController'
    ],
    
    //<example>
    exampleTitle: 'Ext.Direct Form integration',
    exampleDescription: [
        '<p>The following example illustrates how to load a FormPanel or BasicForm through Ext.Direct.</p>',
        '<p>Notice that Direct requests will batch together if they occur within the enableBuffer delay period (in milliseconds).</p>',
        "<p>The Ext.Direct Form api also supports submit in addition to load. The server-side must mark the submit handler as a 'formHandler' and will not be batched.</p>"
    ].join(''),
    
    otherContent: [{
        type: 'ViewController',
        path: 'classic/samples/view/direct/FormController.js'
    }, {
        type: 'Base ViewController',
        path: 'classic/samples/view/direct/DirectVC.js'
    }, {
        type: 'Server Profile class',
        path: 'data/direct/source.php?file=profile'
    }, {
        type: 'Server API configuration',
        path: 'data/direct/source.php?file=config'
    }],
    //</example>
    
    title: 'My Profile',
    width: 500,
    height: 400,
    
    layout: 'accordion',
    
    defaults: {
        xtype: 'form',
        border: false,
        bodyPadding: 10,
        
        // These defaults will be applied to the children of this Panel,
        // i.e. form panels. This is a neat way to reduce clutter
        // and keep the code clean and declarative.
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        }
    },
    
    items: [{
        title: 'Basic Information',
        reference: 'basicInfo',
        
        // configs for BasicForm
        api: {
            // The server-side method to call for load() requests
            load: 'Profile.getBasicInfo',
            
            // The server-side must mark the submit handler as a 'formHandler'
            submit: 'Profile.updateBasicInfo'
        },
        
        // specify the order for the passed params
        paramOrder: ['uid', 'foo'],
        
        buttons: [{
            text: 'Submit',
            listeners: {
                click: 'onBasicInfoSubmit'
            }
        }],
        
        items: [{
            fieldLabel: 'Name',
            name: 'name'
        }, {
            fieldLabel: 'Email',
            msgTarget: 'side',
            vtype:'email',
            name: 'email'
        }, {
            fieldLabel: 'Company',
            name: 'company'
        }]
    }, {
        title: 'Phone Numbers',
        reference: 'phoneInfo',
        
        api: {
            // Note that the method names are quoted in all forms of this
            // example. This makes use of thelazy method resolution feature
            // that is built in Ext.Direct form actions, as well as Direct
            // data proxy. When KitchenSink.view.direct.Form class is defined
            // upon initial application load, the Profile.getPhoneInfo
            // function does not exist yet; it will be created later when
            // Form API is received from the server and Form Provider is
            // created. By quoting the function name we are deferring
            // function resolution until the time it is first used, which
            // happens when the form is loaded. Form loading in turn is
            // initiated from the Form ViewController that will initialize
            // corresponding API first and only then load the form, thus
            // ensuring correct processing order.
            load: 'Profile.getPhoneInfo'
        },
        
        paramOrder: ['uid'],
        
        items: [{
            fieldLabel: 'Office',
            name: 'office'
        }, {
            fieldLabel: 'Cell',
            name: 'cell'
        }, {
            fieldLabel: 'Home',
            name: 'home'
        }]
    }, {
        title: 'Location Information',
        reference: 'locationInfo',
        
        api: {
            load: 'Profile.getLocationInfo'
        },
        
        paramOrder: ['uid'],
        
        items: [{
            fieldLabel: 'Street',
            name: 'street'
        },{
            fieldLabel: 'City',
            name: 'city'
        },{
            fieldLabel: 'State',
            name: 'state'
        },{
            fieldLabel: 'Zip',
            name: 'zip'
        }]
    }]
});
