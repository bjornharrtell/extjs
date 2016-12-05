/**
 * Demonstrates the Ext.Video component
 */
Ext.define('KitchenSink.view.media.Video', {
    extend: 'Ext.Container',
    requires: [
        'Ext.Video'
    ],
    layout: 'fit',
    shadow: true,
    listeners: {
        hide: function () {
            try {
                var video = this.down('video');
                video.fireEvent('hide');
            }
            catch (e) {
            }
        },
        show: function () {
            try {
                var video = this.down('video');
                video.fireEvent('show');
            }
            catch (e) {
            }
        }
    },
    items: [{
        xtype: 'video',
        url: ['modern/resources/video/BigBuck.m4v', 'modern/resources/video/BigBuck.webm'],
        loop: true,
        posterUrl: 'modern/resources/images/cover.jpg'
    }]
});
