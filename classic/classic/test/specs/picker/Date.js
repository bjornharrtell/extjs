// date picker has 42 cells

describe("Ext.picker.Date", function() {
    var component, makeComponent, makeRange;
    
    beforeEach(function() {
        makeComponent = function(config) {
            component = new Ext.picker.Date(Ext.applyIf({
                renderTo: Ext.getBody()
            }, config));
        };
        
        makeRange = function(min, max){
            var out = [],
                i = min;
            for(; i <= max; ++i) {
                out.push(i);
            }
            return out;
        };
    });
    
    afterEach(function() {
        if (component) {
            component.destroy();
        }
        component = makeComponent = makeRange = null;
    });
    
    describe("rendering", function(){
        it("should respect the showToday config", function(){
            makeComponent({
                showToday: false
            });
            
            expect(component.footerEl).toBeFalsy();
        });

        it("should respect the padding config", function() {
            makeComponent({
                padding: 10
            });
            expect(component.getWidth()).toBe(197);
        });

        it("should be able to be configured as disabled", function() {
            expect(function() {
                makeComponent({
                    disabled: true
                });
            }).not.toThrow();
        });
    });
    
    describe("restrictions", function(){
        
        var isDisabled;
        
        beforeEach(function(){
            isDisabled = function(range, title){
                var i = 0,
                    cells = component.cells.elements,
                    len = range.length,
                    cell, cellTitle,
                    checkTitle = title !== null;
                    
                for(; i < len; ++i) {
                    cell = cells[range[i]];
                    cellTitle = cell.getAttribute('data-qtip');
                    if (cell.className.indexOf(component.disabledCellCls) === -1 || (checkTitle && cellTitle !== title)) {
                        return false;
                    }
                }
                return true;
            };
        });
        
        afterEach(function(){
            isDisabled = null;
        });
        
        describe("max date", function(){
            it("should not have any max date set if not specified", function(){
                makeComponent({
                    value: new Date(2010, 10, 4) // 4th Nov 2010
                });
                
                // go way into the future
                for(var i = 0; i < 10; ++i) {
                    component.showNextYear();
                }
                
                expect(component.el.select('td[title="' + component.maxText + '"]').getCount()).toEqual(0);
                
            });
            
            it("should set the class and title on elements over the max date 1", function(){
                makeComponent({
                    value: new Date(2010, 10, 4), // 4th Nov 2010
                    maxDate: new Date(2010, 10, 18) //18th Nov, 2010
                });
                    
                expect(isDisabled(makeRange(19, 41), component.maxText)).toBeTruthy();
            });
            
            it("should set the class and title on elements over the max date 2", function(){
                makeComponent({
                    value: new Date(2007, 4, 3), // 3rd May 2017
                    maxDate: new Date(2007, 4, 7) // 7th May 2007
                });
                
                expect(isDisabled(makeRange(9, 41), component.maxText)).toBeTruthy();
            });
            
            it("should not set the class/title if the max date isn't on the current page", function(){
                makeComponent({
                    value: new Date(2007, 4, 3), // 3rd May 2007
                    maxDate: new Date(2010, 4, 7) // 7th May 2010
                });
                
                var cells = component.cells,
                    len = cells.getCount(),
                    i = 0;
                    
                for(; i < len; ++i) {
                    expect(cells.item(i).dom.title).toNotEqual(component.maxText);
                    expect(cells.item(i).dom.className).toNotEqual(component.disabledCellCls);
                }
            });
            
            it("should update the class/title if required when changing the active 'page'", function(){
                makeComponent({
                    value: new Date(2007, 4, 3), // 3rd May 2007
                    maxDate: new Date(2007, 5, 15) // 15th Jun 2007
                });
                
                component.showNextMonth();
                expect(isDisabled(makeRange(20, 41), component.maxText)).toBeTruthy();
            });
        });  
        
        
        
        describe("min date", function(){
            it("should not have any min date set if not specified", function(){
                makeComponent({
                    value: new Date(2010, 10, 4) // 4th Nov 2010
                });
                
                // go way into the future
                for(var i = 0; i < 10; ++i) {
                    component.showPrevYear();
                }
                
                expect(component.el.select('td[title="' + component.minText + '"]').getCount()).toEqual(0);
                
            });
            
            it("should set the class and title on elements under the min date 1", function(){
                makeComponent({
                    value: new Date(2010, 8, 18), // 18th Sep 2010
                    minDate: new Date(2010, 8, 4) //4th Sep, 2010
                });
                
                expect(isDisabled(makeRange(0, 5), component.minText)).toBeTruthy();
            });
            
            it("should set the class and title on elements over the min date 2", function(){
                makeComponent({
                    value: new Date(2006, 2, 3), // 3rd Mar 2006
                    minDate: new Date(2006, 2, 7) // 7th Mar 2006
                });
                
                expect(isDisabled(makeRange(0, 8), component.minText)).toBeTruthy();
            });
            
            it("should not set the class/title if the min date isn't on the current page", function(){
                makeComponent({
                    minDate: new Date(2007, 2, 3), // 3rd Mar 2007
                    value: new Date(2010, 2, 7) // 7th Mar 2010
                });
                
                var cells = component.cells,
                    len = cells.getCount(),
                    i = 0;
                    
                for(; i < len; ++i) {
                    expect(cells.item(i).dom.title).toNotEqual(component.minText);
                    expect(cells.item(i).dom.className).toNotEqual(component.disabledCellCls);
                }
            });
            
            it("should update the class/title if required when changing the active 'page'", function(){
                makeComponent({
                    minDate: new Date(2007, 4, 3), // 3rd May 2017
                    value: new Date(2007, 5, 15) // 15th Jun 2007
                });
                
                component.showPrevMonth();
                expect(isDisabled(makeRange(0, 3), component.minText)).toBeTruthy();
            });
        });
        
        describe("disabledDays", function(){
            it("should not disabled anything if there any no disabledDays", function(){
                makeComponent();
                expect(component.el.select('.' + component.disabledCellCls).getCount()).toEqual(0);
            });
            
            it("should disable the appropriate days 1", function(){
                makeComponent({
                    value: new Date(2010, 10, 4),
                    disabledDays: [0, 6] // sat, sun
                });    
                
                expect(isDisabled([0, 6, 7, 13, 14, 20, 21, 27, 28, 34, 35], component.disabledDaysText)).toBeTruthy();
            });
            
            it("should disable the appropriate days 2", function(){
                makeComponent({
                    value: new Date(2010, 10, 4),
                    disabledDays: [1, 5] // mon, fri
                });    
                
                expect(isDisabled([1, 5, 8, 12, 15, 19, 22, 26, 29, 33, 36, 40], component.disabledDaysText)).toBeTruthy();
            });
        });
        
        describe("disabledDates", function(){
            it("should disabled specific dates", function(){
                makeComponent({
                    value: new Date(2010, 10, 4),
                    format: 'Y/m/d',
                    disabledDates: ['2010/11/07', '2010/11/14']
                });    
                
                expect(isDisabled([7, 14], null)).toBeTruthy();
            });
            
            it("should disabled specific dates according to regex - year", function(){
                
                var date = new Date(2010, 10, 4),
                    range = makeRange(0, 41);
                
                makeComponent({
                    value: date,
                    format: 'Y/m/d',
                    disabledDates: ['2010/*']
                });  
                
                while (date.getFullYear() === 2010) {
                    if (date.getMonth() > 0) {
                        expect(isDisabled(range, null)).toBeTruthy();
                    } else {
                        expect(isDisabled(makeRange(5, 41), null)).toBeTruthy();
                    }
                    date = Ext.Date.add(date, Ext.Date.MONTH, -1);
                    component.showPrevMonth();
                }  
            });
            
            it("should disabled specific dates according to regex - month", function(){
                
                makeComponent({
                    value: new Date(2010, 10, 4),
                    format: 'Y/m/d',
                    disabledDates: ['2010/11/*']
                });  
                
                expect(isDisabled(makeRange(1, 30), null)).toBeTruthy();
                component.showPrevMonth();
                expect(isDisabled(makeRange(0, 35), null)).toBeFalsy();
            });
            
            it("should disabled specific dates according to regex - day", function(){
                
                makeComponent({
                    value: new Date(2010, 10, 4),
                    format: 'Y/m/d',
                    disabledDates: ['2010/11/1*']
                });  
                
                expect(isDisabled(makeRange(14, 23), null)).toBeTruthy();
            });
        });
        
    });
    
    describe('showing month picker', function() {
        var df, picker;
        
        beforeEach(function() {
            df = new Ext.form.field.Date({
                renderTo: Ext.getBody(),
                disableAnim: true
            });
            
            df.focus();
            
            jasmine.waitForFocus(df);
        });
        
        afterEach(function() {
            df.destroy();
            df = picker = null;
        });
        
        it('should show the month picker on click of the button', function() {
            runs(function() {
                df.expand();
                picker = df.getPicker();
                
                jasmine.fireMouseEvent(picker.monthBtn.el, 'click');
            });

            waitsFor(function() {
                return !!picker.monthPicker.isVisible();
            }, 'for month picker to show', 1000);

            // https://sencha.jira.com/browse/EXTJS-15968
            // MonthPicker AND DatePicker hid slightly after completing show animation
            waits(100);
            
            runs(function() {
                expect(picker.isVisible()).toBe(true);
                expect(picker.monthPicker.isVisible()).toBe(true);
            });
        });
    });
});
