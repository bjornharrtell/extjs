/**
 * This class specifies the definition for a column inside a {@link Ext.grid.Grid}. It
 * encompasses both the grid header configuration as well as displaying data within the
 * grid itself.
 *
 * In general an array of column configurations will be passed to the grid:
 *
 *     @example
 *     Ext.create('Ext.data.Store', {
 *         storeId: 'employeeStore',
 *         fields: ['firstname', 'lastname', 'seniority', 'dep', 'hired'],
 *         data: [
 *             {firstname:"Michael", lastname:"Scott", seniority:7, dep:"Management", hired:"01/10/2004"},
 *             {firstname:"Dwight", lastname:"Schrute", seniority:2, dep:"Sales", hired:"04/01/2004"},
 *             {firstname:"Jim", lastname:"Halpert", seniority:3, dep:"Sales", hired:"02/22/2006"},
 *             {firstname:"Kevin", lastname:"Malone", seniority:4, dep:"Accounting", hired:"06/10/2007"},
 *             {firstname:"Angela", lastname:"Martin", seniority:5, dep:"Accounting", hired:"10/21/2008"}
 *         ]
 *     });
 *
 *     var grid = Ext.create('Ext.grid.Grid', {
 *         title: 'Column Demo',
 *         store: Ext.data.StoreManager.lookup('employeeStore'),
 *         columns: [
 *             {text: 'First Name',  dataIndex:'firstname'},
 *             {text: 'Last Name',  dataIndex:'lastname'},
 *             {text: 'Hired Month',  dataIndex:'hired', xtype:'datecolumn', format:'M'},
 *             {text: 'Department (Yrs)', xtype:'templatecolumn', tpl:'{dep} ({seniority})'}
 *         ],
 *         width: 400
 *     });
 *     Ext.ViewPort.add(grid);
 *
 * # Convenience Subclasses
 *
 * There are several column subclasses that provide default rendering for various data types
 *
 *  - {@link Ext.grid.column.Boolean}: Renders for boolean values
 *  - {@link Ext.grid.column.Date}: Renders for date values
 *  - {@link Ext.grid.column.Number}: Renders for numeric values
 *
 * For more information about configuring cell content, see {@link Ext.grid.Grid}.
 *
 * # Setting Sizes
 *
 * The columns can be only be given an explicit width value. If no width is specified the
 * grid will automatically the size the column to 20px.
 *
 * # Header Options
 *
 *  - {@link #text}: Sets the header text for the column
 *  - {@link #sortable}: Specifies whether the column can be sorted by clicking the header
 *    or using the column menu
 *
 * # Data Options
 *
 *  - {@link #dataIndex}: The dataIndex is the field in the underlying {@link Ext.data.Store}
 *    to use as the value for the column.
 *  - {@link #renderer}: Allows the underlying store value to be transformed before being
 *    displayed in the grid.
 */
