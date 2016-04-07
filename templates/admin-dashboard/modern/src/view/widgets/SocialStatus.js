/**
 * This class is a custom toolbar intended for use as a BioTile footer.
 */
Ext.define('Admin.view.widgets.SocialStatus', {
    extend: 'Ext.Toolbar',
    xtype: 'socialstatus',
    border: false,

    config: {
        format: '0,000',

        followers: null,

        following: null,

        likes: null
    },

    referenceHolder: true, // all logic is our updaters, we'll hold the refs (no controller)

    items: [{
        xtype: 'component',
        flex: 1,
        reference: 'following',
        userCls: 'social-status-category',
        html: '<div class="social-status-header">Following</div>' +
              '<div class="social-status-count">3</div>'
    }, {
        xtype: 'component',
        flex: 1,
        reference: 'followers',
        userCls: 'social-status-category',
        html: '<div class="social-status-header">Followers</div>' +
              '<div class="social-status-count">1</div>'
    }, {
        xtype: 'component',
        flex: 1,
        reference: 'likes',
        userCls: 'social-status-category',
        html: '<div class="social-status-header">Likes</div>' +
              '<div class="social-status-count">2</div>'
    }],

    updateFollowers: function (value) {
        this.setCount('followers', value);
    },

    updateFollowing: function (value) {
        this.setCount('following', value);
    },

    updateLikes: function (value) {
        this.setCount('likes', value);
    },

    privates: {
        setCount: function (name, value) {
            var component = this.lookup(name),
                el = component.element.down('.social-status-count'),
                format = this.getFormat();

            el.dom.textContent = Ext.util.Format.number(value, format);
        }
    }
});
