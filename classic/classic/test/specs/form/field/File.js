describe("Ext.form.field.File", function(){
    var field, makeField;
    
    beforeEach(function(){
        makeField = function(cfg){
            cfg = cfg || {};
            field = new Ext.form.field.File(cfg);
        };
    });
    
    afterEach(function(){
        Ext.destroy(field);
        field = makeField = null;
    });
    
    describe("defaults", function(){
        beforeEach(function(){
            makeField();
        });
        
        it("should default to readOnly", function(){
            expect(field.readOnly).toBe(true);
        }) ;   
        
        it("should default to have a button", function(){
            expect(field.buttonOnly).toBe(false);
        });
        
        it("should tell us it's an upload field", function(){
            expect(field.isFileUpload()).toBe(true);    
        });
    });
    
    it("should respect the buttonText config", function(){
        makeField({
            renderTo: Ext.getBody(),
            buttonText: 'Foo'
        });    
        expect(field.button.text).toBe('Foo');
    });

    it("should respect the buttonConfig config", function(){
            makeField({
                renderTo: Ext.getBody(),
                buttonConfig : {
                    text    : 'FooBar',
                    iconCls : 'download'
                },
                buttonText: 'Foo'
            });
            expect(field.button.text).toBe('FooBar');
        });
    
    it("should respect the buttonOnly config", function(){
        makeField({
            renderTo: Ext.getBody(),
            buttonOnly: true
        });    
        expect(field.inputWrap.getStyle('display')).toBe('none');
    });
    
    it("should be be able to be configured as disabled", function(){
        makeField({
            renderTo: Ext.getBody(),
            disabled: true
        });
        expect(field.inputEl.dom.disabled).toBe(true);
    });
    
    it("should be able to produce a fake input when not rendered", function(){
        makeField({
            name: 'foo'
        });
        var input = field.extractFileInput();
        expect(input.name).toBe('foo');
        expect(input.type).toBe('file');
    });
    
    describe("focus/blur", function() {
        var focusSpy, blurSpy, btn;
        
        beforeEach(function() {
            focusSpy = jasmine.createSpy('focus');
            blurSpy  = jasmine.createSpy('blur');
            
            makeField({
                renderTo: Ext.getBody(),
                listeners: {
                    focus: focusSpy,
                    blur: blurSpy
                }
            });
            
            btn = new Ext.button.Button({
                renderTo: Ext.getBody(),
                text: 'after'
            });
        });
        
        afterEach(function() {
            Ext.destroy(btn);
            
            btn = focusSpy = blurSpy = null;
        });
        
        it("should fire focus event on field when button is focused", function() {
            jasmine.focusAndWait(field.button);
            
            waitForSpy(focusSpy);
            
            runs(function() {
                expect(focusSpy).toHaveBeenCalled();
            });
        });
        
        it("should fire blur event on field when button is blurred", function() {
            jasmine.focusAndWait(field.button);
            
            waitForSpy(focusSpy);
            
            jasmine.focusAndWait(btn);
            
            waitForSpy(blurSpy);
            
            runs(function() {
                expect(blurSpy).toHaveBeenCalled();
            });
        });
    });
});
