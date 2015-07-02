/**
 * This class is used for {@link Ext.grid.Grid grid} cells that contain a child
 * {@link Ext.Component} or {@link Ext.Widget}. This cell type is typically used by
 * specifying {@link Ext.grid.column.Widget} column type.
 *
 * {@link Ext.grid.Row Rows} create cells based on the {@link Ext.grid.column.Column#cell}
 * config. Application code would rarely create cells directly.
 */
Ext.define('Ext.grid.cell.Widget', {
    extend: 'Ext.grid.cell.Base',
    xtype: 'widgetcell',

    config: {
        /**
         * @cfg {Object} widget (required)
         * The config object for a {@link Ext.Component} or {@link Ext.Widget}.
         *
         * @cfg {String} widget.xtype (required) The type of component or widget to create.
         */
        widget: null
    },

    applyWidget: function(widget) {
        if (widget) {
            var parent = this.getParent();

            if (parent && !parent.isSpecialRow) {
                widget = Ext.apply({
                    parent: this
                }, widget);
                widget = Ext.widget(widget);
            } else {
                widget = undefined;
            }
        }
        return widget;
    },

    updateWidget: function(widget, oldWidget) {
        if (oldWidget) {
            oldWidget.destroy();
        }

        if (widget) {
            this.innerElement.appendChild(widget.element);
        }
    },

    updateValue: function(value) {
        var widget = this.getWidget(),
            defaultBindProperty;
            
        if (widget) {
            defaultBindProperty = widget.defaultBindProperty;

            if (defaultBindProperty) {
                widget.setConfig(defaultBindProperty, value);
            }
        }
    },

    destroy: function() {
        this.setWidget(null);
        this.callParent();
    }
});
