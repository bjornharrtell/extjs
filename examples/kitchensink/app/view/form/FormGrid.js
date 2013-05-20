Ext.define('KitchenSink.view.form.FormGrid', {
    extend: 'Ext.form.Panel',
    
    requires: [
        'Ext.grid.*',
        'Ext.form.*',
        'Ext.layout.container.Column',
        'KitchenSink.model.Company'
    ],
    xtype: 'form-grid',
    
    //<example>
    exampleTitle: 'Dynamic Form interacting with an embedded Grid',
    exampleDescription: [
        '<p>',
            'This Form demonstrates the fact that by virtue of inheriting from the Ext <b><tt>Container</tt></b>',
            'class, an Ext.form.Panel can contain any Ext <b><tt>Component</tt></b>. This includes all the',
            'subclasses of Ext.Panel, including the GridPanel.',
        '</p>',
        '<p>',
            'The Grid demonstrates the use of creation of derived fields in a Record created using a custom',
            '<b><tt>convert</tt></b> function, and the use of column renderers.',
        '</p>',
        '<p>',
            'The Form demonstrates the use of radio buttons grouped by name being set by the value of the derived',
            'rating field.',
        '</p>'
    ].join(''),
    themes: {
        classic: {
            width: 750,
            gridWidth: 0.6,
            formWidth: 0.4,
            percentChangeColumnWidth: 75,
            lastUpdatedColumnWidth: 85,
            ratingColumnWidth: 30
        },
        neptune: {
            width: 880,
            gridWidth: 0.65,
            formWidth: 0.35,
            percentChangeColumnWidth: 100,
            lastUpdatedColumnWidth: 115,
            ratingColumnWidth: 60
        }
    },
    //</example>
    
    frame: true,
    title: 'Company data',
    bodyPadding: 5,
    layout: 'column',
    
    initComponent: function(){
        Ext.apply(this, {
            width: this.themeInfo.width,
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 90,
                anchor: '100%',
                msgTarget: 'side'
            },

            items: [{
                columnWidth: this.themeInfo.gridWidth,
                xtype: 'gridpanel',
                store: new Ext.data.Store({
                    model: KitchenSink.model.Company,
                    proxy: {
                        type: 'memory',
                        reader: {
                            type: 'array'
                        }
                    },
                    data: KitchenSink.data.DataSets.company
                }),
                height: 400,
                columns: [{
                    text: 'Company',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'company'
                }, {
                    text: 'Price',
                    width: 75,
                    sortable: true,
                    dataIndex: 'price'
                }, {
                    text: 'Change',
                    width: 80,
                    sortable: true,
                    renderer: this.changeRenderer,
                    dataIndex: 'change'
                }, {
                    text: '% Change',
                    width: this.themeInfo.percentChangeColumnWidth,
                    sortable: true,
                    renderer: this.pctChangeRenderer,
                    dataIndex: 'pctChange'
                }, {
                    text: 'Last Updated',
                    width: this.themeInfo.lastUpdatedColumnWidth,
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('m/d/Y'),
                    dataIndex: 'lastChange'
                }, {
                    text: 'Rating',
                    width: this.themeInfo.ratingColumnWidth,
                    sortable: true,
                    renderer: this.renderRating,
                    dataIndex: 'rating'
                }],
                listeners: {
                    scope: this,
                    selectionchange: this.onSelectionChange
                }
            }, {
                columnWidth: this.themeInfo.formWidth,
                margin: '0 0 0 10',
                xtype: 'fieldset',
                title:'Company details',
                layout: 'anchor',
                defaultType: 'textfield',
                items: [{
                    fieldLabel: 'Name',
                    name: 'company'
                },{
                    fieldLabel: 'Price',
                    name: 'price'
                },{
                    fieldLabel: '% Change',
                    name: 'pctChange'
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Last Updated',
                    name: 'lastChange'
                }, {
                    xtype: 'radiogroup',
                    fieldLabel: 'Rating',
                    columns: 3,
                    defaults: {
                        name: 'rating' //Each radio has the same name so the browser will make sure only one is checked at once
                    },
                    items: [{
                        inputValue: '0',
                        boxLabel: 'A'
                    }, {
                        inputValue: '1',
                        boxLabel: 'B'
                    }, {
                        inputValue: '2',
                        boxLabel: 'C'
                    }]
                }]
            }]
        });
        this.callParent();
    },
    
    changeRenderer: function(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '</span>';
        } else if(val < 0) {
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    },
    
    pctChangeRenderer: function(val){
        if (val > 0) {
            return '<span style="color:green;">' + val + '%</span>';
        } else if(val < 0) {
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    },
    
    renderRating: function(val){
        switch (val) {
            case 0:
                return 'A';
            case 1:
                return 'B';
            case 2:
                return 'C';
        }
    },
    
    onSelectionChange: function(model, records) {
        var rec = records[0];
        if (rec) {
            this.getForm().loadRecord(rec);
        }
    }
});
