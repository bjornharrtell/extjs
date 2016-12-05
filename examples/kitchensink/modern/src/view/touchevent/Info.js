Ext.define('KitchenSink.view.touchevent.Info', {
    extend: 'Ext.Component',
    xtype: 'toucheventinfo',

    padding: 5,
    styleHtmlContent: true,
    html: [
        '<p>Sencha Touch comes with a multitude of touch events available on components. Included touch events that can be used are:</p>',
        '<ul>',
        '<li>touchstart</li>',
        '<li>touchmove</li>',
        '<li>touchend</li>',
        '<li>dragstart</li>',
        '<li>drag</li>',
        '<li>dragend</li>',
        '<li>tap</li>',
        '<li>singletap</li>',
        '<li>doubletap</li>',
        '<li>longpress</li>',
        '<li>swipe</li>',
        '<li>pinch (on iOS and Android 3+)</li>',
        '<li>rotate (on iOS and Android 3+)</li>',
        '</ul>'
    ].join('')
});
