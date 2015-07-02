/**
 * Demonstrates the Ext.Video component
 */
Ext.define('KitchenSink.view.Video', {
    extend: 'Ext.Container',
    requires: [
        'Ext.Video'
    ],
    config: {
        layout: 'fit',
        listeners: {
            hide: function () {
                var video = this.down('video');
                video.fireEvent('hide');
            },
            show: function () {
                var video = this.down('video');
                video.fireEvent('show');
            }
        },
        items: [{
            xtype: 'video',
            url: ['modern/resources/video/BigBuck.m4v', 'modern/resources/video/BigBuck.webm'],
            loop: true,
            posterUrl: 'modern/resources/images/cover.jpg'
        }]
    }
});
