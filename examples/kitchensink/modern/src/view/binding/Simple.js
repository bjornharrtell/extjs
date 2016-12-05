Ext.define('KitchenSink.view.binding.Simple', {
    extend: 'Ext.Container',

    // <example>
    requires: [
        'Ext.app.ViewModel'
    ],
    // </example>

    viewModel: {
        data: {
            title: 'ViewModel Title',
            padding: 10,
            content: [
                'This content is defined in the ViewModel. ',
                'Each bind uses a bind descriptor to specify what data ',
                'is required from the ViewModel. The title bar uses the ',
                'defaultBindProperty to bind to one of the most common ',
                'configurations for that class. This component binds to multiple ',
                'configurations by specifying each in the bind descriptor.'
            ].join('')
        }
    },

    scrollable: true,

    shadow: true,
    cls: 'demo-solid-background',

    items: [{
        xtype: 'titlebar',
        docked: 'top',
        bind: '{title}'
    }, {
        xtype: 'component',
        bind: {
            html: '{content}',
            padding: '{padding}'
        }
    }]
});
