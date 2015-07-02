describe("Ext.layout.container.CheckboxGroup", function() {
    
    var expectColumnToContainExactly = function() {
        var column = arguments[0],
            argumentsLength = arguments.length,
            checkboxes = [],
            checkboxesLength, i;
        
        for (i = 1; i < argumentsLength; i++) {
            checkboxes[i - 1] = Ext.getCmp(arguments[i]).el.dom;
        }
        checkboxesLength = checkboxes.length;
        
        expect(column.childNodes.length).toBe(checkboxesLength);
        for (i = 0; i < checkboxesLength; i++) {
            expect(column.childNodes[i]).toBe(checkboxes[i]);
        }
    };
    
    var createCheckbox = function(id) {
        return Ext.create('Ext.form.field.Checkbox', {
            id: id,
            boxLabel: id
        });
    };
    
    describe("layout initialization", function() {
        it("should distribute items automatically", function() {
            var checkboxGroup = Ext.create("Ext.form.CheckboxGroup", {
                    renderTo: Ext.getBody(),
                    width: 300,
                    height: 300,
                    columns: 'auto',
                    items: [
                        { id: 'cb0', boxLabel: 'cb0'},
                        { id: 'cb1', boxLabel: 'cb1'},
                        { id: 'cb2', boxLabel: 'cb2'},
                        { id: 'cb3', boxLabel: 'cb3'},
                        { id: 'cb4', boxLabel: 'cb4'}
                    ]
                }),
                columns = checkboxGroup.layout.innerCt.down('tr').dom.childNodes;
            
            expect(columns.length).toBe(5);
            expectColumnToContainExactly(columns[0], 'cb0');
            expectColumnToContainExactly(columns[1], 'cb1');
            expectColumnToContainExactly(columns[2], 'cb2');
            expectColumnToContainExactly(columns[3], 'cb3');
            expectColumnToContainExactly(columns[4], 'cb4');

            checkboxGroup.destroy();
        });
        
        it("should distribute items horizontally", function() {
            var checkboxGroup = Ext.create("Ext.form.CheckboxGroup", {
                    renderTo: Ext.getBody(),
                    width: 300,
                    height: 300,
                    columns: 3,
                    items: [
                        { id: 'cb0', boxLabel: 'cb0'},
                        { id: 'cb1', boxLabel: 'cb1'},
                        { id: 'cb2', boxLabel: 'cb2'},
                        { id: 'cb3', boxLabel: 'cb3'},
                        { id: 'cb4', boxLabel: 'cb4'},
                        { id: 'cb5', boxLabel: 'cb5'},
                        { id: 'cb6', boxLabel: 'cb6'},
                        { id: 'cb7', boxLabel: 'cb7'}
                    ]
                }),
                columns = checkboxGroup.layout.innerCt.down('tr').dom.childNodes;

            expect(columns.length).toBe(3);
            expectColumnToContainExactly(columns[0], 'cb0', 'cb3', 'cb6');
            expectColumnToContainExactly(columns[1], 'cb1', 'cb4', 'cb7');
            expectColumnToContainExactly(columns[2], 'cb2', 'cb5');

            checkboxGroup.destroy();
        });
        
        it("should distribute items vertically", function() {
            var checkboxGroup = Ext.create("Ext.form.CheckboxGroup", {
                    renderTo: Ext.getBody(),
                    width: 300,
                    height: 300,
                    columns: 3,
                    vertical: true,
                    items: [
                        { id: 'cb0', boxLabel: 'cb0'},
                        { id: 'cb1', boxLabel: 'cb1'},
                        { id: 'cb2', boxLabel: 'cb2'},
                        { id: 'cb3', boxLabel: 'cb3'},
                        { id: 'cb4', boxLabel: 'cb4'},
                        { id: 'cb5', boxLabel: 'cb5'},
                        { id: 'cb6', boxLabel: 'cb6'},
                        { id: 'cb7', boxLabel: 'cb7'}
                    ]
                }),
                columns = checkboxGroup.layout.innerCt.down('tr').dom.childNodes;

            expect(columns.length).toBe(3);
            expectColumnToContainExactly(columns[0], 'cb0', 'cb1', 'cb2');
            expectColumnToContainExactly(columns[1], 'cb3', 'cb4', 'cb5');
            expectColumnToContainExactly(columns[2], 'cb6', 'cb7');

            checkboxGroup.destroy();
        });
    });
    
    describe('adding items', function() {
        it("should distribute items automatically", function() {
            var checkboxGroup = Ext.create("Ext.form.CheckboxGroup", {
                    renderTo: Ext.getBody(),
                    width: 300,
                    height: 300,
                    columns: 'auto',
                    items: [
                        { id: 'cb0', boxLabel: 'cb0'},
                        { id: 'cb1', boxLabel: 'cb1'}
                    ]
                }),
                columns = checkboxGroup.layout.innerCt.down('tr').dom.childNodes;

            expect(columns.length).toBe(2);
            expectColumnToContainExactly(columns[0], 'cb0');
            expectColumnToContainExactly(columns[1], 'cb1');
            
            checkboxGroup.add(
                createCheckbox('cb2'),
                createCheckbox('cb3')
            );

            expect(columns.length).toBe(4);
            expectColumnToContainExactly(columns[0], 'cb0');
            expectColumnToContainExactly(columns[1], 'cb1');
            expectColumnToContainExactly(columns[2], 'cb2');
            expectColumnToContainExactly(columns[3], 'cb3');

            checkboxGroup.destroy();
        });

        it("should distribute items horizontally", function() {
            var checkboxGroup = Ext.create("Ext.form.CheckboxGroup", {
                    renderTo: Ext.getBody(),
                    width: 300,
                    height: 300,
                    columns: 3,
                    items: [
                        { id: 'cb0', boxLabel: 'cb0'},
                        { id: 'cb1', boxLabel: 'cb1'}
                    ]
                }),
                columns = checkboxGroup.layout.innerCt.down('tr').dom.childNodes;

            expect(columns.length).toBe(3);
            expectColumnToContainExactly(columns[0], 'cb0');
            expectColumnToContainExactly(columns[1], 'cb1');

            checkboxGroup.add(
                createCheckbox('cb2'),
                createCheckbox('cb3'),
                createCheckbox('cb4')
            );

            expect(columns.length).toBe(3);
            expectColumnToContainExactly(columns[0], 'cb0', 'cb3');
            expectColumnToContainExactly(columns[1], 'cb1', 'cb4');
            expectColumnToContainExactly(columns[2], 'cb2');

            checkboxGroup.destroy();
        });

        it("should distribute items vertically", function() {
            var checkboxGroup = Ext.create("Ext.form.CheckboxGroup", {
                    renderTo: Ext.getBody(),
                    width: 300,
                    height: 300,
                    columns: 3,
                    vertical: true,
                    items: [
                        { id: 'cb0', boxLabel: 'cb0'},
                        { id: 'cb1', boxLabel: 'cb1'}
                    ]
                }),
                columns = checkboxGroup.layout.innerCt.down('tr').dom.childNodes;

            expect(columns.length).toBe(3);
            expectColumnToContainExactly(columns[0], 'cb0');
            expectColumnToContainExactly(columns[1], 'cb1');

            checkboxGroup.add(
                createCheckbox('cb2'),
                createCheckbox('cb3'),
                createCheckbox('cb4')
            );

            expect(columns.length).toBe(3);
            expectColumnToContainExactly(columns[0], 'cb0', 'cb1');
            expectColumnToContainExactly(columns[1], 'cb2', 'cb3');
            expectColumnToContainExactly(columns[2], 'cb4');

            checkboxGroup.destroy();
        });
    });

    describe('removing items', function() {
        it("should distribute items automatically", function() {
            var checkboxGroup = Ext.create("Ext.form.CheckboxGroup", {
                    renderTo: Ext.getBody(),
                    width: 300,
                    height: 300,
                    columns: 'auto',
                    items: [
                        { id: 'cb0', boxLabel: 'cb0'},
                        { id: 'cb1', boxLabel: 'cb1'}
                    ]
                }),
                columns = checkboxGroup.layout.innerCt.down('tr').dom.childNodes;

            // ensure removal works with both original and dynamically added items
            checkboxGroup.add(
                createCheckbox('cb2'),
                createCheckbox('cb3')
            );

            checkboxGroup.remove(Ext.getCmp('cb0'));
            checkboxGroup.remove(Ext.getCmp('cb3'));

            expect(columns.length).toBe(2);
            expectColumnToContainExactly(columns[0], 'cb1');
            expectColumnToContainExactly(columns[1], 'cb2');

            checkboxGroup.destroy();
        });

        it("should distribute items horizontally", function() {
            var checkboxGroup = Ext.create("Ext.form.CheckboxGroup", {
                    renderTo: Ext.getBody(),
                    width: 300,
                    height: 300,
                    columns: 3,
                    items: [
                        { id: 'cb0', boxLabel: 'cb0'},
                        { id: 'cb1', boxLabel: 'cb1'}
                    ]
                }),
                columns = checkboxGroup.layout.innerCt.down('tr').dom.childNodes;

            // ensure removal works with both original and dynamically added items
            checkboxGroup.add(
                createCheckbox('cb2'),
                createCheckbox('cb3'),
                createCheckbox('cb4')
            );

            checkboxGroup.remove(Ext.getCmp('cb0'));
            checkboxGroup.remove(Ext.getCmp('cb2'));
            checkboxGroup.remove(Ext.getCmp('cb4'));
            
            expect(columns.length).toBe(3);
            expectColumnToContainExactly(columns[0], 'cb1');
            expectColumnToContainExactly(columns[1], 'cb3');
            expectColumnToContainExactly(columns[2]);

            checkboxGroup.destroy();
        });

        it("should distribute items vertically", function() {
            var checkboxGroup = Ext.create("Ext.form.CheckboxGroup", {
                    renderTo: Ext.getBody(),
                    width: 300,
                    height: 300,
                    columns: 3,
                    vertical: true,
                    items: [
                        { id: 'cb0', boxLabel: 'cb0'},
                        { id: 'cb1', boxLabel: 'cb1'}
                    ]
                }),
                columns = checkboxGroup.layout.innerCt.down('tr').dom.childNodes;

            // ensure removal works with both original and dynamically added items
            checkboxGroup.add(
                createCheckbox('cb2'),
                createCheckbox('cb3'),
                createCheckbox('cb4')
            );

            checkboxGroup.remove(Ext.getCmp('cb0'));
            checkboxGroup.remove(Ext.getCmp('cb2'));
            checkboxGroup.remove(Ext.getCmp('cb4'));

            expect(columns.length).toBe(3);
            expectColumnToContainExactly(columns[0], 'cb1');
            expectColumnToContainExactly(columns[1], 'cb3');
            expectColumnToContainExactly(columns[2]);

            checkboxGroup.destroy();
        });
    });
    
});