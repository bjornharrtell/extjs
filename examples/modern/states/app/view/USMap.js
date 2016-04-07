Ext.define('States.view.USMap', {
    extend: 'Ext.draw.Component',
    requires: ['Ext.draw.PathUtil'],
    xtype: 'usmap',
    config: {
        items: [],
        store: null,
        selection: null,
        sprites: [],
        style: {
            translationX: 0,
            translationY: 0,
            scaling: 0.7,
            scalingCenterX: 0,
            scalingCenterY: 0
        }
    },

    template: {
        type: 'path',
        fillStyle: 'white',
        strokeStyle: 'black',
        lineWidth: 0.5,
        highlight: {
            shadowColor: 'black',
            strokeStyle: 'white',
            fillStyle: '#dd8',
            shadowBlur: 5,
            zIndex: 15,
            lineWidth: 2
        },
        modifiers: 'highlight'
    },

    constructor: function () {
        this.callParent(arguments);
        this.element.on('tap', 'selectElement', this);
    },

    applyStore: function (store, currentStore) {
        return Ext.StoreManager.lookup(store);
    },

    updateStore: function (store, currentStore) {
        var me = this;

        if (currentStore) {
            if (currentStore.autoDestroy) {
                currentStore.destroy();
            } else {
                currentStore.un({
                    scope: me,
                    updaterecord: me.onUpdateRecord,
                    refresh: me.refresh
                });
            }
        }
        if (store) {
            store.on({
                scope: me,
                updaterecord: me.onUpdateRecord,
                refresh: me.refresh
            });
        }
    },

    onResize: function () {
        this.callSuper();
        this.zoom(this.getSelection());
    },

    applyStyle: function (style, oldStyle) {
        return Ext.apply({}, style || {}, oldStyle || {});
    },

    updateStyle: function (style) {
        var me = this,
            surface = me.getSurface(),
            sprites = surface.getItems(), i;

        for (i = 0; i < sprites.length; i++) {
            sprites[i].setAttributes(style);
        }
    },

    onUpdateRecord: function (store, record) {
        var me = this,
            id = record.get('id'),
            surface = me.getSurface(),
            sprites = surface.getItems(),
            i;

        for (i = 0; i < sprites.length; i++) {
            if (sprites[i].id === id) {
                break;
            }
        }
        sprites[i].setAttributes(Ext.copyTo({}, record.data, 'path,fill'));
        sprites[i].fx.setDuration(500);
    },

    applySelection: function (selection, lastSelection) {
        if (Ext.isString(selection)) {
            selection = this.getSurface().get(selection);
        }
        if (selection === lastSelection) {
            selection = null;
        }
        return selection;
    },

    updateSelection: function (selection, lastSelection) {
        if (lastSelection) {
            lastSelection.setAttributes({highlighted: false});
        }
        if (selection) {
            selection.setAttributes({highlighted: true});
        }
        this.zoom(selection);
    },

    zoom: function (item) {
        var surface = this.getSurface(),
            bbox = item ? item.getBBox(true) : surface.getBBox(surface.getItems(), true),
            size = this.element.getSize(),
            scaling = Math.min((size.width - 30) / bbox.width, (size.height - 30) / bbox.height) * 0.8;

        this.setStyle({
            translationX: -(bbox.x + bbox.width / 2) * scaling + size.width / 2,
            translationY: -(bbox.y + bbox.height / 2) * scaling + size.height / 2,
            scalingX: scaling,
            scalingY: scaling
        });
    },

    refresh: function () {
        var me = this,
            store = me.getStore(),
            surface = me.getSurface(),
            items = store.getData().items,
            i, ln;

        for (i = 0, ln = items.length; i < ln; i++) {
            surface.add(Ext.apply({
                id: items[i].data.id,
                fill: items[i].data.fill,
                path: items[i].data.path
            }, this.template, me.getStyle()));
            me.onUpdateRecord(store, items[i]);
        }
        surface.renderFrame();
    },

    selectElement: function (e) {
        var p = e && e.event && Ext.util.Point.fromEvent(e.event) || { x: 72, y: 416 },
            me = this,
            selection = false,
            i = 0,
            surface = me.getSurface(),
            items = surface.getItems(),
            l = items.length,
            xy = this.element.getXY(),
            item = items[0], bbox,
            x = item.attr.inverseMatrix.x(p.x - xy[0], p.y - xy[1]),
            y = item.attr.inverseMatrix.y(p.x - xy[0], p.y - xy[1]);

        for (; i < l; i++) {
            item = items[i];
            bbox = item.getBBox(true);
            if (bbox.x <= x && x <= bbox.x + bbox.width && bbox.y <= y && y <= bbox.y + bbox.y + bbox.height && item.attr.path.isPointInPath(x, y)) {
                selection = item;
                break;
            }
        }

        States.app.setStateData(selection.id);
    }
});