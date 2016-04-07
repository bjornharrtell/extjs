Ext.define('Admin.view.email.Actions', {
    extend: 'Ext.ActionSheet',
    xtype: 'emailactions',

    items: [{
        text: 'Compose',
        handler: 'onComposeMessage'
    }, {
        text: 'Inbox',
        itemId: 'inbox',
        handler: 'onChangeFilter'
    }, {
        text: 'Sent Mail',
        itemId: 'sent',
        handler: 'onChangeFilter'
    }, {
        text: 'Spam',
        itemId: 'spam',
        handler: 'onChangeFilter'
    }, {
        text: 'Trash',
        itemId: 'trash',
        handler: 'onChangeFilter'
    }]
});
