Ext.define('KitchenSink.view.thumbnails.Thumbnails', {
    extend: 'Ext.view.View',
    xtype: 'thumbnails',
    cls: 'thumbnails',

    reference: 'contentView',
    region: 'center',

    store: 'Thumbnails',

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
                'neptune-touch': 'square',
                classic:         'rounded-square',
                gray:            'rounded-square',
                triton:          'square'
            },
            styles: {
                // Bring the star close enough to the circle bkgnd to look connected
                crisp:           'style="margin: 8px"',
                'crisp-touch':   'style="margin: 8px"'
            }
        }
    ]
});
