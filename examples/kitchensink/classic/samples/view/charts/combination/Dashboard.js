/**
 * An example of an interactive dashboard showing companies data in a grid. Selecting a
 * row highlights the bar corresponding to that company and updates the form with the
 * company data. Additionally, a radar chart also shows the company information. The form
 * can be updated to see live changes on the dashboard.
 */
Ext.define('KitchenSink.view.charts.combination.Dashboard', {
    extend: 'Ext.Panel',
    xtype: 'combination-dashboard',
    controller: 'combination-dashboard',

    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.field.Number'
    ],

    // <example>
    // Content between example tags is omitted from code preview.
    bodyStyle: 'background: transparent !important',
    layout: {
        type: 'vbox',
        pack: 'center'
    },
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/charts/combination/DashboardController.js'
    }, {
        type: 'Store',
        path: 'classic/samples/store/Dashboard.js'
    }],
    // </example>
    width: 700,

    items: [{
        xtype: 'panel',
        width: '100%',
        height: 510,
        bodyPadding: 10,

        layout: {
            type: 'vbox',
            align: 'stretch'
        },

        fieldDefaults: {
            labelAlign: 'left',
            msgTarget: 'side'
        },

        items: [
            {
                xtype: 'container',
                height: 250,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    // Create a bar series to be at the top of the panel.
                    xtype: 'cartesian',
                    reference: 'barChart',
                    height: 250,
                    flex: 1,
                    margin: '0 0 3 0',
                    cls: 'x-panel-body-default',
                    interactions: 'itemhighlight',
                    style:  {
                        border: 0
                    },
                    animation: {
                        easing: 'easeOut',
                        duration: 300
                    },
                    axes: [{
                        type: 'numeric',
                        position: 'left',
                        fields: 'price',
                        minimum: 0,
                        hidden: true
                    }, {
                        type: 'category',
                        position: 'bottom',
                        fields: ['name'],
                        label: {
                            fontSize: 11,
                            rotate: {
                                degrees: -45
                            },
                            renderer: 'onBarChartAxisLabelRender'
                        }
                    }],
                    series: {
                        type: 'bar',
                        style: {
                            fillStyle: '#a2b6cf'
                        },
                        highlight: {
                            fillStyle: '#619fff',
                            strokeStyle: 'black'
                        },
                        label: {
                            display: 'insideEnd',
                            field: 'price',
                            orientation: 'vertical',
                            textAlign: 'middle'
                        },
                        xField: 'name',
                        yField: 'price'
                    },
                    listeners: {
                        itemhighlight: 'onItemHighlight'
                    }
                }, {
                    // Radar chart will render information for a selected company in the list.
                    // Selection can also be done via clicking on the bars in the series.
                    xtype: 'polar',
                    reference: 'radarChart',
                    margin: '0 0 0 0',
                    width: 200,
                    store: {
                        fields: ['Name', 'Data'],
                        data: [
                            { 'Name': 'Price',     'Data': 100 },
                            { 'Name': 'Revenue %', 'Data': 100 },
                            { 'Name': 'Growth %',  'Data': 100 },
                            { 'Name': 'Product %', 'Data': 100 },
                            { 'Name': 'Market %',  'Data': 100 }
                        ]
                    },
                    theme: 'Blue',
                    interactions: 'rotate',
                    insetPadding: '15 30 15 30',
                    axes: [{
                        type: 'category',
                        position: 'angular',
                        grid: true,
                        label: {
                            fontSize: 10
                        }
                    }, {
                        type: 'numeric',
                        miniumum: 0,
                        maximum: 100,
                        majorTickSteps: 5,
                        position: 'radial',
                        grid: true
                    }],
                    series: [{
                        type: 'radar',
                        xField: 'Name',
                        yField: 'Data',
                        showMarkers: true,
                        marker: {
                            radius: 4,
                            size: 4,
                            fillStyle: 'rgb(69,109,159)'
                        },
                        style: {
                            fillStyle: 'rgb(194,214,240)',
                            opacity: 0.5,
                            lineWidth: 0.5
                        }
                    }]
                }]
            },
            {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                flex: 3,
                items: [
                    {
                        // Create a grid that will list the dataset items.
                        xtype: 'gridpanel',
                        reference: 'gridPanel',
                        flex: 6,
                        defaults: {
                            sortable: true
                        },
                        columns: [
                            {
                                text: 'Company',
                                flex: 1,
                                dataIndex: 'name'
                            },
                            {
                                text: 'Price',
                                width: null,
                                dataIndex: 'price',
                                formatter: 'usMoney'
                            },
                            {
                                text: 'Revenue',
                                width: null,
                                dataIndex: 'revenue',
                                renderer: 'onColumnRender'
                            },
                            {
                                text: 'Growth',
                                width: null,
                                dataIndex: 'growth',
                                renderer: 'onColumnRender',
                                hidden: true
                            },
                            {
                                text: 'Product',
                                width: null,
                                dataIndex: 'product',
                                renderer: 'onColumnRender',
                                hidden: true
                            },
                            {
                                text: 'Market',
                                width: null,
                                dataIndex: 'market',
                                renderer: 'onColumnRender',
                                hidden: true
                            }
                        ],

                        listeners: {
                            selectionchange: 'onSelectionChange'
                        }
                    },
                    {
                        xtype: 'form',
                        reference: 'form',
                        flex: 3,
                        layout: {
                            type: 'vbox',
                            align:'stretch'
                        },
                        margin: '0 0 0 5',
                        items: [{
                            xtype: 'fieldset',
                            reference: 'fieldset',
                            margin: 2,
                            flex: 1,
                            title: 'No company selected',
                            defaults: {
                                disabled: true,
                                // min/max will be ignored by the text field.
                                maxValue: 100,
                                minValue: 0,
                                anchor: '100%',
                                labelWidth: 90,
                                enforceMaxLength: true,
                                maxLength: 5,
                                bubbleEvents: ['change']
                            },
                            defaultType: 'numberfield',
                            items: [{
                                fieldLabel: 'Price',
                                name: 'price'
                            }, {
                                fieldLabel: 'Revenue %',
                                name: 'revenue'
                            }, {
                                fieldLabel: 'Growth %',
                                name: 'growth'
                            }, {
                                fieldLabel: 'Product %',
                                name: 'product'
                            }, {
                                fieldLabel: 'Market %',
                                name: 'market'
                            }]
                        }],
                        listeners: {
                            // Buffer so we don't refire while the user is still typing.
                            buffer: 200,
                            change: 'onFormChange'
                        }
                    }]
            }]
    }],

    listeners: {
        afterrender: 'onAfterRender'
    }

});

