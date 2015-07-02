describe("Ext.grid.column.Column", function() {

    var defaultColumns = [
            { header: 'Name',  dataIndex: 'name', width: 100 },
            { header: 'Email', dataIndex: 'email', flex: 1 },
            { header: 'Phone', dataIndex: 'phone', flex: 1, hidden: true }
        ],
        createSimpsonsGrid = function(storeCfg, gridCfg) {
            store = Ext.create('Ext.data.Store', Ext.apply({
                storeId:'simpsonsStore',
                fields:['name', 'email', 'phone'],
                data:{'items':[
                    { 'name': 'Lisa',  "email":"lisa@simpsons.com",  "phone":"555-111-1224"  },
                    { 'name': 'Bart',  "email":"bart@simpsons.com",  "phone":"555-222-1234"  },
                    { 'name': 'Homer', "email":"homer@simpsons.com", "phone":"555-222-1244"  },
                    { 'name': 'Marge', "email":"marge@simpsons.com", "phone":"555-222-1254"  }
                ]},
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json',
                        rootProperty: 'items'
                    }
                }
            }, storeCfg));

            grid = Ext.create('Ext.grid.Panel', Ext.apply({
                title: 'Simpsons',
                store: store,
                columns: defaultColumns,
                height: 200,
                width: 400,
                renderTo: Ext.getBody()
            }, gridCfg));
            colRef = grid.getColumnManager().getColumns();
        },
        grid, store, colRef;
