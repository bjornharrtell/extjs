/**
 * Demonstrates usage of an accordion layout.
 */
Ext.define('KitchenSink.view.layout.Accordion', {
    extend: 'Ext.panel.Panel',
    xtype: 'layout-accordion',

    requires: [
        'Ext.layout.container.Accordion',
        'Ext.grid.*'
    ],

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/grid/BasicGridController.js'
    }, {
        type: 'Model',
        path: 'classic/samples/model/Company.js'
    }],
    profiles: {
        classic: {
            width: 600,
            green: 'green',
            red: 'red'
        },
        neptune: {
            width: 700,
            green: '#73b51e',
            red: '#cf4c35'
        }
    },
    //</example>

    title: 'Accordion Layout',
    layout: 'accordion',
    width: '${width}',
    height: 500,
    defaults: {
        bodyPadding: 10
    },

    items: [{
        // See Grids / Basic Grid example for this view.
        xtype: 'array-grid',
        title: 'Basic Grid (Click or tap header to collapse)',
        bodyPadding: 0
    }, {
        title: 'Accordion Item 2',
        html: 'Empty'
    }, {
        title: 'Accordion Item 3',
        html: 'Empty'
    }, {
        title: 'Accordion Item 4',
        html: 'Empty'
    }, {
        title: 'Accordion Item 5',
        html: 'Empty'
    }]
});
