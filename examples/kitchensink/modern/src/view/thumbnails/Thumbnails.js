Ext.define('KitchenSink.view.thumbnails.Thumbnails', {
    extend: 'Ext.dataview.DataView',
    xtype: 'thumbnails',
    cls: 'thumbnails',

    reference: 'contentView',
    region: 'center',

    // By default the framework doesn't use a body element in IE11.
    // In this case our custom styling relies on the presence of the x-body element
    useBodyElement: true,

    itemSelector: '.thumbnail-item',
    itemCls: 'thumbnail-item',

    itemTpl: [
        '<div class="thumbnail-icon-wrap icon-{[this.bkgnd[KitchenSink.profileName]]}">' +
            '<div class="thumbnail-icon {iconCls}"></div>' +
            '<tpl if="isNew">' +
                '<div {[this.styles[KitchenSink.profileName]]} ' +
                    'class="x-fa fa-star thumbnail-new" ' +
                    'data-qtip="Newly added or updated example"></div>' +
            '<tpl elseif="hasNew">' +
                '<div {[this.styles[KitchenSink.profileName]]} ' +
                    'class="x-fa fa-star thumbnail-has-new" ' +
                    'data-qtip="Contains new or updated examples"></div>' +
            '</tpl>' +
        '</div>' +
        '<div class="thumbnail-text">{text}</div>',
        {
            bkgnd: {
                crisp:           'border-circle',
                material:        'square',
                'crisp-touch':   'circle',
                neptune:         'border-square',
                'modern-neptune':'border-square',
                'neptune-touch': 'square',
                ios:             'rounded-square-bg',
                classic:         'rounded-square',
                gray:            'rounded-square',
                triton:          'square',
                'modern-triton': 'square'
            },
            styles: {
                // Bring the star close enough to the circle bkgnd to look connected
                crisp:           'style="margin: 8px"',
                'crisp-touch':   'style="margin: 8px"'
            }
        }
    ],

    initialize: function() {
        this.setStore(new KitchenSink.store.Thumbnails({ id: 'thumbs-' + Ext.id()}));
        this.callParent();
    }
});