;

    afterEach(function(){
        Ext.destroy(grid);
        grid = null;
    });

    describe('Text field in column header', function() {
        it('should not sort when clicking into the text field', function() {
            var columns = Ext.clone(defaultColumns);

            columns[1].items = {
                xtype: 'textfield',
                flex : 1,
                margin: '2'
            };
            createSimpsonsGrid(
                null, {
                    columns: columns
                }
            );
            var textField = colRef[1].down('textfield');

            // Ensure we do not click onLeftEdge, because that would not sort anyway. Move 20px into field.
            jasmine.fireMouseEvent(textField.inputEl, 'click', textField.inputEl.getX() + 20);

            // That click into the text field should not have sorted the columns
            expect(store.getSorters().length).toBe(0);
        });
    });
    
    describe("layout", function() {
        it("should layout grouped columns correctly", function() {
            var grid = Ext.create('Ext.grid.Panel', {
                header: false,
                border: false,
                columns: [{
                    text: 'Column A'
                },
                {
                    text: 'Column B',
                    columns: [{
                        text: 'Column C'
                    }]
                },
                {
                    text: 'Column D',
                    columns: [{
                        text: 'Column E'
                    }, {
                        text: 'Column<br/>F',
                        columns: [{
                            text: 'Column G'
                        }]
                    }]
                }],
                width: 400,
                renderTo: Ext.getBody(),
                style: 'position:absolute;top:0;left:0',
                xhooks: {
                    afterRender: function() {
                        this.callParent(arguments);
                        this.headerCt.el.select('span.x-column-header-text').setStyle('display', 'block');
                    }
                }
            });

            expect(grid.headerCt).toHaveLayout({
               el: { xywh: '0 0 400 80' },
               items: {
                  0: {
                     el: { xywh: '0 0 100 80' },
                     textEl: { xywh: '6 33 87 13' },
                     titleEl: { xywh: '0 0 99 80' }
                  },
                  1: {
                     el: { xywh: '100 0 100 80' },
                     textEl: { xywh: '106 4 87 13' },
                     titleEl: { xywh: '100 0 99 22' },
                     items: {
                        0: {
                           el: { xywh: '0 22 [99,100] 58' },
                           textEl: { xywh: '6 44 [87,88] 13' },
                           titleEl: { xywh: '0 23 [99,100] 57' }
                        }
                     }
                  },
                  2: {
                     el: { xywh: '200 0 200 80' },
                     textEl: { xywh: '206 4 187 13' },
                     titleEl: { xywh: '200 0 199 22' },
                     items: {
                        0: {
                           el: { xywh: '0 22 100 58' },
                           textEl: { xywh: '6 44 87 13' },
                           titleEl: { xywh: '0 23 99 57' }
                        },
                        1: {
                           el: { xywh: '100 22 100 58' },
                           textEl: { xywh: '106 26 87 26' },
                           titleEl: { xywh: '100 23 99 34' },
                           items: {
                              0: {
                                 el: { xywh: '0 35 100 22' },
                                 textEl: { xywh: '6 39 87 13' },
                                 titleEl: { xywh: '0 36 99 21' }
                              }
                           }
                        }
                     }
                  }
               }
            });

            grid.destroy();
        });

    });

    describe("destruction", function() {
        var grid, store, cellEditingPlugin;

        beforeEach(function() {
            cellEditingPlugin = Ext.create('Ext.grid.plugin.CellEditing');
            store = Ext.create('Ext.data.Store', {
                fields:['name'],
                data: {
                    'items': [ {'name': 'A'} ]
                },
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json',
                        rootProperty: 'items'
                    }
                }
            });
            grid = Ext.create('Ext.grid.Panel', {
                store: store,
                columns: [
                    {dataIndex: 'name', editor: { xtype: 'textfield', id: 'nameEditor' }}
                ],
                plugins: [cellEditingPlugin],
                renderTo: Ext.getBody()
            });
        });

        it("should destroy the editor field that was created using the column's getEditor method", function() {
            var field = grid.headerCt.items.getAt(0).getEditor();
            grid.destroy();
            expect(field.destroyed).toBe(true);
            expect(Ext.ComponentMgr.get('nameEditor')).toBeUndefined();
        });

        it("should destroy the editor field that was created using the editing plugin's getEditor method", function() {
            var field = cellEditingPlugin.getEditor(store.getAt(0), grid.headerCt.items.getAt(0));
            grid.destroy();
            expect(field.destroyed).toBe(true);
            expect(Ext.ComponentMgr.get('nameEditor')).toBeUndefined();
        });
    });

    describe('column properties', function () {
        it('should only have one header as the root header when columns is a config', function () {
            createSimpsonsGrid();

            expect(grid.query('[isRootHeader]').length).toBe(1);
        });

        it('should only have one header as the root header when columns config is an instance', function () {
            createSimpsonsGrid({}, {
                columns: new Ext.grid.header.Container({
                    items: [
                        { header: 'Name',  columns: {
                            header: 'Foo', dataIndex: 'foo'
                        }},
                        { header: 'Email', dataIndex: 'email', flex: 1 },
                        { header: 'Phone', dataIndex: 'phone', flex: 1, hidden: true }
                    ]
                })
            });

            expect(grid.query('[isRootHeader]').length).toBe(1);
        });

        it('should have as many isColumn matches as there are defined columns', function () {
            createSimpsonsGrid({}, {
                columns: [
                    { header: 'Name',  dataIndex: 'name', width: 100 },
                    { header: 'Email', dataIndex: 'email', flex: 1 },
                    { header: 'Phone', dataIndex: 'phone', flex: 1, hidden: true }
                ]
            });

            expect(grid.query('[isColumn]').length).toBe(3);
        });

        it('should have as many isGroupHeader matches as there are defined column groups', function () {
            createSimpsonsGrid({}, {
                columns: [
                    { header: 'Name',  columns: {
                        header: 'Foo', dataIndex: 'foo'
                    }},
                    { header: 'Email', columns: {
                        header: 'Bar', dataIndex: 'bar'
                    }},
                    { header: 'Phone', dataIndex: 'phone', flex: 1, hidden: true }
                ]
            });

            expect(grid.query('[isGroupHeader]').length).toBe(2);
        });

        it('should not have any isGroupHeader matches if there are no column groups', function () {
            createSimpsonsGrid({}, {
                columns: [
                    { header: 'Name',  dataIndex: 'name', width: 100 },
                    { header: 'Email', dataIndex: 'email', flex: 1 },
                    { header: 'Phone', dataIndex: 'phone', flex: 1, hidden: true }
                ]
            });

            expect(grid.query('[isGroupHeader]').length).toBe(0);
        });
    });
});
