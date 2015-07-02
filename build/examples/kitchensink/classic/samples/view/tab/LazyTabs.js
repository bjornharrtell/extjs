/**
 * Demonstrates how use of the 'lazyitems' plugin defers
 * processing of raw config objects until render time, offering faster
 * application startup times where there are unrendered panels available
 * such as tab panels, accordions or other forms of card layout.
 *
 * It is important to remember that when using this plugin, the
 * component tree will not exist until render time, and so the components
 * cannot be reached by ComponentQuery until they are rendered.
 *
 * Note that the initialization time manifests on first show of the lazy
 * tab.
 */
Ext.define('KitchenSink.view.tab.LazyTabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'lazy-tabs',
    //<example>
    exampleTitle: 'Lazy Tabs',
    //</example>

    width: 600,
    height: 400,
    frame: true,
    defaults: {
        bodyPadding: 10,
        scrollable: true,
        layout: {
            type: 'column',
            columnCount: 2
        },
        defaults: {
            columnWidth: 0.5
        }
    },
    items: [{
        title: 'Non lazy tab',
        items: [{
            fieldLabel: 'Field 1',
            xtype: 'textfield',
            style: 'margin: 0 10px 5px 0'
        }, {
            fieldLabel: 'Field 2',
            xtype: 'numberfield'
        }, {
            fieldLabel: 'Field 3',
            xtype: 'combobox',
            style: 'margin: 0 10px 5px 0'
        }, {
            fieldLabel: 'Field 4',
            xtype: 'datefield'
        }]
    }, {
        title: 'Lazy Tab',
        plugins: {
            ptype: 'lazyitems',
            items: [{
                fieldLabel: 'Field 1',
                xtype: 'textfield',
                style: 'margin: 0 10px 5px 0'
            }, {
                fieldLabel: 'Field 2',
                xtype: 'numberfield'
            }, {
                fieldLabel: 'Field 3',
                xtype: 'combobox',
                style: 'margin: 0 10px 5px 0'
            }, {
                fieldLabel: 'Field 4',
                xtype: 'datefield'
            }]
        }
    }]
});