Ext.define('Ext.grid.column.Column', {
    extend: 'Ext.Component',
    alternateClassName: 'Ext.grid.column.Template',

    xtype: [ 'column', 'templatecolumn' ],

    config: {
        /**
         * @cfg {String} align
         * Sets the alignment of the header and rendered columns.
         * Possible values are: `'left'`, `'center'`, and `'right'`.
         */
        align: 'left',

        /**
         * @cfg {Object} cell
         * The config object used to create {@link Ext.grid.cell.Base cells} for this column.
         * By default, cells use the {@link Ext.grid.cell.Cell gridcell} `xtype`. To create
         * a different type of cell, simply provide this config and the desired `xtype`.
         */
        cell: {
            xtype: 'gridcell'
        },

        /**
         * @cfg {String} dataIndex
         * The name of the field in the grid's {@link Ext.data.Store}'s {@link Ext.data.Model} definition from
         * which to draw the column's value. **Required.**
         */
        dataIndex: null,

        /**
         * @cfg {String} text
         * The header text to be used as innerHTML (html tags are accepted) to display in the Grid.
         * **Note**: to have a clickable header with no text displayed you can use the default of `&#160;` aka `&nbsp;`.
         */
        text: '&nbsp;',

        /**
         * @cfg {Boolean} sortable
         * False to disable sorting of this column. Whether local/remote sorting is used is specified in
         * `{@link Ext.data.Store#remoteSort}`.
         */
        sortable: true,

        /**
         * @cfg {Boolean} groupable
         * If the grid is {@link Ext.grid.Grid#grouped grouped}, and uses a
         * {@link Ext.grid.plugin.ViewOptions ViewOptions} plugin this option may be used to
         * disable the option to group by this column. By default, the group option is enabled.
         */
        groupable: true,

        /**
         * @cfg {Boolean} resizable
         * False to prevent the column from being resizable.
         * Note that this configuration only works when the {@link Ext.grid.plugin.ColumnResizing ColumnResizing} plugin
         * is enabled on the {@link Ext.grid.Grid Grid}.
         */
        resizable: true,

        /**
         * @cfg {Boolean} hideable
         * False to prevent the user from hiding this column.
         * TODO: Not implemented yet
         * @private
         */
        hideable: true,

        /**
         * @cfg {Function/String} renderer
         * A renderer is a method which can be used to transform data (value, appearance, etc.)
         * before it is rendered.
         *
         * For example:
         *
         *      {
         *          text: 'Some column',
         *          dataIndex: 'fieldName',
         *
         *          renderer: function (value, record) {
         *              if (value === 1) {
         *                  return '1 person';
         *              }
         *              return value + ' people';
         *          }
         *      }
         *
         * If a string is supplied, it should be the name of a renderer method from the
         * appropriate {@link Ext.app.ViewController}.
         *
         * This config is only processed if the {@link #cell} type is the default of
         * {@link Ext.grid.cell.Cell gridcell}.
         *
         * **Note** See {@link Ext.grid.Grid} documentation for other, better alternatives
         * to rendering cell content.
         *
         * @cfg {Object} renderer.value The data value for the current cell.
         * @cfg {Ext.data.Model} renderer.record The record for the current row.
         * @cfg {Number} renderer.dataIndex The dataIndex of the current column.
         * @cfg {Ext.grid.cell.Base} renderer.cell The current cell.
         * @cfg {Ext.grid.column.Column} renderer.column The current column.
         * @cfg {String} renderer.return The HTML string to be rendered.
         */
        renderer: false,

        /**
         * @cfg {Object} scope
         * The scope to use when calling the {@link #renderer} function.
         */
        scope: null,

        /**
         * @cfg {Boolean} editable
         * Set this to true to make this column editable.
         * Only applicable if the grid is using an {@link Ext.grid.plugin.Editable Editable} plugin.
         * @type {Boolean}
         */
        editable: false,

        /**
         * @cfg {Object/String} editor
         * An optional xtype or config object for a {@link Ext.field.Field Field} to use for editing.
         * Only applicable if the grid is using an {@link Ext.grid.plugin.Editable Editable} plugin.
         * Note also that {@link #editable} has to be set to true if you want to make this column editable.
         * If this configuration is not set, and {@link #editable} is set to true, the {@link #defaultEditor} is used.
         */
        editor: null,

        /**
         * @cfg {Object/Ext.field.Field}
         * An optional config object that should not really be modified. This is used to create
         * a default editor used by the {@link Ext.grid.plugin.Editable Editable} plugin when no
         * {@link #editor} is specified.
         * @type {Object}
         */
        defaultEditor: {
            xtype: 'textfield',
            required: true
        },

        /**
         * @cfg {Boolean} ignore
         * This configuration should be left alone in most cases. This is used to prevent certain columns
         * (like the MultiSelection plugin column) to show up in plugins (like the {@link Ext.grid.plugin.ViewOptions} plugin).
         */
        ignore: false,

        /**
         * @cfg {String/Function} summaryType
         * This configuration specifies the type of summary. There are several built in
         * summary types. These call underlying methods on the store:
         *
         *  - {@link Ext.data.Store#count count}
         *  - {@link Ext.data.Store#sum sum}
         *  - {@link Ext.data.Store#min min}
         *  - {@link Ext.data.Store#max max}
         *  - {@link Ext.data.Store#average average}
         *
         * Any other name is assumed to be the name of a method on the associated
         * {@link Ext.app.ViewController view controller}.
         *
         * Note that this configuration only works when the grid has the
         * {@link Ext.grid.plugin.SummaryRow SummaryRow} plugin enabled.
         */
        summaryType: null,

        /**
         * @cfg {String/Function} summaryRenderer
         * This summaryRenderer is called before displaying a value in the SummaryRow. The
         * function is optional, if not specified the default calculated value is shown. The
         * summaryRenderer is called with:
         *
         *  - value {Object} - The calculated value.
         *
         * Note that this configuration only works when the grid has the
         * {@link Ext.grid.plugin.SummaryRow SummaryRow} plugin enabled.
         */
        summaryRenderer: null,

        minWidth: 20,
        baseCls: Ext.baseCSSPrefix + 'grid-column',
        sortedCls: Ext.baseCSSPrefix + 'column-sorted',
        sortDirection: null,

        /**
         * @cfg {String/String[]/Ext.XTemplate} tpl
         * An {@link Ext.XTemplate XTemplate}, or an XTemplate *definition string* to use
         * to process a {@link Ext.data.Model records} data to produce a cell's rendered
         * value.
         *
         *     @example
         *     Ext.create('Ext.data.Store', {
         *         storeId:'employeeStore',
         *         fields:['firstname', 'lastname', 'seniority', 'department'],
         *         groupField: 'department',
         *         data:[
         *             { firstname: "Michael", lastname: "Scott",   seniority: 7, department: "Management" },
         *             { firstname: "Dwight",  lastname: "Schrute", seniority: 2, department: "Sales" },
         *             { firstname: "Jim",     lastname: "Halpert", seniority: 3, department: "Sales" },
         *             { firstname: "Kevin",   lastname: "Malone",  seniority: 4, department: "Accounting" },
         *             { firstname: "Angela",  lastname: "Martin",  seniority: 5, department: "Accounting" }
         *         ]
         *     });
         *
         *     Ext.create('Ext.grid.Panel', {
         *         title: 'Column Template Demo',
         *         store: Ext.data.StoreManager.lookup('employeeStore'),
         *         columns: [{
         *             text: 'Full Name',
         *             tpl: '{firstname} {lastname}'
         *         }, {
         *             text: 'Department (Yrs)',
         *             tpl: '{department} ({seniority})'
         *         }],
         *         height: 200,
         *         width: 300,
         *         renderTo: Ext.getBody()
         *     });
         *
         * This config is only processed if the {@link #cell} type is the default of
         * {@link Ext.grid.cell.Cell gridcell}.
         *
         * **Note** See {@link Ext.grid.Grid} documentation for other, better alternatives
         * to rendering cell content.
         */
        tpl: null
    },

    applyTpl: function (tpl) {
        if (!tpl || !tpl.isXTemplate) {
            tpl = new Ext.XTemplate(tpl);
        }

        return tpl;
    },

    updateAlign: function(align, oldAlign) {
        var prefix = Ext.baseCSSPrefix + 'grid-column-align-';
        if (oldAlign) {
            this.removeCls(prefix + align);
        }
        if (align) {
            this.addCls(prefix + align);
        }
    },

    initialize: function() {
        this.callParent();

        this.element.on({
            tap: 'onColumnTap',
            longpress: 'onColumnLongPress',
            scope: this
        });
    },

    onColumnTap: function(e) {
        this.fireEvent('tap', this, e);
    },

    onColumnLongPress: function(e) {
        this.fireEvent('longpress', this, e);
    },

    updateText: function(text) {
        this.setHtml(text || '&#160;');
    },

    updateWidth: function(width, oldWidth) {
        this.callParent([width, oldWidth]);
        this.fireEvent('columnresize', this, width);
    },

    updateDataIndex: function(dataIndex) {
        var editor = this.getEditor();
        if (editor) {
            editor.name = dataIndex;
        } else {
            this.getDefaultEditor().name = dataIndex;
        }
    },

    updateSortDirection: function(direction, oldDirection) {
        if (!this.getSortable()) {
            return;
        }

        var sortedCls = this.getSortedCls();

        if (oldDirection) {
            this.element.removeCls(sortedCls + '-' + oldDirection.toLowerCase());
        }

        if (direction) {
            this.element.addCls(sortedCls + '-' + direction.toLowerCase());
        }

        this.fireEvent('sort', this, direction, oldDirection);
    }
});
