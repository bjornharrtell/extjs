Ext.define('Aria.view.List', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.mysimplelist',
    
    title: 'Data View',

    initComponent: function() {
        var me = this,
            data1 = [
                { label: 'item #1', content: 'Content for Item1.' },
                { label: 'item #2', content: 'Content for Item2.' },
                { label: 'item #3', content: 'Content for Item3.' }
            ],
            data2 = [
                { label: '#1', content: 'Alternative content #1.' },
                { label: '#2', content: 'Alternative content #2.' },
                { label: '#3', content: 'Alternative content #3.' },
                { label: '#4', content: 'Alternative content #4.' },
                { label: '#5', content: 'Alternative content #5.' }
            ],
            store;
        
        store = Ext.create('Ext.data.Store', {
            fields:[
                { name: 'label', type: 'string' },
                { name: 'content', type: 'string' }
            ]
        });
        
        me.curData = data1;
        
        me.items = [{
            xtype: 'panel',
            title: 'My List',
            ariaRole: 'region',
            bodyPadding: 12,
            width: 400,
            height: 250,
            items: [{
                xtype: 'component',
                itemId: 'descriptionCmp',
                html: 'Use the arrow keys to navigate. <br>Press Enter to activate an item.',
                margin: '0 0 12 0'
            }, {
                xtype: 'dataview',
                flex: 1,
                itemSelector: 'div.myitem',
                style: 'background: white;padding:6px;color:black',
                trackOver: true,
                overItemCls: 'x-item-over',
                store: store,
                tpl: [
                    '<tpl for=".">',
                        '<div class="myitem">',
                        '<a href="#">{label}</a>: {content} </div>',
                    '</tpl>'
                ],
                selModel: {
                    mode: 'MULTI'
                },
                listeners: {
                    itemclick: me.onItemClick,
                    viewready: function() {
                        store.loadData(me.curData);
                    }
                },
                ariaAttributes: {
                    'aria-live': 'polite',
                    'aria-relevant': 'all'
                },
                ariaDescribedBy: function() {
                    return this.prev('#descriptionCmp').id;
                }
            }],
            bbar: [{
                    xtype: 'button',
                    text: 'Refresh Data',
                    margin: '12 0 0 0',
                    handler: function() {
                        if (me.curData === data1) {
                            me.curData = data2;
                        }
                        else {
                            me.curData = data1;
                        }
                        store.loadData(me.curData);
                    }
                }
            ]}
        ];

        me.callParent(arguments);

    },

    onItemClick: function(item, record) {
        //depending on whether the mouse is clicked or enter is pressed
        //item and record could be switched!
        var data;
        
        if (record.get) {
            data = record.get('content');
        }
        else {
            data.item.get('content');
        }
        
        Aria.app.msg('Item Click', 'You clicked "{0}".', data);
    }
});
