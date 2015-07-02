describe("Ext.layout.component.field.FieldContainer", function() {
    
    it("should account for left/right any padding supplied by the fieldBodyCls", function() {
        var fc = Ext.create('Ext.form.FieldContainer', {
            renderTo: Ext.getBody(),
            hideLabel: true,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            width: 300,
            height: 50,
            defaultType: 'component',
            items: [{
                flex: 1
            }, {
                flex: 1
            }]
        });
        // Simulate bodyCls setting padding: 1px
        fc.bodyEl.setStyle('padding', '1px');
        fc.updateLayout();
        expect(fc.items.first().getWidth()).toBe(149);
        expect(fc.items.last().getWidth()).toBe(149);
        fc.destroy();
    });
    
    it("should account for top/bottom any padding supplied by the fieldBodyCls", function() {
        var fc = Ext.create('Ext.form.FieldContainer', {
            renderTo: Ext.getBody(),
            hideLabel: true,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            width: 300,
            height: 50,
            items: [{
                xtype: 'component',
                flex: 1
            }]
        });
        // Simulate bodyCls setting padding: 1px
        fc.bodyEl.setStyle('padding', '1px');
        fc.updateLayout();
        expect(fc.items.first().getHeight()).toBe(48);
        fc.destroy();
    });

    it("should correctly measure content height when its container layout is hbox", function() {
        // EXTJSIV-12665
        var panel = Ext.widget({
            xtype: 'panel',
            renderTo: document.body,
            layout: 'anchor',
            bodyPadding: 10,
            items: [{
                xtype: 'fieldcontainer',
                id: 'field-ct',
                layout: 'hbox',
                items: [{
                    xtype: 'component',
                    style: 'height: 22px; width: 150px; background-color: green;',
                    html: '&nbsp;'
                }]
            }]
        });

        expect(panel.getHeight()).toBe(49);
        expect(Ext.getCmp('field-ct').getHeight()).toBe(22);

        panel.destroy();
    });

    it("should shrink wrap liquid layout children when using a box layout", function() {
        var fc = Ext.widget({
            xtype: 'fieldcontainer',
            renderTo: document.body,
            layout: 'hbox',
            items: [{
                xtype: 'textfield',
                width: 300,
                value: 'foo'
            }]
        });

        expect(fc.getHeight()).toBe(22);
        expect(fc.getWidth()).toBe(300);
        fc.destroy();
    });

    it("should publish the correct inner width for the layout of its items", function() {
        var fc = Ext.widget({
            renderTo: document.body,
            xtype: 'fieldcontainer',
            width: 500,
            fieldLabel: 'Label',
            msgTarget : 'side',
            layout: 'hbox',
            items: [{
                flex: 1,
                xtype: 'textfield'
            }]
        });

        expect(fc.getWidth()).toBe(500);
        expect(fc.labelEl.getWidth()).toBe(105);
        expect(fc.bodyEl.getWidth()).toBe(395);
        expect(fc.items.getAt(0).getWidth()).toBe(395);

        // make sure the child gets resized when side error is shown.
        fc.setActiveError('Error');

        expect(fc.getWidth()).toBe(500);
        expect(fc.labelEl.getWidth()).toBe(105);
        expect(fc.bodyEl.getWidth()).toBe(377);
        expect(fc.errorWrapEl.getWidth()).toBe(18);
        expect(fc.items.getAt(0).getWidth()).toBe(377);

        fc.destroy();
    });

    it("should publish the correct inner height for the layout of its items", function() {
        var fc = Ext.widget({
            renderTo: document.body,
            xtype: 'fieldcontainer',
            height: 200,
            fieldLabel: 'Label',
            labelAlign: 'top',
            msgTarget : 'under',
            layout: 'vbox',
            items: [{
                flex: 1,
                width: 100,
                xtype: 'component',
                style: 'background-color:green;'
            }]
        });

        expect(fc.getHeight()).toBe(200);
        expect(fc.labelEl.getHeight()).toBe(23);
        expect(fc.bodyEl.getHeight()).toBe(177);
        expect(fc.items.getAt(0).getHeight()).toBe(177);

        // make sure the child gets resized when side error is shown.
        fc.setActiveError('Error');

        expect(fc.getHeight()).toBe(200);
        expect(fc.labelEl.getHeight()).toBe(23);
        expect(fc.bodyEl.getHeight()).toBe(157);
        expect(fc.errorWrapEl.getHeight()).toBe(20);
        expect(fc.items.getAt(0).getHeight()).toBe(157);

        fc.destroy();
    });
});
