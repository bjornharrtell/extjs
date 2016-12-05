/**
 * Ext JS provides many types of form fields to build interactive and rich forms. However,
 * it also provides a complete framework for building new types of fields 'quickly. The
 * search field below is an example.
 */
Ext.define('KitchenSink.view.form.CustomFields', {
    extend: 'Ext.form.Panel',
    xtype: 'form-customfields',
    
    requires: [
        'Ext.ux.form.SearchField'
    ],

    //<example>
    //</example>
    
    title: 'Forum Search',
    height: 600,
    width: 600,

    layout: 'fit',

    config: {
        store: {
            type: 'form-forum-posts',
            autoLoad: true,
            pageSize: 25
        }
    },

    items: [{
        scrollable: 'y',
        xtype: 'dataview',
        tpl: [
            '<tpl for=".">',
            '<div class="search-item">',
                '<h3><span>{lastPost:this.formatDate}<br>by {author}</span>',
                '<a href="http://sencha.com/forum/showthread.php?t={topicId}&p={postId}" target="_blank">{title}</a></h3>',
                '<p>{excerpt}</p>',
            '</div></tpl>',
        {
            formatDate: function(value) {
                return Ext.Date.format(value, 'M j, Y');
            }
        }],
        itemSelector: 'div.search-item',
        emptyText: '<div class="x-grid-empty">No Matching Threads</div>',
        store: 'form-forum-posts'
    }],

    tbar: [{
        width: 400,
        fieldLabel: 'Search',
        labelWidth: 50,
        xtype: 'searchfield',
        store: 'form-forum-posts'
    }],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Topics {0} - {1} of {2}',
        emptyMsg: 'No topics to display'
    },

    applyStore: function (store) {
        return store && Ext.Factory.store(store);
    }
});
