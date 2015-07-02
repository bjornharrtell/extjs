Ext.define('KitchenSink.view.grid.FramingButtons', {
    extend: 'Ext.grid.Panel',

    xtype: 'framing-buttons',
    store: 'Companies',

    columns: [
        {text: "Company", flex: 1, sortable: true, dataIndex: 'name'},
        {text: "Price", width: 120, sortable: true, formatter: 'usMoney', dataIndex: 'price'},
        {text: "Change", width: 120, sortable: true, dataIndex: 'change'},
        {text: "% Change", width: 120, sortable: true, dataIndex: 'pctChange'},
        {text: "Last Updated", width: 120, sortable: true, formatter: 'date("m/d/Y")', dataIndex: 'lastChange'}
    ],
    columnLines: true,
    selModel: {
        type: 'checkboxmodel',
        listeners: {
            selectionchange: 'onSelectionChange'
        }
    },

    // This view acts as the default listener scope for listeners declared within it.
    // For example the selectionModel's selectionchange listener resolves to this.
    defaultListenerScope: true,

    // This view acts as a reference holder for all components below it which have a reference config
    // For example the onSelectionChange listener accesses a button using its reference
    referenceHolder: true,

    onSelectionChange: function(sm, selections) {
        this.getReferences().removeButton.setDisabled(selections.length === 0);
    },

    // inline buttons
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        layout: {
            pack: 'center'
        },
        items: [{
            minWidth: 80,
            text: 'Save'
        },{
            minWidth: 80,
            text: 'Cancel'
        }]
    }, {
        xtype: 'toolbar',
        items: [{
            text: 'Add Something',
            tooltip: 'Add a new row',
            iconCls: 'framing-buttons-add'
        }, '-', {
            text: 'Options',
            tooltip: 'Set options',
            iconCls: 'framing-buttons-option'
        },'-',{
            reference: 'removeButton',  // The referenceHolder can access this button by this name
            text: 'Remove Something',
            tooltip: 'Remove the selected item',
            iconCls:'framing-buttons-remove',
            disabled: true
        }]
    }],

    height: 300,
    frame: true,
    title: 'Support for standard Panel features such as framing, buttons and toolbars',
    iconCls: 'framing-buttons-grid',
    //<example>
    exampleTitle: 'Support for standard Panel features such as framing, buttons and toolbars',
    otherContent: [{
        type: 'Store',
        path: 'classic/samples/store/Companies.js'
    }, {
        type: 'Model',
        path: 'classic/samples/model/Company.js'
    }],
    profiles: {
        classic: {
            width: 700
        },
        neptune: {
            width: 750
        }
    },
    //</example>

    initComponent: function() {
        this.width = this.profileInfo.width;
        this.callParent();
    }
});