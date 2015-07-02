/**
 * Demonstrates usage of the Ext.Audio component
 */
Ext.define('KitchenSink.view.Audio', {
    extend: 'Ext.Container',
    requires: [
        'Ext.Audio'
    ],
    config: {
        listeners: {
            hide: function () {
                var video = this.down('audio');
                video.fireEvent('hide');
            },
            show: function () {
                var video = this.down('audio');
                video.fireEvent('show');
            }
        },
        layout: Ext.os.is.Android ? {
            type: 'vbox',
            pack: 'center',
            align: 'center'
        } : 'fit',
        items: Ext.os.is.Android ? [
            {
                xtype: 'audio',
                cls: 'myAudio',
                url: 'modern/resources/audio/crash.mp3',
                loop: true,
                enableControls: false
            },
            {
                xtype : 'button',
                text  : 'Play audio',
                margin: 20,
                handler: function() {
                    var audio = this.getParent().down('audio');

                    if (audio.isPlaying()) {
                        audio.pause();
                        this.setText('Play audio');
                    } else {
                        audio.play();
                        this.setText('Pause audio');
                    }
                }
            }
        ] : [
            {
                xtype: 'audio',
                cls: 'myAudio',
                url: 'modern/resources/audio/crash.mp3',
                loop: true
            }
        ]
    }
});
