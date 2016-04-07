describe('Ext.grid.plugin.RowExpander', function () {
    var dummyData = [
            ['3m Co',71.72,0.02,0.03,'9/1 12:00am', 'Manufacturing'],
            ['Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am', 'Manufacturing'],
            ['Altria Group Inc',83.81,0.28,0.34,'9/1 12:00am', 'Manufacturing'],
            ['American Express Company',52.55,0.01,0.02,'9/1 12:00am', 'Finance'],
            ['American International Group, Inc.',64.13,0.31,0.49,'9/1 12:00am', 'Services'],
            ['AT&T Inc.',31.61,-0.48,-1.54,'9/1 12:00am', 'Services'],
            ['Boeing Co.',75.43,0.53,0.71,'9/1 12:00am', 'Manufacturing'],
            ['Caterpillar Inc.',67.27,0.92,1.39,'9/1 12:00am', 'Services'],
            ['Citigroup, Inc.',49.37,0.02,0.04,'9/1 12:00am', 'Finance'],
            ['E.I. du Pont de Nemours and Company',40.48,0.51,1.28,'9/1 12:00am', 'Manufacturing'],
            ['Exxon Mobil Corp',68.1,-0.43,-0.64,'9/1 12:00am', 'Manufacturing'],
            ['General Electric Company',34.14,-0.08,-0.23,'9/1 12:00am', 'Manufacturing'],
            ['General Motors Corporation',30.27,1.09,3.74,'9/1 12:00am', 'Automotive'],
            ['Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am', 'Computer'],
            ['Honeywell Intl Inc',38.77,0.05,0.13,'9/1 12:00am', 'Manufacturing'],
            ['Intel Corporation',19.88,0.31,1.58,'9/1 12:00am', 'Computer'],
            ['International Business Machines',81.41,0.44,0.54,'9/1 12:00am', 'Computer'],
            ['Johnson & Johnson',64.72,0.06,0.09,'9/1 12:00am', 'Medical'],
            ['JP Morgan & Chase & Co',45.73,0.07,0.15,'9/1 12:00am', 'Finance'],
            ['McDonald\'s Corporation',36.76,0.86,2.40,'9/1 12:00am', 'Food'],
            ['Merck & Co., Inc.',40.96,0.41,1.01,'9/1 12:00am', 'Medical'],
            ['Microsoft Corporation',25.84,0.14,0.54,'9/1 12:00am', 'Computer'],
            ['Pfizer Inc',27.96,0.4,1.45,'9/1 12:00am', 'Services', 'Medical'],
            ['The Coca-Cola Company',45.07,0.26,0.58,'9/1 12:00am', 'Food'],
            ['The Home Depot, Inc.',34.64,0.35,1.02,'9/1 12:00am', 'Retail'],
            ['The Procter & Gamble Company',61.91,0.01,0.02,'9/1 12:00am', 'Manufacturing'],
            ['United Technologies Corporation',63.26,0.55,0.88,'9/1 12:00am', 'Computer'],
            ['Verizon Communications',35.57,0.39,1.11,'9/1 12:00am', 'Services'],
            ['Wal-Mart Stores, Inc.',45.45,0.73,1.63,'9/1 12:00am', 'Retail'],
            ['Walt Disney Company (The) (Holding Company)',29.89,0.24,0.81,'9/1 12:00am', 'Services']
        ],
        store, expander, grid, view, bufferedRenderer, columns, i;


    // add in some dummy descriptions
    for (i = 0; i < dummyData.length; i++){
        dummyData[i].push('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales non, iaculis ac, lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet tincidunt quam turpis vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna.<br/><br/>Aliquam commodo ullamcorper erat. Nullam vel justo in neque porttitor laoreet. Aenean lacus dui, consequat eu, adipiscing eget, nonummy non, nisi. Morbi nunc est, dignissim non, ornare sed, luctus eu, massa. Vivamus eget quam. Vivamus tincidunt diam nec urna. Curabitur velit.');
    }

    function makeGrid(gridCfg, rowExpanderCfg) {
        gridCfg = gridCfg || {};

        Ext.define('spec.RowExpanderCompany', {
            extend: 'Ext.data.Model',
            fields: [
            {name: 'company'},
            {name: 'price', type: 'float'},
            {name: 'change', type: 'float'},
            {name: 'pctChange', type: 'float'},
            {name: 'lastChange', type: 'date',  dateFormat: 'n/j h:ia'},
            {name: 'industry'},
                // Rating dependent upon performance 0 = best, 2 = worst
                {
                    name: 'rating',
                    type: 'int',
                    convert: function(value, record) {
                        var pct = record.get('pctChange');

                        if (pct < 0) {
                            return 2;
                        }

                        if (pct < 1) {
                            return 1;
                        }

                        return 0;
                    }
                }
            ]
        });
        store = new Ext.data.Store({
            model: 'spec.RowExpanderCompany',
            data: dummyData,
            autoDestroy: true
        });

        expander = new Ext.grid.plugin.RowExpander(Ext.apply({
            rowBodyTpl : new Ext.XTemplate(
                '<p><b>Company:</b> {company}</p>',
                '<p><b>Change:</b> {change:this.formatChange}</p><br>',
                '<p><b>Summary:</b> {desc}</p>',
                {
                    formatChange: function(v){
                        var color = v >= 0 ? 'green' : 'red';
                        return '<span style="color: ' + color + ';">' + Ext.util.Format.usMoney(v) + '</span>';
                    }
                }
            )}, rowExpanderCfg || {}));

        columns = gridCfg.columns || [
            {text: "Company", flex: 1, dataIndex: 'company'},
            {text: "Price", renderer: Ext.util.Format.usMoney, dataIndex: 'price'},
            {text: "Change", dataIndex: 'change'},
            {text: "% Change", dataIndex: 'pctChange'},
            {text: "Last Updated", renderer: Ext.util.Format.dateRenderer('m/d/Y'), dataIndex: 'lastChange'}
        ];

        grid = new Ext.grid.Panel(Ext.apply({
            store: store,
            columns: columns,
            viewConfig: {
                forceFit: true
            },
            width: 600,
            height: 300,
            plugins: expander,
            title: 'Expander Rows, Collapse and Force Fit',
            renderTo: document.body
        }, gridCfg)),
            view = grid.getView(),
            bufferedRenderer = view.bufferedRenderer;
    }

    afterEach(function () {
        Ext.destroy(grid);
        store = expander = grid = columns = null;
        Ext.undefine('spec.RowExpanderCompany');
        Ext.data.Model.schema.clear();
    });

    describe("RowExpander", function () {
        it("should not expand in response to mousedown", function() {
            makeGrid();

            jasmine.fireMouseEvent(grid.view.el.query('.x-grid-row-expander')[0], 'mousedown');

            expect(grid.view.all.item(0).down('.' + Ext.baseCSSPrefix + 'grid-rowbody-tr').isVisible()).toBe(false);
        });

        it("should expand on click", function() {
            makeGrid();

            jasmine.fireMouseEvent(grid.view.el.query('.x-grid-row-expander')[0], 'click');

            expect(grid.view.all.item(0).down('.' + Ext.baseCSSPrefix + 'grid-rowbody-tr').isVisible()).toBe(true);
        });

        it("should collapse on click", function() {
            makeGrid();

            // start with row 0 expanded
            expander.toggleRow(0, store.getAt(0));

            jasmine.fireMouseEvent(grid.view.el.query('.x-grid-row-expander')[0], 'click');

            expect(grid.view.all.item(0).down('.' + Ext.baseCSSPrefix + 'grid-rowbody-tr').isVisible()).toBe(false);
        });

        describe("with a lockedTpl", function() {
            beforeEach(function() {
                makeGrid({
                    columns: [
                        {text: "Company", width: 200, dataIndex: 'company', locked: true},
                        {text: "Price", renderer: Ext.util.Format.usMoney, dataIndex: 'price'},
                        {text: "Change", dataIndex: 'change'},
                        {text: "% Change", dataIndex: 'pctChange'},
                        {text: "Last Updated", renderer: Ext.util.Format.dateRenderer('m/d/Y'), dataIndex: 'lastChange'}
                    ]
                }, {
                    rowBodyTpl : new Ext.XTemplate(
                        '<p><b>Company:</b> {company}</p>',
                        '<p><b>Change:</b> {change:this.formatChange}</p><br>',
                        '<p><b>Summary:</b> {desc}</p>',
                        {
                            formatChange: function(v){
                                var color = v >= 0 ? 'green' : 'red';
                                return '<span style="color: ' + color + ';">' + Ext.util.Format.usMoney(v) + '</span>';
                            }
                        }
                    ),
                    lockedTpl: new Ext.XTemplate('{industry}')
                });
            });

            it("should not expand in response to mousedown", function() {
                jasmine.fireMouseEvent(grid.lockedGrid.view.el.query('.x-grid-row-expander')[0], 'mousedown');

                expect(grid.lockedGrid.view.all.item(0).down('.' + Ext.baseCSSPrefix + 'grid-rowbody-tr').isVisible()).toBe(false);
            });

            it("should expand on click", function() {
                jasmine.fireMouseEvent(grid.lockedGrid.view.el.query('.x-grid-row-expander')[0], 'click');

                expect(grid.lockedGrid.view.all.item(0).down('.' + Ext.baseCSSPrefix + 'grid-rowbody-tr').isVisible()).toBe(true);
            });

            it("should collapse on click", function() {
                // start with row 0 expanded
                expander.toggleRow(0, store.getAt(0));

                // click to collapse
                jasmine.fireMouseEvent(grid.lockedGrid.view.el.query('.x-grid-row-expander')[0], 'click');

                // The rowbody row of item 0 should not be visible
                expect(grid.lockedGrid.view.all.item(0).down('.' + Ext.baseCSSPrefix + 'grid-rowbody-tr').isVisible()).toBe(false);

                // Check the content of the rowbody in the locked side.
                // The lockedTpl specifies that it be the industry field.
                expect(grid.lockedGrid.view.all.item(0).down('.' + Ext.baseCSSPrefix + 'grid-rowbody', true).firstChild.data).toBe(grid.store.getAt(0).get('industry'));

                // Check thetwo rows (one on each side) are synched in height
                // The lockedTpl specifies that it be the industry field.
                expect(grid.lockedGrid.view.all.item(0).getHeight()).toBe(grid.normalGrid.view.all.item(0).getHeight());
            });
        });

        describe('striping rows', function () {
            describe('normal grid', function () {
                it("should place the altRowCls on the view row's ancestor row", function () {
                    // The .x-grid-item-alt class is now placed on the view *item*. The row table.
                    // See EXTJSIV-612.
                    makeGrid();

                    var node = grid.view.getNode(store.getAt(1));

                    expect(Ext.fly(node).hasCls('x-grid-item-alt')).toBe(true);
                });
            });

            describe('locked grid', function () {
                it("should place the altRowCls on the view row's ancestor row", function () {
                    // The .x-grid-item-alt class is now placed on the view *item*. The row table.
                    // See EXTJSIV-612.
                    makeGrid({
                        columns: [
                            {text: 'Company', dataIndex: 'company', locked: true},
                            {text: 'Price', dataIndex: 'price', locked: true},
                            {text: 'Change', dataIndex: 'change'},
                            {text: '% Change', dataIndex: 'pctChange'},
                            {text: 'Last Updated', dataIndex: 'lastChange'}
                        ]
                    });

                    var lockedNode = grid.view.getNode(store.getAt(1)),
                        normalNode = grid.normalGrid.view.getNode(store.getAt(1));

                    expect(Ext.fly(lockedNode).hasCls('x-grid-item-alt')).toBe(true);
                    expect(Ext.fly(normalNode).hasCls('x-grid-item-alt')).toBe(true);
                });

                it("should sync row heights when buffered renderer adds new rows during scroll", function () {
                    makeGrid({
                        leadingBufferZone: 2,
                        trailingBufferZone: 2,
                        height: 100,
                        columns: [
                            {text: 'Company', dataIndex: 'company', locked: true},
                            {text: 'Price', dataIndex: 'price', locked: true},
                            {text: 'Change', dataIndex: 'change'},
                            {text: '% Change', dataIndex: 'pctChange'},
                            {text: 'Last Updated', dataIndex: 'lastChange'}
                        ]
                    });

                    // Get the expander elements to click on
                    var expanders = grid.view.el.query('.x-grid-row-expander'),
                        lockedView = grid.lockedGrid.view,
                        normalView = grid.normalGrid.view,
                        item0CollapsedHeight = lockedView.all.item(0, true).offsetHeight,
                        item0ExpandedHeight;

                    // Expand first row
                    jasmine.fireMouseEvent(expanders[0], 'click');

                    item0ExpandedHeight = lockedView.all.item(0, true).offsetHeight;

                    // item 0 should have expanded
                    expect(item0ExpandedHeight).toBeGreaterThan(item0CollapsedHeight);

                    // Locked side's item 0 should have synced height
                    expect(normalView.all.item(0, true).offsetHeight).toBe(item0ExpandedHeight);

                    normalView.setScrollY(1000);

                    waits(500);
                    runs(function() {
                        normalView.setScrollY(0);
                    });

                    waits(500);
                    runs(function() {
                        // We scrolled the normal view, and the locked view should have had its newly rendered row 0 height synced
                        expect(lockedView.all.item(0, true).offsetHeight).toBe(item0ExpandedHeight);
                    });
                });
            });
        });

        it('should work when defined in a subclass', function () {
            // The point of this spec is to demonstrate that the RowExpander plugin, which depends on the
            // RowBody grid feature, will still be properly constructed and rendered when defined in initComponent
            // in a subclass of grid (really, anything that has panel.Table as an ancestor class).
            //
            // The bug was that the plugin configured in the derived class' initComponent would not be properly
            // rendered since it would be created AFTER the table view was created (and the view needs to know
            // about all its features at construction time). Thus, checking its features length is sufficient to
            // show that it's been fixed.
            // See EXTJSIV-EXTJSIV-11927.
            makeGrid({
                xhooks: {
                    initComponent: function () {
                        Ext.apply(this, {
                            store: [],
                            columns: [],
                            plugins: [{
                                ptype: 'rowexpander',
                                rowBodyTpl: new Ext.XTemplate(
                                    '<p><b>Company:</b> {company}</p>',
                                    '<p><b>Change:</b> {change:this.formatChange}</p><br>',
                                    '<p><b>Summary:</b> {desc}</p>'
                                )
                            }]
                        });

                        this.callParent(arguments);
                    }
                }
            });

            expect(grid.view.features.length).toBe(1);
        });

        it('should insert a colspan attribute on the rowwrap cell equal to the number of grid columns', function () {
            makeGrid({
                columns: [
                    {text: 'Company', dataIndex: 'company'},
                    {text: 'Price', dataIndex: 'price'},
                    {text: 'Change', dataIndex: 'change'},
                    {text: '% Change', dataIndex: 'pctChange'},
                    {text: 'Last Updated', dataIndex: 'lastChange'}
                ]
            });

            // Grid columns + row expander column = 6.
            expect(parseInt(grid.body.down('.x-grid-cell-rowbody', true).getAttribute('colspan'), 10)).toBe(6);
        });

        it('should expand the buffered rendering scroll range when at the bottom and the row is expanded', function() {
            makeGrid({
                leadingBufferZone: 2,
                trailingBufferZone: 2,
                height: 100
            });

            expect(bufferedRenderer).toBeDefined();

            // Scroll until last row visible
            waitsFor(function() {
                view.setScrollY(view.getScrollY() + 10);
                return view.all.endIndex === store.getCount() - 1;
            });

            runs(function() {
                // Get the expander elements to click on
                var expanders = view.el.query('.x-grid-row-expander'),
                    scroller = view.getScrollable(),
                    scrollHeight = scroller.getSize().y;

                // Expand last row
                jasmine.fireMouseEvent(expanders[expanders.length - 1], 'click');

                // Scroll range must have increased.
                expect(scroller.getSize().y).toBeGreaterThan(scrollHeight);
            });
        });

        describe('locking grid', function () {
            describe('no initial locked columns', function () {
                beforeEach(function () {
                    makeGrid({
                        enableLocking: true
                    });
                });

                it('should add the expander column to the normal grid', function () {
                    expect(expander.grid).toBe(grid.normalGrid);
                });

                it('should hide the locked grid', function () {
                    expect(grid.lockedGrid.hidden).toBe(true);
                });

                it('should move the expander column to the locked grid when first column is locked', function () {
                    // Pass in an active header. Don't use the first column in the stack (it's the rowexpander column)!
                    grid.lock(grid.columnManager.getColumns()[1]);

                    expect(expander.grid).toBe(grid.lockedGrid);
                });
            });

            describe('has locked columns', function () {
                beforeEach(function () {
                    makeGrid({
                        columns: [
                            {text: 'Company', locked: true, dataIndex: 'company'},
                            {text: 'Price', dataIndex: 'price'},
                            {text: 'Change', dataIndex: 'change'},
                            {text: '% Change', dataIndex: 'pctChange'},
                            {text: 'Last Updated', dataIndex: 'lastChange'}
                        ]
                    });
                });

                it('should add the expander column to the locked grid', function () {
                    expect(expander.grid).toBe(grid.lockedGrid);
                });

                it('should not hide the locked grid', function () {
                    expect(grid.lockedGrid.hidden).toBe(false);
                });

                it('should move the expander column to the normal grid when there are no locked columns', function () {
                    // Pass in an active header. Don't use the first column in the stack (it's the rowexpander column)!
                    grid.unlock(grid.columnManager.getColumns()[1]);

                    expect(grid.lockedGrid);
                    expect(expander.grid).toBe(grid.normalGrid);
                });
            });
        });
    });
});
