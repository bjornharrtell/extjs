describe("Ext.form.field.Radio", function() {
    var radios;
    beforeEach(function() {
        radios = [];
    });
    
    afterEach(function(){
            var i = 0,
                len = radios.length;
                
            for (; i < len; ++i) {
                radios[i].destroy();
            }
    });

    it("should be registered with the 'radiofield' xtype", function() {
        var component = Ext.create("Ext.form.field.Radio", {name: 'test'});
        expect(component instanceof Ext.form.field.Radio).toBe(true);
        expect(Ext.getClass(component).xtype).toBe("radiofield");
        radios = [component];
    });

    // https://sencha.jira.com/browse/EXTJS-18309
    xit("should render a button input with type='radio'", function(){
        var component = new Ext.form.field.Radio({
            name: 'test',
            renderTo: Ext.getBody()
        });
        expect(component.inputEl.dom.type.toLowerCase()).toEqual("radio");
        radios = [component];
    });

    it("should respect the checked value", function(){
        var component = new Ext.form.field.Radio({
            checked: true,
            name: 'test',
            renderTo: Ext.getBody()
        });
        
        expect(component.getValue()).toBeTruthy();
        component.destroy();
        component = new Ext.form.field.Radio({
            name: 'test',
            renderTo: Ext.getBody()
        });
        expect(component.getValue()).toBeFalsy();
        radios = [component];
    });
    
    it("should get the correct group value", function(){
        var i = 0;
            
        for(i = 0; i < 5; ++i){
            radios.push(new Ext.form.field.Radio({
                renderTo: Ext.getBody(),
                name: 'test',
                inputValue: i + 1,
                checked: i + 1 == 3
            }));
        }
        
        expect(radios[0].getGroupValue()).toEqual(3);
    });

    describe("setValue", function() {
        it("should unset the values when checking in a group", function(){
            var i = 0;

            for(i = 0; i < 3; ++i){
                radios.push(new Ext.form.field.Radio({
                    renderTo: Ext.getBody(),
                    name: 'test',
                    inputValue: i + 1
                }));
            }

            expect(radios[0].getGroupValue()).toBeNull();

            radios[1].setValue(true);
            expect(radios[0].getValue()).toBeFalsy();
            expect(radios[1].getValue()).toBeTruthy();
            expect(radios[2].getValue()).toBeFalsy();

            radios[2].setValue(true);
            expect(radios[0].getValue()).toBeFalsy();
            expect(radios[1].getValue()).toBeFalsy();
            expect(radios[2].getValue()).toBeTruthy();
        });

        it("should check the sibling radio matching a passed string value", function(){
            var i = 0;

            for(i = 0; i < 3; ++i){
                radios.push(new Ext.form.field.Radio({
                    renderTo: Ext.getBody(),
                    name: 'test',
                    inputValue: i + 1
                }));
            }

            radios[0].setValue(2);
            expect(radios[0].getValue()).toBeFalsy();
            expect(radios[1].getValue()).toBeTruthy();
            expect(radios[2].getValue()).toBeFalsy();

            radios[0].setValue(3);
            expect(radios[0].getValue()).toBeFalsy();
            expect(radios[1].getValue()).toBeFalsy();
            expect(radios[2].getValue()).toBeTruthy();
        });

        it("should call handlers for all items in a group", function(){
            var handlers = [],
                spies = [],
                i = 0;

            for(i = 0; i < 3; ++i){
                handlers.push({
                    fn: function(){}
                });
                spies.push(spyOn(handlers[i], 'fn'));
                radios.push(new Ext.form.field.Radio({
                    renderTo: Ext.getBody(),
                    name: 'test',
                    inputValue: i + 1,
                    handler: handlers[i].fn
                }));
            }

            radios[1].setValue(true);
            expect(handlers[1].fn).toHaveBeenCalledWith(radios[1], true);

            radios[0].setValue(true);
            expect(handlers[0].fn).toHaveBeenCalledWith(radios[0], true);
            expect(handlers[1].fn).toHaveBeenCalledWith(radios[1], false);
        });
    });
    
});
