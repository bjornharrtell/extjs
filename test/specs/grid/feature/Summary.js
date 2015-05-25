describe('Ext.grid.feature.Summary', function () {
    var grid, view, store, summary, params, selector, data;

    function createGrid(gridCfg, summaryCfg, storeCfg, configuredData) {
        data = [{
            student: 'Student 1',
            subject: 'Math',
            mark: 84
        },{
            student: 'Student 1',
            subject: 'Science',
            mark: 72
        },{
            student: 'Student 2',
            subject: 'Math',
            mark: 96
        },{
            student: 'Student 2',
            subject: 'Science',
            mark: 68
        }];

        var storeData = configuredData || data;

        store = new Ext.data.Store(Ext.apply({
            fields: ['student', 'subject', {
                name: 'mark',
                type: 'int'
            }],
            data: storeData,
            autoDestroy: true
        }, storeCfg));

        summary = new Ext.grid.feature.Summary(Ext.apply({
            ftype: 'summary'
        }, summaryCfg));

        grid = new Ext.grid.Panel(Ext.apply({
            store: store,
            columns: [{
                itemId: 'studentColumn',
                dataIndex: 'student',
                flex: 1,
                text: 'Name',
                summaryType: 'count',
                summaryRenderer: function (value, summaryData, field) {
                    params = arguments;
                    return Ext.String.format('{0} student{1}', value, value !== 1 ? 's' : '');
                }
            }, {
                itemId: 'markColumn',
                dataIndex: 'mark',
                text: 'Mark',
                summaryType: 'average'
            }],
            width: 600,
            height: 300,
            features: summary,
            renderTo: Ext.getBody()
        }, gridCfg));

        view = grid.view;
        selector = summary.summaryRowSelector;
    }

    afterEach(function () {
        grid = view = store = summary = params = Ext.destroy(grid);
    });

    function getSummary() {
        return view.el.down(selector, true) || null;
    }

    describe('init', function () {
        it('should give the item a default class', function () {
            createGrid();
            expect(getSummary()).toHaveCls(summary.summaryRowCls);
        });

        it('should respect configured value for summaryRowCls', function () {
            var cls = 'utley';

            createGrid(null, {
                summaryRowCls: cls
            });

            expect(view.el.down('.' + cls, true)).toHaveCls(cls);
        });
    });

    describe('No data', function() {
        it('should size the columns in the summary', function () {
            createGrid(null, null, null, []);

            var row = grid.view.el.down('tr', true);

            // TableLayout should also flush when no data, just summary rows.
            expect(row.childNodes[0].offsetWidth).toBe(498);
            expect(row.childNodes[1].offsetWidth).toBe(100);
        });
    });

    describe('summaryRenderer', function () {
        it('should be passed the expected function parameters', function () {
            createGrid();

            // Params should be:
            //     value - The calculated value.
            //     summaryData - Contains all raw summary values for the row.
            //     field - The name of the field we are calculating
            //     metaData - The collection of metadata about the current cell.
            expect(params.length).toBe(4);
            expect(params[0]).toBe(4);
            expect(params[1]).toEqual({
                studentColumn: 4,
                markColumn: 80
            });
            expect(params[2]).toBe('student');
            expect(params[3].tdCls).toBeDefined();
        });

        it('should not blow out the table cell if the value returned from the renderer is bigger than the allotted width', function () {
            createGrid({
                columns: [{
                    dataIndex: 'student',
                    text: 'Name',
                    summaryType: 'count',
                    summaryRenderer: function (value, summaryData, field) {
                        return 'Lily Rupert Utley Molly Pete';
                    }
                }, {
                    dataIndex: 'mark',
                    text: 'Mark',
                    summaryType: 'average'
                }]
            });

            // For the comparison, just grab the first table cell in the view and compare it to the first table cell within the feature.
            expect(grid.view.body.down('.x-grid-row-summary td').getWidth()).toEqual(grid.view.body.down('.x-grid-cell').getWidth());
        });
    });

    describe('no summaryRenderer', function () {
        it('should display the summary result', function () {
            var node;

            createGrid({
                columns: [{
                    id: 'markColumn',
                    dataIndex: 'mark',
                    text: 'Mark',
                    summaryType: 'average'
                }]
            });

            node = getSummary();

            expect((node.textContent || node.innerText).replace(/\r\n?|\n/g, '')).toBe('80');
        });
    });

    // These aren't great tests, but there isn't really an API for these things
    describe("dock", function() {
        it("should dock top under the headers", function() {
            createGrid(null, {
                dock: 'top'
            });
            expect(grid.getDockedItems()[1]).toBe(summary.summaryBar);
        });

        it("should dock at the bottom under the headers", function() {
            createGrid(null, {
                dock: 'bottom'
            });
            var item = grid.getDockedItems()[1];
            expect(item).toBe(summary.summaryBar);
            expect(item.dock).toBe('bottom');
        });
    });

    describe("toggling the summary row", function() {
        function toggle(visible) {
            summary.toggleSummaryRow(visible);
        }

        describe("without docking", function() {
            it("should show the summary row by default", function() {
                createGrid();
                expect(getSummary()).not.toBeNull();
            });

            it("should not render the summary rows if configured with showSummaryRow: false", function() {
                createGrid(null, {
                    showSummaryRow: false
                });
                expect(getSummary()).toBeNull();
            });

            it("should not show summary rows when toggling off", function() {
                createGrid();
                expect(getSummary()).not.toBeNull();
                toggle();
                expect(getSummary()).toBeNull();
            });

            it("should show summary rows when toggling on", function() {
                createGrid(null, {
                    showSummaryRow: false
                });
                expect(getSummary()).toBeNull();
                toggle();
                expect(getSummary()).not.toBeNull();
            });

            it("should leave the summary visible when explicitly passing visible: true", function() {
                createGrid();
                toggle(true);
                expect(getSummary()).not.toBeNull();
            });

            it("should leave the summary off when explicitly passed visible: false", function() {
                createGrid();
                toggle();
                toggle(false);
                expect(getSummary()).toBeNull();
            });

            it("should update the summary row if the change happened while not visible", function() {
                createGrid();
                // Off
                toggle();
                store.first().set('mark', 0);
                toggle();

                var cell = Ext.fly(getSummary()).down(grid.down('#markColumn').getCellSelector()),
                    content = cell.down(grid.getView().innerSelector).dom.innerHTML;

                expect(content).toBe('59');
            });
        });

        describe("with docking", function() {
            it("should show the summary row by default", function() {
                createGrid(null, {
                    dock: 'top'
                });
                expect(summary.getSummaryBar().isVisible()).toBe(true);
            });

            it("should not render the summary rows if configured with showSummaryRow: false", function() {
                createGrid(null, {
                    dock: 'top',
                    showSummaryRow: false
                });
                expect(summary.getSummaryBar().isVisible()).toBe(false);
            });

            it("should not show summary rows when toggling off", function() {
                createGrid(null, {
                    dock: 'top'
                });
                expect(summary.getSummaryBar().isVisible()).toBe(true);
                toggle();
                expect(summary.getSummaryBar().isVisible()).toBe(false);
            });

            it("should show summary rows when toggling on", function() {
                createGrid(null, {
                    dock: 'top',
                    showSummaryRow: false
                });
                expect(summary.getSummaryBar().isVisible()).toBe(false);
                toggle();
                expect(summary.getSummaryBar().isVisible()).toBe(true);
            });

            it("should leave the summary visible when explicitly passing visible: true", function() {
                createGrid(null, {
                    dock: 'top'
                });
                toggle(true);
                expect(summary.getSummaryBar().isVisible()).toBe(true);
            });

            it("should leave the summary off when explicitly passed visible: false", function() {
                createGrid(null, {
                    dock: 'top'
                });
                toggle();
                toggle(false);
                expect(summary.getSummaryBar().isVisible()).toBe(false);
            });

            it("should update the summary row when if the change happened while not visible and docked", function() {
                createGrid(null, {
                    dock: 'top'
                });
                // Off
                toggle();
                store.first().set('mark', 0);
                toggle();
                var cell = summary.summaryBar.getEl().down(grid.down('#markColumn').getCellSelector());
                var content = cell.down(grid.getView().innerSelector).dom.innerHTML;
                expect(content).toBe('59');
            });
        });
    });
    
    describe('calculated fields', function() {
        it('should work', function() {
            var MyModel = Ext.define(null, {
                extend: 'Ext.data.Model',
                fields: [{
                    name: 'text',
                    type: 'string'
                }, {
                    name: 'priceEx',
                    type: 'float'
                }, {
                    name: 'vat',
                    type: 'float'
                }, {
                    name: 'priceInc',
                    calculate: function(data) {
                        return data.priceEx * data.vat;
                    },
                    type: 'float'
                }]
            });

            grid = Ext.create('Ext.grid.Panel', {
                renderTo: Ext.getBody(),
                width: 400,
                height: 600,
                features: [{
                    ftype: 'summary'
                }, {
                    ftype: 'groupingsummary'
                }],
            
                // put calculated field first, so that when the priceEx is set in the summary record
                // we test that this dependent field is NOT updated
                columns: [{
                    text: 'Price inc',
                    dataIndex: 'priceInc',
                    summaryType: 'sum',
                    formatter: 'number("0.00")',
                    summaryFormatter: 'number("0.00")'
                }, {
                    text: 'Name',
                    dataIndex: 'text',
                    summaryType: 'none'
                }, {
                    text: 'Price ex',
                    dataIndex: 'priceEx',
                    summaryType: 'sum'
                }],
                store: {
                    type: 'array',
                    model: MyModel,
                    groupField: 'text',
                    data: [
                        ['Foo', 100, 1.1],
                        ['Bar', 200, 1.25],
                        ['Gah', 150, 1.25],
                        ['Meh', 99, 1.30],
                        ['Muh', 80, 1.40]
                    ]
                }
            });

            // Hoik out textual content
            var viewText = (grid.getView().el.dom.textContent || grid.getView().el.dom.innerText).replace(/\s/g, '');

            // Compare it to known correct content
            expect(viewText).toBe("Name:Bar250.00Bar200250.00200Name:Foo110.00Foo100110.00100Name:Gah187.50Gah150187.50150Name:Meh128.70Meh99128.7099Name:Muh112.00Muh80112.0080788.20629");
        });
    });

    describe('remoteRoot', function () {
        function completeWithData(data) {
            Ext.Ajax.mockComplete({
                status: 200,
                responseText: Ext.JSON.encode(data)
            });
        }

        beforeEach(function () {
            MockAjaxManager.addMethods();

            createGrid(null, {
                remoteRoot: 'summaryData'
            }, {
                remoteSort: true,
                proxy: {
                    type: 'ajax',
                    url: 'data.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                },
                grouper: {property: 'student'},
                data: null
            });

            store.load();

            completeWithData({
                data: data,
                summaryData: {
                    mark: 42,
                    student: 15
                },
                total: 4
            });
        });

        afterEach(function () {
            MockAjaxManager.removeMethods();
        });

        it('should correctly render the data in the view', function () {
            var summaryRow = getSummary(),
                text = (summaryRow.textContent || summaryRow.innerText).replace(/\s/g, '');

            expect(text).toBe('15students42');
        });

        it('should create a summaryRecord', function () {
            var record = summary.summaryRecord;

            expect(record.isModel).toBe(true);
            expect(record.get('mark')).toBe(42);
            expect(record.get('student')).toBe(15);
        });
    });

    describe("reacting to store changes", function() {
        function expectContent(dock, values) {
            var content;

            if (dock) {
                content = summary.summaryBar.el.query(view.innerSelector);
            } else {
                content = Ext.fly(getSummary()).query(view.innerSelector);
            }

            Ext.Array.forEach(content, function(el, idx) {
                expect(el).hasHTML(values[idx]);
            });
        }

        describe("before being rendered", function() {
            function makeSuite(withDocking) {
                describe(withDocking ? "with docking" : "without docking", function() {
                    beforeEach(function() {
                        createGrid({
                            renderTo: null
                        }, {
                            dock: withDocking ? 'top' : null
                        });
                    });

                    it("should not cause an exception on update", function() {
                        expect(function() {
                            store.getAt(0).set('mark', 100);
                        }).not.toThrow();
                    });

                    it("should not cause an exception on add", function() {
                        expect(function() {
                            store.add({
                                student: 'Student 5',
                                subject: 'Math',
                                mark: 10
                            });
                        }).not.toThrow();
                    });

                    it("should not cause an exception on remove", function() {
                        expect(function() {
                            store.removeAt(3);
                        }).not.toThrow();
                    });

                    it("should not cause an exception on removeAll", function() {
                        expect(function() {
                            store.removeAll();
                        }).not.toThrow();
                    });

                    it("should not cause an exception on load of new data", function() {
                        expect(function() {
                            store.loadData([{
                                student: 'Foo',
                                mark: 75
                            }, {
                                student: 'Bar',
                                mark: 25
                            }]);
                        }).not.toThrow();
                    });
                });
            }
            makeSuite(false);
            makeSuite(true);
        });

        describe("original store", function() {
            function makeSuite(withDocking) {
                describe(withDocking ? "with docking" : "without docking", function() {
                    beforeEach(function() {
                        createGrid(null, {
                            dock: withDocking ? 'top' : null
                        });
                    });

                    it("should react to an update", function() {
                        store.getAt(0).set('mark', 100);
                        expectContent(withDocking, ['4 students', '84']);
                    });

                    it("should react to an add", function() {
                        store.add({
                            student: 'Student 5',
                            subject: 'Math',
                            mark: 10
                        });
                        expectContent(withDocking, ['5 students', '66']);
                    });

                    it("should react to a remove", function() {
                        store.removeAt(3);
                        expectContent(withDocking, ['3 students', '84']);
                    });

                    it("should react to a removeAll", function() {
                        store.removeAll();
                        expectContent(withDocking, ['0 students', '0']);
                    });

                    it("should react to a load of new data", function() {
                        store.loadData([{
                            student: 'Foo',
                            mark: 75
                        }, {
                            student: 'Bar',
                            mark: 25
                        }]);
                        expectContent(withDocking, ['2 students', '50']);
                    });
                });
            }
            makeSuite(false);
            makeSuite(true);
        });

        describe("reconfigured store", function() {
            function makeSuite(withDocking) {
                describe(withDocking ? "with docking" : "without docking", function() {
                    beforeEach(function() {
                        createGrid(null, {
                            dock: withDocking ? 'top' : null
                        });
                        var oldStore = store;
                        store = new Ext.data.Store({
                            fields: ['student', 'subject', {
                                name: 'mark',
                                type: 'int'
                            }],
                            data: [{
                                student: 'Student 1',
                                mark: 30
                            }, {
                                student: 'Student 2',
                                mark: 50
                            }],
                            autoDestroy: true
                        });
                        grid.reconfigure(store);
                        oldStore.destroy();
                    });

                    it("should react to an update", function() {
                        store.getAt(0).set('mark', 100);
                        expectContent(withDocking, ['2 students', '75']);
                    });

                    it("should react to an add", function() {
                        store.add({
                            student: 'Student 3',
                            mark: 10
                        });
                        expectContent(withDocking, ['3 students', '30']);
                    });

                    it("should react to a remove", function() {
                        store.removeAt(0);
                        expectContent(withDocking, ['1 student', '50']);
                    });

                    it("should react to a removeAll", function() {
                        store.removeAll();
                        expectContent(withDocking, ['0 students', '0']);
                    });

                    it("should react to a load of new data", function() {
                        store.loadData([{
                            student: 'Foo',
                            mark: 75
                        }, {
                            student: 'Bar',
                            mark: 25
                        }]);
                        expectContent(withDocking, ['2 students', '50']);
                    });
                });
            }
            makeSuite(false);
            makeSuite(true);
        });
    });

    describe("buffered rendering", function() {
        it("should not render the summary row until the last row is in the view", function() {

            var data = [],
                i, last, rowHeight;

            function getLastNode() {
                var nodes = view.getNodes(),
                    rec = view.getRecord(nodes[nodes.length - 1]);

                return rec ? rec.getId() : null;
            }

            for (i = 1; i <= 1000; ++i) {
                data.push({
                    id: i,
                    student: 'Student ' + i,
                    subject: (i % 2 === 0) ? 'Math' : 'Science',
                    mark: i % 100
                });
            }

            createGrid({
                bufferedRenderer: true
            }, null, null, data);

            rowHeight = Ext.fly(view.getNode(0)).getHeight();

            expect(view.getEl().down(selector)).toBeNull();
            last = getLastNode();
            grid.scrollByDeltaY(rowHeight * 100);

            waitsFor(function() {
                return getLastNode() !== last;
            });

            runs(function() {
                last = getLastNode();
                expect(view.getEl().down(selector)).toBeNull();
                grid.scrollByDeltaY(rowHeight * 200);
            });

            waitsFor(function() {
                return getLastNode() !== last;
            });

            runs(function() {
                last = getLastNode();
                expect(view.getEl().down(selector)).toBeNull();
                grid.scrollByDeltaY(rowHeight * 400);
            });

            waitsFor(function() {
                return getLastNode() !== last;
            });

            runs(function() {
                last = getLastNode();
                expect(view.getEl().down(selector)).toBeNull();
                grid.scrollByDeltaY(rowHeight * 100);
            });

            waitsFor(function() {
                return getLastNode() !== last;
            });

            runs(function() {
                last = getLastNode();
                expect(view.getEl().down(selector)).toBeNull();
                // Force to the end
                grid.scrollByDeltaY(rowHeight * 500);
            });

            waitsFor(function() {
                return getLastNode() !== last;
            });

            runs(function() {
                expect(view.getEl().down(selector)).not.toBeNull();
            });

        });
    });
});

