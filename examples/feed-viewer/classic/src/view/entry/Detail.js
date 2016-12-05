/**
 * Shows the detail of a feed entry.
 */
Ext.define('FeedViewer.view.entry.Detail', {
    extend: 'Ext.panel.Panel',
    xtype: 'entrydetail',

    mixins: [
        'Ext.mixin.Responsive'
    ],

    requires : [
        'Ext.app.ViewModel',
        'Ext.toolbar.Toolbar'
    ],

    cls: 'entry preview',
    scrollable: true,
    bodyPadding: '0 10',

    config: {
        record: null
    },

    viewModel: {
        data: {
            record: null
        }
    },

    tabConfig: {
        cls: 'tab-entry'
    },

    bind: {
        data: '{record}',
    },

    listeners: {
        click: 'onLinkDelegate',
        element: 'body',
        delegate: 'a',
        scope: 'this'
    },

    tbar: {
        cls: 'navigation entry-toolbar',
        items: [{
            text: 'Go to entry',
            iconCls: 'entry-go x-fa fa-external-link',
            bind: {
                href: '{record.link}'
            }
        }, {
            action: 'openInTab',
            text: 'View in new tab',
            iconCls: 'tab-new x-fa fa-binoculars',
            bind: {
                hidden: '{inTab}'
            }
        }]
    },

    tpl: [
        '<div class="entry-data">',
            '<span class="entry-date">{publishedDate:date("M j, Y, g:i a")}&nbsp;</span>',
            '<h3 class="entry-title">{title}</h3>',
            '<h4 class="entry-author">{author:this.defaultAuthor}&nbsp;</h4>',
        '</div>',
        '<div class="entry-body">{content:stripScripts}</div>',
        {
            defaultAuthor: function(v) {
                return v ? 'By: ' + v : '';
            }
        }
    ],

    updateRecord: function (record) {
        var scroll = this.getScrollable(),
            vm = this.getViewModel();

        vm.set('record', record);

        if (scroll) {
            scroll.scrollTo(0, 0);
        }
    },

    /**
     * Ensure all click/tapped Entry content links are targeted to new browser tab
     * @param {Ext.event.Event} e
     * @param {HTMLElement} target
     */
    onLinkDelegate: function (e, target) {
        Ext.fly(target).set({target : '_blank'});
    }
});
