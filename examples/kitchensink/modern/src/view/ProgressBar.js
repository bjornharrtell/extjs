Ext.define('KitchenSink.view.ProgressBar', {
    extend: 'Ext.Container',
    requires: [
        'Ext.Progress',
        'KitchenSink.view.ProgressBarController'
    ],

    // <example>
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/ProgressBarController.js'
    }],
    // </example>
    
    cacheView: false,
    controller: 'progressbar',
    layout: {
        type: 'vbox',
        pack: 'center',
        align: 'center'
    },
    viewModel: {
        data: {
            choices: ['Marshmallows', 'Graham Crackers', 'Chocolate', 'Fire Pit', 'Stick', 'Smiles'],
            progress: 0
        },
        formulas: {
            itemPercent: function(get) {
                var choices = get('choices'),
                    progress = get('progress'),
                    len = choices.length,
                    itemPercent = (100 / len) / 100;

                return Math.round(((progress / itemPercent) % 1) * 100);
            },
            percent: function(get) {
                var progress = get('progress');
                return Math.round(progress * 100);
            },
            word: function(get) {
                var choices = get('choices'),
                    progress = get('progress'),
                    len = choices.length,
                    index = Math.floor(progress * len);
                return choices[index];
            }

        }
    },
    items: [
        {
            xtype: 'progress',
            width: '75%',
            margin: '0 0 20 0',
            bind: {
                text: 'Loading {word} {itemPercent}%',
                value: '{progress}'
            }
        },

        {
            xtype: 'label',
            margin: '0 0 10 0',
            bind: {
                html: 'Loading {word} {itemPercent}%'
            }
        },

        {
            xtype: 'progress',
            width: '75%',

            bind: {
                value: '{progress}'
            }
        }
    ]
});
