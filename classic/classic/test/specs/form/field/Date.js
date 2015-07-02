describe("Ext.form.field.Date", function() {
    var component, makeComponent;
    
    function clickTrigger() {
        var trigger = component.getTrigger('picker').getEl(),
            xy = trigger.getXY();
        jasmine.fireMouseEvent(trigger.dom, 'click', xy[0], xy[1]);
    }
    
    function expectAria(attr, value) {
        jasmine.expectAriaAttr(component, attr, value);
    }

    beforeEach(function() {
        makeComponent = function(config) {
            config = config || {};
            Ext.applyIf(config, {
                name: 'test',
                width: 100
            });
            component = new Ext.form.field.Date(config);
        };
    });
    
    afterEach(function() {
        if (component) {
            component.destroy();
        }
        component = makeComponent = null;
    });

    it("should be registered with xtype 'datefield'", function() {
        component = Ext.create("Ext.form.field.Date", {name: 'test'});
        expect(component instanceof Ext.form.field.Date).toBe(true);
        expect(Ext.getClass(component).xtype).toBe("datefield");
    });

    describe('keynav', function () {
        describe('SPACE', function () {
            it('should set the current date in the textfield', function () {
                // Get today's timestamp and reset the hours, minutes, seconds and milliseconds because datepicker
                // dates don't have time values.
                var today = (new Date()).setHours(0, 0, 0, 0);

                makeComponent({
                    renderTo: Ext.getBody()
                });

                clickTrigger();

                // Fire the key event through the target of the keyNav
                jasmine.fireKeyEvent(component.picker.keyNav.map.target, 'keydown', Ext.event.Event.SPACE);

                var value = component.getValue();
                expect(value).not.toBeNull();
                expect(value.getTime()).toBe(today);
            });
        });

        describe('ESCAPE', function () {
            it('should hide the picker', function () {
                var picker;

                makeComponent({
                    renderTo: Ext.getBody()
                });

                clickTrigger();
                picker = component.picker;

                expect(picker.hidden).toBe(false);

                jasmine.fireKeyEvent(component.inputEl, 'keydown', Ext.event.Event.ESC);

                expect(picker.hidden).toBe(true);
            });
        });
    });

    describe("defaults", function() {
        var valuedConfigs = {
                format : "m/d/Y",
                altFormats : "m/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j",
                disabledDaysText : "Disabled",
                disabledDatesText : "Disabled",
                minText : "The date in this field must be equal to or after {0}",
                maxText : "The date in this field must be equal to or before {0}",
                invalidText : "{0} is not a valid date - it must be in the format {1}",
                triggerCls : 'x-form-date-trigger',
                showToday : true
            },
            undefConfigs = [
                'minValue',
                'maxValue',
                'disabledDays',
                'disabledDates'
            ];

        for (var cfg in valuedConfigs) {
            (function(cfg) {
                it("should have " + cfg + " = " + valuedConfigs[cfg], function() {
                    makeComponent();
                    expect(component[cfg]).toEqual(valuedConfigs[cfg]);
                });
            })(cfg);
        }
        for (var i = undefConfigs.length; i--;) {
            (function(cfg) {
                it("should have " + cfg + " = undefined", function() {
                    makeComponent();
                    expect(component[cfg]).not.toBeDefined();
                });
            })(undefConfigs[i]);
        }
    });

    describe("rendering", function() {
        // Mostly handled by Trigger tests

        beforeEach(function() {
            makeComponent({
                renderTo: Ext.getBody()
            });
        });

        it("should give the trigger a class of 'x-form-date-trigger'", function() {
            expect(component.getTrigger('picker').el).toHaveCls('x-form-date-trigger');
        });
        
        it("should have combobox role", function() {
            expectAria('role', 'combobox');
        });
        
        it("should have title", function() {
            expectAria('title', 'Expected date format: m/d/Y');
        });
    });

    describe("value initialization", function() {
        describe("without a value", function() {
            it("should have value = null by default", function() {
                makeComponent();
                expect(component.value).toBeNull();
            });

            it("should return null when calling getValue()", function() {
                makeComponent();
                expect(component.value).toBeNull();
            });
        });
    });

    describe("setting values", function(){
        describe("parsing", function(){
            it("should parse a value according to the format 1", function(){
                makeComponent({
                    format: 'Y/m/d',
                    value: '2008/05/06'
                });
                
                expect(component.getValue()).toEqual(new Date(2008, 4, 6));
            });
            
            it("should parse a value according to the format 2", function(){
                makeComponent({
                    format: 'd/m/Y',
                    value: '03/03/1986'
                });
                
                expect(component.getValue()).toEqual(new Date(1986, 2, 3));
            });
        });
        
        describe("setValue", function(){
            it("should accept a date object", function(){
                makeComponent();
                component.setValue(new Date(2010, 10, 5)); //5th nov 2010
                expect(component.getValue()).toEqual(new Date(2010, 10, 5));
            });
            
            it("should accept a string value", function(){
                makeComponent({
                    format: 'Y/m/d'
                });    
                component.setValue('2006/01/01');
                expect(component.getValue()).toEqual(new Date(2006, 0, 1));
            });
            
            it("should accept a null value", function(){
                makeComponent();
                component.setValue(null);
                expect(component.getValue()).toBeNull();    
            });
            
            it("should set null if an invalid date string is passed", function(){
                makeComponent({
                    format: 'Y/m/d'
                });
                component.setValue('03.03.2000');
                expect(component.getValue()).toBeNull();    
            });
            
        });
    });

    describe("trigger click", function() {
        beforeEach(function() {
            makeComponent({
                renderTo: Ext.getBody(),
                value: '01/11/2011'
            });
        });

        it("should create a Ext.picker.Date object as the 'picker' property", function() {
            clickTrigger();
            expect(component.picker).toBeDefined();
            expect(component.picker instanceof Ext.picker.Date).toBe(true);
        });
        it("should set the date picker's value to the current field value", function() {
            clickTrigger();
            expect(component.picker.value.getFullYear()).toEqual(2011);
            expect(component.picker.value.getMonth()).toEqual(0);
            expect(component.picker.value.getDate()).toEqual(11);
        });
        it("should show the picker", function() {
            clickTrigger();
            expect(component.picker.hidden).toBe(false);
        });
    });

    describe("DateField inside a floating component", function() {
        var window;

        beforeEach(function() {
            makeComponent({
                value: '01/11/2011',
                anchor: '100%'
            });
            window = new Ext.window.Window({
                height: 100,
                width: 200,
                title: 'DateField test',
                layout: 'anchor',
                items: component,
                autoShow: true
            });
        });
        afterEach(function() {
            window.destroy();
        });

        it("should not constrain the picker inside the window", function() {
            clickTrigger();
            expect(component.picker.getY()).toEqual(component.getY() + component.getHeight());
        });
    });

    describe("safeParse method", function() {
        beforeEach(function() {
            makeComponent();
        });

        it("should parse a value matching the format", function() {
            var date = component.safeParse('02/04/1978', 'm/d/Y');
            expect(date.getFullYear()).toEqual(1978);
            expect(date.getMonth()).toEqual(1);
            expect(date.getDate()).toEqual(4);
        });

        it("should use the time in the value if the format contains a time", function() {
            var date = component.safeParse('02/04/1978 13:14', 'm/d/Y H:i');
            expect(date.getHours()).toEqual(13);
            expect(date.getMinutes()).toEqual(14);
        });

        it("should use 12:00am as the time if the value has no time", function() {
            var date = component.safeParse('02/04/1978', 'm/d/Y');
            expect(date.getHours()).toEqual(0);
        });

        it("should return null if the value cannot be parsed", function() {
            var date = component.safeParse('foo/bar', 'm/d/Y');
            expect(date).toBeNull();
        });
    });
    
    describe("submit value", function(){
        it("should use the format as the default", function(){
            makeComponent({
                value: new Date(2010, 0, 15)
            });
            expect(component.getSubmitValue()).toBe('01/15/2010');
        });
        
        it("should give precedence to submitFormat", function(){
            makeComponent({
                value: new Date(2010, 0, 15),
                submitFormat: 'Y-m-d'
            });
            expect(component.getSubmitValue()).toBe('2010-01-15');
        });
        
        it("should return null if the value isn't a valid date", function(){
            makeComponent({
                value: 'wontparse',
                submitFormat: 'Y-m-d'
            });
            expect(component.getSubmitValue()).toBe('');
        });
    });
    
    describe("getModelData", function(){
        it("should use the format as the default", function(){
            makeComponent({
                name: 'myname',
                value: new Date(2010, 0, 15)
            });
            var modelData = component.getModelData();
            expect(modelData.myname).toBeTruthy();
            expect(modelData.myname.getFullYear()).toEqual(2010);
            expect(modelData.myname.getMonth()).toEqual(0);
            expect(modelData.myname.getDate()).toEqual(15);
        });

        it("should return null if the value isn't a valid date", function(){
            makeComponent({
                name: 'myname',
                value: 'wontparse',
                submitFormat: 'Y-m-d'
            });
            expect(component.getModelData()).toEqual({myname: null});
        });
    });

    describe("errors", function(){
        describe("allowBlank", function(){
            it("should have no errors with allowBlank true", function(){
                makeComponent({
                    allowBlank: true
                });    
                expect(component.getErrors()).toEqual([]);
            });
            
            it("should have an error with allowBlank false and no value", function(){
                makeComponent({
                    allowBlank: false
                });    
                expect(component.getErrors()).toContain(component.blankText);
            });
        });
        
        describe("invalid dates", function(){
            it("should have no error if the date is valid according to the format", function(){
                makeComponent({
                    format: 'Y/m/d',
                    value: '2000/01/01'
                });
                expect(component.getErrors()).toEqual([]);
            });  
            
            it("should have an error if the date is not in a required format", function(){
                makeComponent({
                    format: 'Y/m/d',
                    renderTo: Ext.getBody()
                });
                var val = '2004.05.01',
                    errStr = Ext.String.format(component.invalidText, val, component.format);
                    
                component.inputEl.dom.value = val;
                expect(component.getErrors()).toContain(errStr);
            }); 
        });
        
        describe("minValue", function(){
            it("should have no errors if a min value is not specified", function(){
                makeComponent({
                    value: new Date(1500, 0, 1) // way in the past
                });    
                expect(component.getErrors()).toEqual([]);
            });  
            
            it("should have no errors if the value is greater than the minimum", function(){
                makeComponent({
                    format: 'Y/m/d',
                    value: '2006/07/22',
                    minValue: '2004/07/09'
                });    
                expect(component.getErrors()).toEqual([]);
            }); 
            
            it("should have an error if the value is less than the minimum", function(){
                var val = '2006/07/09',
                    errStr;
                     
                makeComponent({
                    format: 'Y/m/d',
                    value: '2004/07/22',
                    minValue: val
                });    
                errStr = Ext.String.format(component.minText, val);
                expect(component.getErrors()).toContain(errStr);
            }); 
            
            it("should respond to setMinValue", function(){
                var val = '2009/07/09',
                    errStr;
                     
                makeComponent({
                    format: 'Y/m/d',
                    value: '2008/07/22',
                    minValue: '2006/07/09'
                });    
                errStr = Ext.String.format(component.minText, val);
                expect(component.getErrors()).toEqual([]);
                
                component.setMinValue(val);
                expect(component.getErrors()).toContain(errStr);
            });
            
            it("should not throw an error when the value is equal to the min value", function(){
                makeComponent({
                    format: 'Y/m/d',
                    value: '2008/05/01',
                    minValue: '2008/05/01'
                }); 
                expect(component.getErrors()).toEqual([]);
            });
        });
        
        describe("maxValue", function(){
            it("should have no errors if a max value is not specified", function(){
                makeComponent({
                    value: new Date(3000, 0, 1) // way in the future
                });    
                expect(component.getErrors()).toEqual([]);
            });
            
            it("should have no errors if the value is less than the maximum", function(){
                makeComponent({
                    format: 'Y/m/d',
                    value: '2006/07/22',
                    maxValue: '2008/07/09'
                });    
                expect(component.getErrors()).toEqual([]);
            }); 
            
            it("should have an error if the value is bigger than the maximum", function(){
                var val = '2006/07/09',
                    errStr;
                     
                makeComponent({
                    format: 'Y/m/d',
                    value: '2008/07/22',
                    maxValue: val
                });    
                errStr = Ext.String.format(component.maxText, val);
                expect(component.getErrors()).toContain(errStr);
            }); 
            
            it("should respond to setMaxValue", function(){
                var val = '2008/05/09',
                    errStr;
                     
                makeComponent({
                    format: 'Y/m/d',
                    value: '2008/07/22',
                    maxValue: '2009/07/09'
                });    
                errStr = Ext.String.format(component.maxText, val);
                expect(component.getErrors()).toEqual([]);
                
                component.setMaxValue(val);
                expect(component.getErrors()).toContain(errStr);
            });
            
            it("should not throw an error when the value is equal to the max value", function(){
                makeComponent({
                    format: 'Y/m/d',
                    value: '2008/05/01',
                    maxValue: '2008/05/01'
                }); 
                expect(component.getErrors()).toEqual([]);
            });
        });
        
        describe("disabledDays", function(){
            it("should throw no error if disabledDays is not defined", function(){
                makeComponent({
                    format: 'Y/m/d',
                    value: '2008/06/06'
                });
            
                expect(component.getErrors()).toEqual([]);    
            });
            
            it("should not throw an error if the date doesn't match the disabled days", function(){
                makeComponent({
                    format: 'Y/m/d',
                    value: '2010/11/05', //Friday
                    disabledDays: [0, 6] //Sun, Sat
                });
                expect(component.getErrors()).toEqual([]);     
            });
            
            it("should throw an error if the date does match the disabled days", function(){
                makeComponent({
                    format: 'Y/m/d',
                    value: '2010/11/05', //Friday
                    disabledDays: [1, 5] //Mon, Fri
                });
                expect(component.getErrors()).toContain(component.disabledDaysText);     
            });

            describe("setDisabledDays method", function() {
                it("should set the disabledDays property", function() {
                    makeComponent();
                    component.setDisabledDays([2, 6]);
                    expect(component.disabledDays).toEqual([2, 6]);
                });

                it("should call the date picker's setDisabledDays method", function() {
                    makeComponent({
                        renderTo: Ext.getBody()
                    });
                    clickTrigger(); //inits the picker
                    var spy = spyOn(component.picker, 'setDisabledDays');
                    component.setDisabledDays([3, 6]);
                    expect(component.picker.setDisabledDays).toHaveBeenCalledWith([3, 6]);
                });
            });
        });
        
        describe("disabledDates", function(){
            it("should not throw an error if there's no regex", function(){
                makeComponent({
                    format: 'Y/m/d',
                    value: new Date()
                });    
                expect(component.getErrors()).toEqual([]);
            }); 
            
            it("should not throw an error if the value does not match the regex", function(){
                makeComponent({
                    format: 'Y/m/d',
                    value: '2006/04/17',
                    disabledDates: ['2006/04/2']
                });
                expect(component.getErrors()).toEqual([]);
            });
            
            it("should throw an error if the value matches the regex", function(){
                makeComponent({
                    format: 'Y/m/d',
                    value: '2006/04/17',
                    disabledDates: ['2006/04/1']
                });
                expect(component.getErrors()).toContain(component.disabledDatesText);
            });

            describe("setDisabledDates method", function() {
                it("should set the disabledDates property", function() {
                    makeComponent({
                        format: 'Y/m/d'
                    });
                    component.setDisabledDates(['1978/02/04']);
                    expect(component.disabledDates).toEqual(['1978/02/04']);
                });

                it("should set the disabledDatesRE property", function() {
                    makeComponent();
                    component.setDisabledDates(['1978/02/04']);
                    expect(component.disabledDatesRE + '').toEqual(new RegExp("(?:1978/02/04)") + ''); //comparing regexp objects is tricky across browsers
                });

                it("should call the date picker's setDisabledDates method", function() {
                    makeComponent({
                        renderTo: Ext.getBody()
                    });
                    clickTrigger(); //inits the picker
                    var spy = spyOn(component.picker, 'setDisabledDates');
                    component.setDisabledDates(['1978/02/04']);
                    expect(component.picker.setDisabledDates).toHaveBeenCalledWith(component.disabledDatesRE);
                });
            });
        });
    });
    
    describe("blur", function() {
        var webkitIt = Ext.isWebKit ? it : xit;
        webkitIt("should call rawToValue inside blur", function() {
            makeComponent({
                renderTo: Ext.getBody(),
                format: 'Y-m-d',
                rawToValue: function(rawValue) {
                    var date = this.parseDate(rawValue) || rawValue || null;
                    return (Ext.isDate(date) ? Ext.Date.add(date, Ext.Date.DAY, 1) : date);
                },
                valueToRaw: function(value) {
                    var date = this.parseDate(value);
                    return (Ext.isDate(date) ? this.formatDate(Ext.Date.add(date, Ext.Date.DAY, -1)) : '');
                }
            });
            component.setValue('2010-04-15');
            component.focus();
            component.blur();
            var d = Ext.Date.format(component.getValue(), 'Y-m-d');
            expect(d).toBe('2010-04-15');
        });

        webkitIt("should not blank the textfield for an invalid date", function() {
            makeComponent({
                renderTo: Ext.getBody(),
                format: 'Y-m-d'
            });
            component.inputEl.dom.value = 'foo';
            component.focus();
            component.blur();
            expect(component.inputEl.getValue()).toBe('foo');
        });
    });
});


