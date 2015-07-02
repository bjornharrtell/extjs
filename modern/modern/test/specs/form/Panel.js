describe('Ext.form.Panel', function() {
    var field, panel,
        create = function(config) {
            panel = Ext.create('Ext.form.Panel', config || {});
        };

    afterEach(function() {
        if (panel) {
            panel.destroy();
        }
    });

    describe("setDisabled", function() {
        var field;

        beforeEach(function() {
            field = Ext.create('Ext.field.Text', {
                name: 'test'
            });

            create({
                items: [field]
            });
        });

        it("should disable all fields", function() {
            expect(panel.getDisabled()).toBeFalsy();
            expect(field.getDisabled()).toBeFalsy();

            panel.setDisabled(true);

            expect(panel.getDisabled()).toBeTruthy();
            expect(field.getDisabled()).toBeTruthy();
        });
    });

    describe("getValues", function() {
        it("should return values for one field", function() {
            create({
                items: [
                    {
                        xtype: 'textfield',
                        name: 'one',
                        value: 'test1'
                    }
                ]
            });

            expect(panel.getValues()).toEqual({
                one: 'test1'
            });
        });

        it("should return values for two fields", function() {
            create({
                items: [
                    {
                        xtype: 'textfield',
                        name: 'one',
                        value: 'test1'
                    },
                    {
                        xtype: 'textfield',
                        name: 'two',
                        value: 'test2'
                    }
                ]
            });

            expect(panel.getValues()).toEqual({
                one: 'test1',
                two: 'test2'
            });
        });

        it("should return values for fields with a name with brackets", function() {
            create({
                items: [
                    {
                        xtype: 'textfield',
                        name: 'one[]',
                        value: 'test1'
                    },
                    {
                        xtype: 'textfield',
                        name: 'one[]',
                        value: 'test2'
                    }
                ]
            });

            expect(panel.getValues()).toEqual({
                'one[]': ['test1', 'test2']
            });
        });

        it("should return values for two fields with the same name", function() {
            create({
                items: [
                    {
                        xtype: 'textfield',
                        name: 'one',
                        value: 'test1'
                    },
                    {
                        xtype: 'textfield',
                        name: 'one',
                        value: 'test2'
                    }
                ]
            });

            expect(panel.getValues()).toEqual({
                one: ['test1', 'test2']
            });
        });

        it("should return values for checkbox fields", function() {
            create({
                items: [
                    {
                        xtype: 'checkboxfield',
                        name: 'one',
                        checked: true
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'two'
                    }
                ]
            });

            expect(panel.getValues()).toEqual({
                one: true,
                two: null
            });
        });

        it("should return values for checkbox fields with the same name", function() {
            create({
                items: [
                    {
                        xtype: 'checkboxfield',
                        name: 'one',
                        value: 'blue',
                        checked: true
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'one',
                        value: 'red',
                        checked: true
                    }
                ]
            });

            expect(panel.getValues()).toEqual({
                one: ['blue', 'red']
            });
        });

        it("should return values for radio fields fields", function() {
            create({
                items: [
                    {
                        xtype: 'radiofield',
                        name: 'color',
                        value: 'red'
                    },
                    {
                        xtype: 'radiofield',
                        name: 'color',
                        checked: true,
                        value: 'green'
                    },
                    {
                        xtype: 'radiofield',
                        name: 'color',
                        value: 'blue'
                    }
                ]
            });

            expect(panel.getValues()).toEqual({
                color: 'green'
            });
        });

        it("should return values for radio fields fields", function() {
            create({
                items: [
                    {
                        xtype: 'radiofield',
                        name: 'color',
                        value: 1
                    },
                    {
                        xtype: 'radiofield',
                        name: 'color',
                        checked: true,
                        value: 0
                    }
                ]
            });

            expect(panel.getValues()).toEqual({
                color: 0
            });
        });

        it("should return values for radio fields fields", function() {
            create({
                items: [
                    {
                        xtype: 'radiofield',
                        name: 'color',
                        value: 1,
                        checked: true
                    },
                    {
                        xtype: 'radiofield',
                        name: 'color',
                        value: 0
                    }
                ]
            });

            expect(panel.getValues()).toEqual({
                color: 1
            });
        });

        describe("enabled argument", function() {
            it("it should not return disabled fields", function() {
                create({
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'one',
                            disabled: true,
                            value: 'test1'
                        },
                        {
                            xtype: 'textfield',
                            name: 'two',
                            value: 'test2'
                        }
                    ]
                });

                expect(panel.getValues(true)).toEqual({
                    two: 'test2'
                });
            });

            it("it should not return disabled fields", function() {
                create({
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'one',
                            disabled: true,
                            value: 'test1'
                        },
                        {
                            xtype: 'textfield',
                            name: 'two',
                            value: 'test2'
                        },
                        {
                            xtype: 'textfield',
                            name: 'three',
                            value: 'test3'
                        }
                    ]
                });

                expect(panel.getValues(true)).toEqual({
                    two: 'test2',
                    three: 'test3'
                });
            });
        });
    });

    describe("setValues", function() {
        it("should set the values for one field", function() {
            create({
                items: [
                    {
                        xtype: 'textfield',
                        name: 'one'
                    }
                ]
            });

            panel.setValues({
                one: 'test1'
            });

            expect(panel.getValues()).toEqual({
                one: 'test1'
            });
        });

        it("should set the values for multiple fields", function() {
            create({
                items: [
                    {
                        xtype: 'textfield',
                        name: 'one'
                    },
                    {
                        xtype: 'textfield',
                        name: 'two'
                    }
                ]
            });

            panel.setValues({
                one: 'test1',
                two: 'test2'
            })

            expect(panel.getValues()).toEqual({
                one: 'test1',
                two: 'test2'
            });
        });

        it("should set values for fields with a name with brackets", function() {
            create({
                items: [
                    {
                        xtype: 'textfield',
                        name: 'one[]'
                    },
                    {
                        xtype: 'textfield',
                        name: 'one[]'
                    }
                ]
            });

            panel.setValues({
                'one[]': ['test1', 'test2']
            });

            expect(panel.getValues()).toEqual({
                'one[]': ['test1', 'test2']
            });
        });

        it("should set values for fields with a name with brackets (with empty value)", function() {
            create({
                items: [
                    {
                        xtype: 'textfield',
                        name: 'one[]'
                    },
                    {
                        xtype: 'textfield',
                        name: 'one[]'
                    }
                ]
            });

            panel.setValues({
                'one[]': ['test1']
            });

            expect(panel.getValues()).toEqual({
                'one[]': ['test1', '']
            });
        });

        it("should set values for one checkbox field", function() {
            create({
                items: [
                    {
                        xtype: 'checkboxfield',
                        name: 'one'
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'two'
                    }
                ]
            });

            panel.setValues({
                one: true
            });

            expect(panel.getValues()).toEqual({
                one: true,
                two: null
            });
        });

        it("should set values for one checkbox field", function() {
            create({
                items: [
                    {
                        xtype: 'checkboxfield',
                        name: 'one'
                    }
                ]
            });

            panel.setValues({
                one: true
            });

            expect(panel.getValues()).toEqual({
                one: true
            });
        });

        it("should set values for one checkbox field", function() {
            create({
                items: [
                    {
                        xtype: 'checkboxfield',
                        name: 'one',
                        checked: true
                    }
                ]
            });

            expect(panel.getValues()).toEqual({
                one: true
            });

            panel.setValues({
                one: false
            });

            expect(panel.getValues()).toEqual({
                one: null
            });
        });

        it("should set values for checkbox fields with the same name", function() {
            create({
                items: [
                    {
                        xtype: 'checkboxfield',
                        name: 'one',
                        value: 'blue',
                        checked: true
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'one',
                        value: 'red',
                        checked: true
                    }
                ]
            });

            panel.setValues({
                one: ['blue', 'red']
            });

            expect(panel.getValues()).toEqual({
                one: ['blue', 'red']
            });
        });
    });
});
