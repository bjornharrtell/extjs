describe("Ext.panel.Panel", function () {
    var panel, ct;

    function makePanel (cfg) {
        panel = new Ext.panel.Panel(Ext.apply({
            renderTo: Ext.getBody()
        }, cfg));
    }

    afterEach(function () {
        panel = ct = Ext.destroy(panel, ct);
    });

    function keep () {
        panel.el.dom.setAttribute('data-sticky', 'true');
        panel = null;
    }

    describe("toolbars", function() {
        describe("vertical toolbars", function() {
            describe("lbar", function() {
                it("should default to vertical: true", function() {
                    makePanel({
                        lbar: [{
                            text: 'Foo'
                        }]
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });

                it("should respect a configured vertical: false", function() {
                    makePanel({
                        lbar: {
                            vertical: false,
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: true", function() {
                    makePanel({
                        lbar: {
                            vertical: true,
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });
            });

            describe("rbar", function() {
                it("should default to vertical: true", function() {
                    makePanel({
                        rbar: [{
                            text: 'Foo'
                        }]
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });

                it("should respect a configured vertical: false", function() {
                    makePanel({
                        rbar: {
                            vertical: false,
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: true", function() {
                    makePanel({
                        rbar: {
                            vertical: true,
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });
            });

            describe("dock: left", function() {
                it("should default to vertical: true", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            dock: 'left',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });

                it("should respect a configured vertical: false", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            vertical: false,
                            dock: 'left',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: true", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            vertical: true,
                            dock: 'left',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });
            });

            describe("dock: right", function() {
                it("should default to vertical: true", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            dock: 'right',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });

                it("should respect a configured vertical: false", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            vertical: false,
                            dock: 'right',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: true", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            vertical: true,
                            dock: 'right',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });
            });
        });

        describe("horizontal toolbars", function() {
            describe("tbar", function() {
                it("should default to vertical: false", function() {
                    makePanel({
                        tbar: [{
                            text: 'Foo'
                        }]
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: false", function() {
                    makePanel({
                        tbar: {
                            vertical: false,
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: true", function() {
                    makePanel({
                        tbar: {
                            vertical: true,
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });
            });

            describe("bbar", function() {
                it("should default to vertical: false", function() {
                    makePanel({
                        bbar: [{
                            text: 'Foo'
                        }]
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: false", function() {
                    makePanel({
                        bbar: {
                            vertical: false,
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: true", function() {
                    makePanel({
                        bbar: {
                            vertical: true,
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });
            });

            describe("dock: top", function() {
                it("should default to vertical: false", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: false", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            vertical: false,
                            dock: 'top',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: true", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            vertical: true,
                            dock: 'top',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });
            });

            describe("dock: bottom", function() {
                it("should default to vertical: false", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: false", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            vertical: false,
                            dock: 'bottom',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: true", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            vertical: true,
                            dock: 'bottom',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });
            });
        });
    });

    describe("toolbars", function() {
        describe("vertical toolbars", function() {
            describe("lbar", function() {
                it("should default to vertical: true", function() {
                    makePanel({
                        lbar: [{
                            text: 'Foo'
                        }]
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });

                it("should respect a configured vertical: false", function() {
                    makePanel({
                        lbar: {
                            vertical: false,
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: true", function() {
                    makePanel({
                        lbar: {
                            vertical: true,
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });
            });

            describe("rbar", function() {
                it("should default to vertical: true", function() {
                    makePanel({
                        rbar: [{
                            text: 'Foo'
                        }]
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });

                it("should respect a configured vertical: false", function() {
                    makePanel({
                        rbar: {
                            vertical: false,
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: true", function() {
                    makePanel({
                        rbar: {
                            vertical: true,
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });
            });

            describe("dock: left", function() {
                it("should default to vertical: true", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            dock: 'left',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });

                it("should respect a configured vertical: false", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            vertical: false,
                            dock: 'left',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: true", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            vertical: true,
                            dock: 'left',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });
            });

            describe("dock: right", function() {
                it("should default to vertical: true", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            dock: 'right',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });

                it("should respect a configured vertical: false", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            vertical: false,
                            dock: 'right',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: true", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            vertical: true,
                            dock: 'right',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });
            });
        });

        describe("horizontal toolbars", function() {
            describe("tbar", function() {
                it("should default to vertical: false", function() {
                    makePanel({
                        tbar: [{
                            text: 'Foo'
                        }]
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: false", function() {
                    makePanel({
                        tbar: {
                            vertical: false,
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: true", function() {
                    makePanel({
                        tbar: {
                            vertical: true,
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });
            });

            describe("bbar", function() {
                it("should default to vertical: false", function() {
                    makePanel({
                        bbar: [{
                            text: 'Foo'
                        }]
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: false", function() {
                    makePanel({
                        bbar: {
                            vertical: false,
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: true", function() {
                    makePanel({
                        bbar: {
                            vertical: true,
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });
            });

            describe("dock: top", function() {
                it("should default to vertical: false", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: false", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            vertical: false,
                            dock: 'top',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: true", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            vertical: true,
                            dock: 'top',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });
            });

            describe("dock: bottom", function() {
                it("should default to vertical: false", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: false", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            vertical: false,
                            dock: 'bottom',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(false);
                });

                it("should respect a configured vertical: true", function() {
                    makePanel({
                        dockedItems: {
                            xtype: 'toolbar',
                            vertical: true,
                            dock: 'bottom',
                            items: [{
                                text: 'Foo'
                            }]
                        }
                    });
                    expect(panel.down('toolbar').vertical).toBe(true);
                });
            });
        });
    });

    describe("percentage width children of fixed width Panel", function() {
        it("should pass through %age widths to the child's style", function() {
            makePanel({
                width: 500,
                height: 280,
                title: "AutoLayout Panel",
                layout: 'auto',
                renderTo: Ext.getBody(),
                items: [{
                    xtype: 'panel',
                    title: 'Top Inner Panel',
                    width: '35%',
                    height: 90
                }, {
                    xtype: 'panel',
                    title: 'Bottom Inner Panel',
                    width: '75%',
                    height: 90
                }]
            });
            expect(panel.child('[title=Top Inner Panel]').el.dom.style.width).toEqual('35%');
            expect(panel.child('[title=Bottom Inner Panel]').el.dom.style.width).toEqual('75%');
        });
    });
    
    describe("collapsible", function(){

        describe("horizontal collapsing", function() {
            it("should add the correct vertical classes", function() {
                makePanel({
                    width: 100,
                    height: 100,
                    title: 'Foo',
                    collapsible: true,
                    animCollapse: false,
                    collapseDirection: 'left'
                });
                panel.collapse();

                var reExpander = panel.getReExpander().getEl();
                expect(reExpander).toHaveCls('x-panel-header-default-vertical');

            });
        });

        describe("collapse dimensions", function(){

            describe("static sizes", function(){

                describe("collapse vertical", function(){

                    it("should restore an auto height", function(){
                        makePanel({
                            width: 100,
                            title: 'Foo',
                            collapsible: true,
                            animCollapse: false,
                            html: '<div style="height: 20px;"></div>'
                        });
                        var oldHeight = panel.getHeight();
                        panel.collapse();
                        panel.update('<div style="height: 50px;"></div>');
                        panel.expand();
                        expect(panel.getHeight()).toBe(oldHeight + 30);
                    });

                    it("should restore a fixed height", function(){
                        makePanel({
                            width: 100,
                            height: 100,
                            title: 'Foo',
                            collapsible: true,
                            animCollapse: false
                        });
                        panel.collapse();
                        panel.expand();
                        expect(panel.getHeight()).toBe(100);
                    });

                });

                describe("collapse horizontal", function(){

                    it("should restore an auto width", function(){
                        // Float to prevent stretching the whole body width
                        makePanel({
                            collapseDirection: 'left',
                            height: 100,
                            title: 'Foo',
                            collapsible: true,
                            animCollapse: false,
                            html: '<div style="width: 20px;"></div>',
                            shadow: false,
                            floating: true
                        });
                        panel.show();
                        var oldWidth = panel.getWidth();
                        panel.collapse();
                        panel.update('<div style="width: 50px;"></div>');
                        panel.expand();
                        expect(panel.getWidth()).toBe(oldWidth + 30);
                    });

                    it("should restore a fixed width", function(){
                        makePanel({
                            width: 100,
                            height: 100,
                            title: 'Foo',
                            collapsible: true,
                            animCollapse: false
                        });
                        panel.collapse();
                        panel.expand();
                        expect(panel.getWidth()).toBe(100);
                    });

                });

            });

            describe("changing size while collapsed", function(){

                it("should set the width when the width changes while collapsed vertically", function(){
                    makePanel({
                        width: 100,
                        height: 100,
                        title: 'Foo',
                        collapsible: true,
                        animCollapse: false
                    });
                    panel.collapse();
                    panel.setWidth(200);
                    panel.expand();
                    expect(panel.getWidth()).toBe(200);
                });

                it("should set the height when the height changes while collapsed horizontally", function(){
                    makePanel({
                        collapseDirection: 'left',
                        width: 100,
                        height: 100,
                        title: 'Foo',
                        collapsible: true,
                        animCollapse: false
                    });
                    panel.collapse();
                    panel.setHeight(200);
                    panel.expand();
                    expect(panel.getHeight()).toBe(200);
                });

                describe("inside a container", function(){

                    it("should resize width", function(){
                        ct = Ext.create('Ext.container.Container', {
                            renderTo: Ext.getBody(),
                            width: 100,
                            height: 100,
                            layout: 'fit',
                            items: {
                                title: 'Foo',
                                collapsible: true,
                                margin: 10,
                                animCollapse: false
                            }
                        });

                        panel = ct.items.first();
                        panel.collapse();
                        ct.setWidth(200);
                        panel.expand();
                        expect(panel.getWidth()).toBe(180);
                    });

                    it("should resize height", function(){
                        ct = Ext.create('Ext.container.Container', {
                            renderTo: Ext.getBody(),
                            width: 100,
                            height: 100,
                            layout: 'fit',
                            items: {
                                title: 'Foo',
                                collapsible: true,
                                margin: 10,
                                animCollapse: false,
                                collapseDirection: 'left'
                            }
                        });

                        panel = ct.items.first();
                        panel.collapse();
                        ct.setHeight(200);
                        panel.expand();
                        expect(panel.getHeight()).toBe(180);
                    });

                });

            });

            describe("setCollapsed", function() {
                it("should call collapse the panel when true is passed", function() {
                    makePanel({
                        collapsible: true
                    });

                    spyOn(panel, 'collapse').andCallThrough();

                    panel.setCollapsed(true);

                    expect(panel.collapse).toHaveBeenCalled();

                    expect(panel.collapsed).toBeTruthy();
                });

                it("should call expand() when false is passed", function() {
                    makePanel({
                        collapsible: true,
                        collapsed: true
                    });

                    spyOn(panel, 'expand').andCallThrough();

                    panel.setCollapsed(false);

                    expect(panel.expand).toHaveBeenCalled();

                    expect(panel.collapsed).toBe(false);
                });
            });
        });

        describe("collapseTool", function(){
            var getTool;

            beforeEach(function(){
                getTool = function(){
                    return panel.down('tool');
                };
            });

            afterEach(function(){
                getTool = null;
            });

            it("should not create a collapse tool if collapsible: false", function(){
                makePanel({
                    width: 50,
                    height: 50,
                    title: 'x',
                    collapsible: false
                });
                expect(getTool()).toBeNull();
            });

            // collapsed, collapseDirection, expectedTool
            Ext.Array.forEach([
                        { collapsed: false, collapseDirection: 'top',    expect: 'collapse-top' },
                        { collapsed: false, collapseDirection: 'right',  expect: 'collapse-right' },
                        { collapsed: false, collapseDirection: 'bottom', expect: 'collapse-bottom' },
                        { collapsed: false, collapseDirection: 'left',   expect: 'collapse-left' },
                        { collapsed: true,  collapseDirection: 'top',    expect: 'expand-bottom' },
                        { collapsed: true,  collapseDirection: 'right',  expect: 'expand-left' },
                        { collapsed: true,  collapseDirection: 'bottom', expect: 'expand-top' },
                        { collapsed: true,  collapseDirection: 'left',   expect: 'expand-right' }
                    ],
                function(item){
                    var answer = item.expect;
                    delete item.expect;

                    it("should render the correct tool with default collapseMode "+
                            Ext.encode(item),
                        function(){
                            makePanel(Ext.apply({
                                width: 50,
                                height: 50,
                                title: 'x',
                                collapsible: true
                            }, item));
                            expect(getTool().type).toBe(answer);
                        });
                });

            // When using placeHolder, it should never modify the tool of the original panel
            Ext.Array.forEach([
                    { collapsed: false, collapseDirection: 'top',    expect: 'collapse-top' },
                    { collapsed: false, collapseDirection: 'right',  expect: 'collapse-right' },
                    { collapsed: false, collapseDirection: 'bottom', expect: 'collapse-bottom' },
                    { collapsed: false, collapseDirection: 'left',   expect: 'collapse-left' },
                    { collapsed: true,  collapseDirection: 'top',    expect: 'collapse-top' },
                    { collapsed: true,  collapseDirection: 'right',  expect: 'collapse-right' },
                    { collapsed: true,  collapseDirection: 'bottom', expect: 'collapse-bottom' },
                    { collapsed: true,  collapseDirection: 'left',   expect: 'collapse-left' }
                ],
                function(item){
                    var answer = item.expect;
                    delete item.expect;

                    it("should render the correct tool with the collapseMode placeHolder "+
                            Ext.encode(item),
                        function(){
                            // collapsed, collapseDirection, expectedTool
                            var ct = new Ext.container.Container({
                                renderTo: Ext.getBody()
                            });
                            makePanel(Ext.apply({
                                renderTo: null,
                                width: 50,
                                height: 50,
                                title: 'x',
                                collapsible: true,
                                collapseMode: 'placeholder'
                            }, item));
                            ct.add(panel);
                            expect(getTool().type).toBe(answer);
                            Ext.destroy(ct);
                        });
                });
        });
        
        describe("animation", function() {
        
            // https://sencha.jira.com/browse/EXTJSIV-8095
            it("should honor numeric animCollapse value", function() {
                runs(function() {
                    makePanel({
                        title: 'Hello',
                        animCollapse: 50,
                        collapsible: true,
                        width: 200,
                        x: 100,
                        y: 100,
                        html: '<p>World!</p>'
                    });
                    
                    panel.collapse();
                });
                
                waitsFor(function() {
                    return panel.collapsed === 'top'
                }, 'Never collapsed');
                
                runs(function() {
                    expect(panel.collapsed).toBe('top');
                });
            });
        });
    });
    
    describe("tools", function(){
        it("should add tools from the config", function(){
            makePanel({
                renderTo: Ext.getBody(),
                tools: [{
                    type: 'help'
                }, {
                    type: 'pin'
                }]
            });
            expect(panel.tools[0].type).toBe('help');
            expect(panel.tools[1].type).toBe('pin');
        });

        it("should add tools after rendering", function(){
            makePanel({
                renderTo: Ext.getBody(),
                tools: [{
                    type: 'help'
                }, {
                    type: 'pin'
                }]
            });

            panel.addTool({
                type: 'save'
            });
            expect(panel.tools[2].type).toBe('save');
        });
    });
    
    describe('autoHeight with dock bottom item', function () {
        var failedLayouts = Ext.failedLayouts;

        beforeEach(function () {
            failedLayouts = Ext.failedLayouts;
        });
        
        it('should work', function () {
            makePanel({
                frame: true,
                title: 'Test',
                width: 500,
                bodyStyle: 'background-color: yellow;',
                dockedItems: [{
                    xtype: 'component',
                    dock: 'top',
                    style: 'height:26px;background-color:red;'
                }, {
                    xtype: 'component',
                    dock: 'bottom',
                    style: 'height:36px;background-color:blue;'
                }],
                items: [{
                    xtype: 'component',
                    style: 'width:100px; height:125px;background-color:green;'
                }]
            });

            // This is the Correct Answer for the classic theme - if this fails in some
            // case, the problem is *not* this number! :)
            //
            expect(panel.el.getHeight()).toBe(
                    28 + // header w/1px border
                    4 + // padding
                    26 + // top dockedItem
                    1 + // managed border
                    125 + // component in body
                    1 + // managed border
                    36 + // bottom dockedItem
                    4 + // padding
                    1); // border

            if (failedLayouts != Ext.failedLayouts) {
                expect('failedLayout=true').toBe('false');
            }
        });
    });

    describe('render', function() {
        it('should allow a docked item to veto its render', function() {
            panel = new Ext.panel.Panel({
                renderTo: Ext.getBody(),
                dockedItems: [{
                    xtype: 'component',
                    itemId: 'paneldockedchild',
                    listeners: {
                        beforerender: function() {
                            return false;
                        }
                    }
                }]
            });

            // Child not rendered
            expect(panel.child('#paneldockedchild').rendered).toBe(false);
        });
        
        it("should be able to modify during rendering", function(){
            panel = new Ext.panel.Panel({
                renderTo: Ext.getBody(),
                items: {
                    xtype: 'component',
                    listeners: {
                        beforerender: function(c){
                            c.ownerCt.disable();
                        }
                    }
                }
            });
            expect(panel.getEl().hasCls(panel.disabledCls)).toBe(true);
        });
    });
    
    describe("header", function(){
        var fooIcon = 'resources/images/foo.gif';
        
        it("should create a header if a header config is passed", function(){
            makePanel({
                header: {
                    title: 'Foo'
                }
            });
            var header = panel.header;
            expect(header.isHeader).toBe(true);
            expect(header.getTitle().getText()).toBe('Foo');
        });
        
        it("should create a header when specifying a title", function() {
            makePanel({
                title: 'Foo'
            });
            expect(panel.header.isHeader).toBe(true);
        });  
            
        it("should create a header when specifying an icon", function() {
            makePanel({
                icon: fooIcon
            });
            expect(panel.header.isHeader).toBe(true);
        }); 
            
        it("should create a header when specifying a iconCls", function() {
            makePanel({
                iconCls: 'Foo'
            });
            expect(panel.header.isHeader).toBe(true);
        }); 

        it("should create a header when specifying tools", function() {
            makePanel({
                tools: [{
                    type: 'refresh'
                }]
            });
            expect(panel.header.isHeader).toBe(true);
        });  
            
        it("should create a header when specifying collapsible", function() {
            makePanel({
                collapsible: true
            });
            expect(panel.header.isHeader).toBe(true);
        });

        describe("with header false", function(){
            it("should not create a header with header: false when specifying a title", function() {
                makePanel({
                    header: false,
                    title: 'Foo'
                });
                expect(panel.header).toBe(false);
            });  
            
            it("should not create a header with header: false when specifying an icon", function() {
                makePanel({
                    header: false,
                    icon: fooIcon
                });
                expect(panel.header).toBe(false);
            }); 
            
            it("should not create a header with header: false when specifying a iconCls", function() {
                makePanel({
                    header: false,
                    iconCls: 'Foo'
                });
                expect(panel.header).toBe(false);
            }); 

            it("should not create a header with header: false when specifying tools", function() {
                makePanel({
                    header: false,
                    tools: [{
                        type: 'refresh'
                    }]
                });
                expect(panel.header).toBe(false);
            });  
            
            it("should not create a header with header: false when specifying collapsible", function() {
                makePanel({
                    header: false,
                    collapsible: true
                });
                expect(panel.header).toBe(false);
            }); 
        });
    });
    
    describe("setTitle", function(){
        
        describe("before render", function() {
            describe("with no title", function() {
                it("should update the title when rendered", function(){
                    makePanel({
                        renderTo: null
                    });    
                    panel.setTitle('Bar');
                    panel.render(Ext.getBody());
                    expect(panel.header.getTitle().textEl.dom).hasHTML('Bar');
                });
                
                it("should not modify the tools when setting the title", function(){
                    makePanel({
                        renderTo: null,
                        tools: [{
                            type: 'close'
                        }]
                    });    
                    panel.setTitle('Bar');
                    panel.render(Ext.getBody());
                    expect(panel.header.query('tool').length).toBe(1);
                });

                it("should be able to set the title in the beforerender listener", function() {
                    makePanel({
                        renderTo: Ext.getBody(),
                        listeners: {
                            beforerender: function(p) {
                                p.setTitle('Bar');
                            }
                        }
                    });
                    expect(panel.header.getTitle().textEl.dom).hasHTML('Bar');
                });

                it("should be able to set the title in the beforeRender template method", function() {
                    var Cls = Ext.define(null, {
                        extend: 'Ext.panel.Panel',
                        beforeRender : function() {
                            this.callParent(arguments);
                            this.setTitle('Bar');
                        }
                    });
                    panel = new Cls({
                        renderTo: Ext.getBody()
                    });
                    expect(panel.header.getTitle().textEl.dom).hasHTML('Bar');
                });
            });

            describe("with an existing title", function() {
                it("should update the title when rendered", function(){
                    makePanel({
                        renderTo: null,
                        title: 'Foo'
                    });    
                    panel.setTitle('Bar');
                    panel.render(Ext.getBody());
                    expect(panel.header.getTitle().textEl.dom).hasHTML('Bar');
                });
                
                it("should not modify the tools when setting the title", function(){
                    makePanel({
                        renderTo: null,
                        tools: [{
                            type: 'close'
                        }],
                        title: 'Foo'
                    });    
                    panel.setTitle('Bar');
                    panel.render(Ext.getBody());
                    expect(panel.header.query('tool').length).toBe(1);
                });

                it("should be able to set the title in the beforerender listener", function() {
                    makePanel({
                        title: 'Foo',
                        renderTo: Ext.getBody(),
                        listeners: {
                            beforerender: function(p) {
                                p.setTitle('Bar');
                            }
                        }
                    });
                    expect(panel.header.getTitle().textEl.dom).hasHTML('Bar');
                });

                it("should be able to set the title in the beforeRender template method", function() {
                    var Cls = Ext.define(null, {
                        extend: 'Ext.panel.Panel',
                        title: 'Foo',
                        beforeRender : function() {
                            this.callParent(arguments);
                            this.setTitle('Bar');
                        }
                    });
                    panel = new Cls({
                        renderTo: Ext.getBody()
                    });
                    expect(panel.header.getTitle().textEl.dom).hasHTML('Bar');
                });
            });
        });  
        
        describe("after render", function() {
            describe("with no title", function() {
                it("should create the title when rendered", function(){
                    makePanel();
                    panel.setTitle('Bar');
                    expect(panel.header.getTitle().textEl.dom).hasHTML('Bar');
                });
            });

            describe("with a title", function() {
                it("should update the title when rendered", function(){
                    makePanel({
                        title: 'Foo'
                    });
                    panel.setTitle('Bar');
                    expect(panel.header.getTitle().textEl.dom).hasHTML('Bar');
                });
            });

            it("should update the layout when the title is set after render", function() {
                panel = Ext.create({
                    xtype: 'panel',
                    renderTo: document.body,
                    height: 200,
                    width: 200,
                    headerPosition: 'left',
                    header: {
                        titleRotation: 0
                    }
                });

                panel.header.setTitle('<div style="width:100px"></div>');

                expect(panel.header.getWidth()).toBe(115);

                panel.header.getTitle().setText('<div style="width:50px"></div>');

                expect(panel.header.getWidth()).toBe(65);

                panel.destroy();
            });
        });
    });
    
    describe("body styling", function(){

        var makeUnrenderedPanel = function (cfg) {
            panel = new Ext.panel.Panel(Ext.apply({
            }, cfg));
        };

        describe("setBodyStyle", function(){
            describe("before rendering", function(){
                it("should be able to set a single key value pair", function(){
                    makeUnrenderedPanel();
                    panel.setBodyStyle('color', 'red');
                    panel.render(Ext.getBody());
                    expect(panel.body.dom.style.color).toBe('red');
                });

                it("should be able to set a multiple key value pairs", function(){
                    makeUnrenderedPanel();
                    panel.setBodyStyle('color', 'red');
                    panel.setBodyStyle('background-color', 'blue');
                    panel.render(Ext.getBody());
                    expect(panel.body.dom.style.color).toBe('red');
                    expect(panel.body.dom.style.backgroundColor).toBe('blue');
                });

                it("should be able to set a style string", function(){
                    makeUnrenderedPanel();
                    panel.setBodyStyle('color: red; background-color: blue;');
                    panel.render(Ext.getBody());
                    expect(panel.body.dom.style.color).toBe('red');
                    expect(panel.body.dom.style.backgroundColor).toBe('blue');
                });

                it("should be able to set a style object", function(){
                    makeUnrenderedPanel();
                    panel.setBodyStyle({
                        color: 'red',
                        backgroundColor: 'blue'
                    });
                    panel.render(Ext.getBody());
                    expect(panel.body.dom.style.color).toBe('red');
                    expect(panel.body.dom.style.backgroundColor).toBe('blue');
                });
            });

            describe("after rendering", function(){
                it("should be able to set a single key value pair", function(){
                    makePanel();
                    panel.setBodyStyle('color', 'red');
                    expect(panel.body.dom.style.color).toBe('red');
                });

                it("should be able to set a multiple key value pairs", function(){
                    makePanel();
                    panel.setBodyStyle('color', 'red');
                    panel.setBodyStyle('background-color', 'blue');
                    expect(panel.body.dom.style.color).toBe('red');
                    expect(panel.body.dom.style.backgroundColor).toBe('blue');
                });

                it("should be able to set a style string", function(){
                    makePanel();
                    panel.setBodyStyle('color: red; background-color: blue;');
                    expect(panel.body.dom.style.color).toBe('red');
                    expect(panel.body.dom.style.backgroundColor).toBe('blue');
                });

                it("should be able to set a style object", function(){
                    makePanel();
                    panel.setBodyStyle({
                        color: 'red',
                        backgroundColor: 'blue'
                    });
                    expect(panel.body.dom.style.color).toBe('red');
                    expect(panel.body.dom.style.backgroundColor).toBe('blue');
                });
            });
        });

        describe("addBodyCls", function(){

            describe("before rendering", function(){
                it("should add a class to the body", function() {
                    makeUnrenderedPanel();
                    panel.addBodyCls('foo');
                    panel.render(Ext.getBody());
                    expect(panel.body.hasCls('foo')).toBe(true);
                });

                it("should add a class to the body after being removed", function() {
                    makeUnrenderedPanel();
                    panel.addBodyCls('foo');
                    panel.removeBodyCls('foo');
                    panel.addBodyCls('foo');
                    panel.render(Ext.getBody());
                    expect(panel.body.hasCls('foo')).toBe(true);
                });
            });

            describe("after rendering", function(){
                it("should add a class to the body", function() {
                    makePanel();
                    panel.addBodyCls('foo');
                    expect(panel.body.hasCls('foo')).toBe(true);
                });

                it("should add a class to the body after being removed", function() {
                    makePanel();
                    panel.addBodyCls('foo');
                    panel.removeBodyCls('foo');
                    panel.addBodyCls('foo');
                    expect(panel.body.hasCls('foo')).toBe(true);
                });
            });

        });

        describe("removeBodyCls", function(){
            describe("before rendering", function(){
                it("should remove a class added to the body", function(){
                    makeUnrenderedPanel();
                    panel.addBodyCls('foo');
                    panel.removeBodyCls('foo');
                    panel.render(Ext.getBody());
                    expect(panel.body.hasCls('foo')).toBe(false);
                });
            });

            describe("after rendering", function(){
                it("should remove a class added to the body", function(){
                    makePanel();
                    panel.addBodyCls('foo');
                    panel.removeBodyCls('foo');
                    expect(panel.body.hasCls('foo')).toBe(false);
                });
            });
        });

    });

    describe("margin", function() {
        it("should put configured margins on the element", function() {
            makePanel({
                margin: 10,
                width: 200,
                height: 200
            });
            var margin = panel.el.getMargin();
            expect(margin.t).toBe(10);
            expect(margin.r).toBe(10);
            expect(margin.b).toBe(10);
            expect(margin.l).toBe(10);
        });

        it("should set margins after render", function() {
            makePanel({
                width: 200,
                height: 200
            });
            panel.setMargin('1 2 3 4');
            var margin = panel.el.getMargin();
            expect(margin.t).toBe(1);
            expect(margin.r).toBe(2);
            expect(margin.b).toBe(3);
            expect(margin.l).toBe(4);
        });

        it("should relayout a parent to reposition if necessary", function() {
            var ct = new Ext.container.Container({
                layout: 'hbox',
                renderTo: Ext.getBody(),
                width: 600,
                height: 200,
                items: [{
                    title: 'Foo',
                    width: 100
                }, {
                    title: 'Bar',
                    margin: '0 0 0 50',
                    width: 100
                }]
            });

            var p = ct.items.last(),
                left = p.getEl().getLeft();

            p.setMargin('0 0 0 100');
            expect(p.getEl().getLeft()).toBe(left + 50);
            ct.destroy();
        });
    });
    
    describe("minButtonWidth", function(){
        it("should apply minButtonWidth to button configs", function(){
            makePanel({
                minButtonWidth: 75,
                width: 400,
                height: 200,
                buttons: [{
                    itemId: 'a',
                    text: 'A'
                }, {
                    itemId: 'b',
                    text: 'B'
                }]
            }); 
            expect(panel.down('#a').minWidth).toBe(75);
            expect(panel.down('#b').minWidth).toBe(75);
        });
        
        it("should apply minButtonWidth to button instances", function(){
            makePanel({
                minButtonWidth: 75,
                width: 400,
                height: 200,
                buttons: [new Ext.button.Button({
                    itemId: 'a',
                    text: 'A'
                }), new Ext.button.Button({
                    itemId: 'b',
                    text: 'B'
                })]
            }); 
            expect(panel.down('#a').minWidth).toBe(75);
            expect(panel.down('#b').minWidth).toBe(75);
        });
        
        it("should apply minButtonWidth to button subclass configs", function(){
            Ext.define('spec.CustomButton', {
                extend: 'Ext.button.Button',
                alias: 'widget.mybutton'
            });
            
            makePanel({
                minButtonWidth: 75,
                width: 400,
                height: 200,
                buttons: [{
                    xtype: 'mybutton',
                    itemId: 'a',
                    text: 'A'
                }, {
                    xtype: 'mybutton',
                    itemId: 'b',
                    text: 'B'
                }]
            }); 
            expect(panel.down('#a').minWidth).toBe(75);
            expect(panel.down('#b').minWidth).toBe(75);
            Ext.undefine('spec.CustomButton');
        });
        
        it("should not apply minButtonWidth to non-button components", function(){            
            makePanel({
                minButtonWidth: 75,
                width: 400,
                height: 200,
                buttons: [{
                    xtype: 'component',
                    itemId: 'a',
                    text: 'A'
                }, new Ext.Component({
                    xtype: 'mybutton',
                    itemId: 'b',
                    text: 'B'
                })]
            }); 
            expect(panel.down('#a').minWidth).not.toBe(75);
            expect(panel.down('#b').minWidth).not.toBe(75);
        });
    });
    
    describe('draggable', function () {
        var makePanel = function (cfg) {
            panel = new Ext.panel.Panel(cfg);
        },
        spy;

        afterEach(function (){
            spy = null;
        });

        describe('draggable true', function () {
            it('should call initDraggable', function () {
                makePanel({
                    draggable: true
                });

                spy = spyOn(panel, 'initDraggable');
                panel.render(Ext.getBody());

                expect(spy).wasCalled();
            });

            it('should have a DragSource instance if draggable', function () {
                makePanel({
                    draggable: true,
                    renderTo: Ext.getBody()
                });

                expect(panel.dd).toBeDefined();
            });

            it('should call endDrag on its DragSource instance when hiding', function () {
                makePanel({
                    draggable: true,
                    renderTo: Ext.getBody()
                });

                spy = spyOn(panel.dd, 'endDrag');
                panel.hide();

                expect(spy).wasCalled();
            });

            it('should not create a Component Dragger instance  with header: false', function() {
                makePanel({
                    draggable: true,
                    header: false
                });
                expect(panel.dd).toBeUndefined();
            }); 
        });

        describe('draggable false', function () {
            it('should not call initDraggable', function () {
                makePanel({
                    draggable: false
                });
                
                spy = spyOn(panel, 'initDraggable');
                panel.render(Ext.getBody());

                expect(spy).wasNotCalled();
            });

            it('should not have a DragSource instance if not draggable', function () {
                makePanel({
                    draggable: false,
                    renderTo: Ext.getBody()
                });

                expect(panel.dd).toBeUndefined();
            });

            it('should not call attempt to call endDrag when hiding panel is not draggable', function () {
                makePanel({
                    draggable: false,
                    renderTo: Ext.getBody()
                });

                panel.hide();

                expect(panel.dd).toBeUndefined();
            });
        });
    });

    describe("ghost", function() {
        var ghost;

        function makePanel(cfg) {
            panel = Ext.widget(Ext.apply({
                xtype: 'panel',
                floating: true,
                hidden: false,
                renderTo: document.body,

                height: 100,
                width: 300
            }, cfg));

            ghost = panel.ghost();
        }

        it("should instantiate a ghost panel", function() {
            makePanel();

            expect(ghost.xtype).toBe('panel');
        });

        it("should instantiate a ghost window if the owner is a window", function() {
            makePanel({
                xtype: 'window'
            });

            expect(ghost.xtype).toBe('window');
        });

        it("should pass the owner UI along to the ghost", function() {
            makePanel({
                ui: 'foo'
            });

            expect(ghost.ui).toBe('foo');
        });

        it("should pass the owner's shim config along to the ghost", function() {
            makePanel({
                shim: true
            });

            expect(ghost.shim).toBe(true);
        });

        it("should pass header configs along to the ghost header", function() {
            var header;

            makePanel({
                titleAlign: 'center',
                header: {
                    titlePosition: 2,
                    tools: [
                        { type: 'close' },
                        { type: 'pin' }
                    ]
                }
            });

            header = ghost.header;

            expect(header.titleAlign).toBe('center');
            expect(header.titlePosition).toBe(2);
            expect(header.items.getAt(0).type).toBe('close');
            expect(header.items.getAt(1).type).toBe('pin');
            expect(header.items.getAt(2)).toBe(header.getTitle());
        });
    });

    describe('placeholder', function () {
        var wasCalled = false,
            viewport, westRegion, centerRegion, placeholder;

        function createViewport(cfg, split) {
            viewport = new Ext.container.Viewport(Ext.apply({
                layout: 'border',
                items: [{
                    region: 'west',
                    title: 'west',
                    collapsed: true,
                    collapsible: true,
                    animCollapse: false,
                    width: 150,
                    split: split
                }, {
                    region: 'center',
                    title: 'center',
                    items: []
                }],
                renderTo: Ext.getBody()
            }, cfg || {}));

            westRegion = viewport.down('panel[region="west"]');
            centerRegion = viewport.down('panel[region="center"]');
            placeholder = westRegion.placeholder;
        }

        afterEach(function () {
            Ext.destroy(viewport, westRegion, placeholder);
            wasCalled = false;
        });

        describe('hiding', function() {
            it('should hide when collapsed', function() {
                createViewport(null, true);

                westRegion.collapse();
                westRegion.hide();

                // West should be completely hidden along with its splitter furniture.
                // Center must take up 100% of viewport width
                expect(westRegion.isVisible()).toBe(false);
                expect(westRegion.splitter.isVisible()).toBe(false);
                expect(centerRegion.getWidth()).toBe(viewport.getWidth());
            });

            it('should hiding when floated from collapsed', function() {
                var isFloated;

                createViewport(null, true);

                westRegion.on('float', function() {
                    isFloated = true;
                });
                westRegion.collapse();
                westRegion.floatCollapsedPanel();

                // Wait until it's done
                waitsFor(function() {
                    return isFloated;
                });
                runs(function() {
                    westRegion.hide();

                    // West should be completely hidden along with its splitter furniture.
                    // Center must take up 100% of viewport width
                    expect(westRegion.isVisible()).toBe(false);
                    expect(westRegion.splitter.isVisible()).toBe(false);
                    expect(centerRegion.getWidth()).toBe(viewport.getWidth());
                });
            });
        });

        describe('inheritable', function () {
            it('should correctly update the hidden state', function () {
                createViewport();

                westRegion.expand();
                expect(placeholder.getInherited().hidden).toBe(true);

                westRegion.collapse();
                expect(placeholder.getInherited().hasOwnProperty('hidden')).toBe(false);
            });

            it('should correctly update the hidden state, animated', function () {
                createViewport({
                    items: [{
                        region: 'west',
                        title: 'west',
                        collapsed: true,
                        collapsible: true,
                        animCollapse: 1,
                        width: 150,
                        listeners: {
                            collapse: function () {
                                wasCalled = true;
                            },
                            expand: function () {
                                wasCalled = true;
                            }
                        }
                    }, {
                        region: 'center',
                        title: 'center',
                        items: []
                    }]
                });

                westRegion.expand(true);

                waitsFor(function () {
                    return wasCalled;
                });

                runs(function () {
                    wasCalled = false;
                    expect(placeholder.getInherited().hidden).toBe(true);

                    westRegion.collapse('left', true);
                });

                waitsFor(function () {
                    return wasCalled;
                });

                runs(function () {
                    expect(placeholder.getInherited().hasOwnProperty('hidden')).toBe(false);
                });
            });
        });
    });

    describe('binding', function () {
        it("should bind the title", function () {
            makePanel({
                session: true,
                referenceHolder: true,
                defaultListenerScope: true,

                wow: function (value) {
                    return value + '!!';
                },
                viewModel: {
                    foo: ''
                },
                items: [{
                    xtype: 'panel',
                    reference: 'subPanel',
                    bind: {
                        title: 'Hello {foo:this.wow}!'
                    }
                }]
            });

            var viewModel = panel.getViewModel(),
                subPanel = panel.lookupReference('subPanel');

            viewModel.set('foo', 'Don');
            viewModel.getScheduler().notify();

            expect(subPanel.title).toBe('Hello Don!!!');
        });
    });

    describe("titleRotation", function() {
        var elementProto = Ext.Element.prototype,
            hooks = {
                0: elementProto.styleHooks,
                90: elementProto.verticalStyleHooks90,
                270: elementProto.verticalStyleHooks270
            },
            titleEl;

        function  makePanel(cfg) {
            panel = Ext.create(Ext.apply({
                xtype: 'panel',
                renderTo: document.body,
                height: 200,
                width: 200,
                title: 'Rotate Panel'
            }, cfg));
            titleEl = panel.header.getTitle().el;
        }

        function expectRotation(angle) {
            if (angle) {
                expect(titleEl.vertical).toBe(true);
            } else {
                expect(titleEl.vertical).toBeFalsy();
            }
            expect(titleEl.styleHooks).toBe(hooks[angle]);
        }

        afterEach(function() {
            titleEl = null;
        });

        it("should default to non-rotated when headerPosition is top", function() {
            makePanel();
            expectRotation(0);
        });

        it("should default to non-rotated when headerPosition is bottom", function() {
            makePanel({
                headerPosition: 'bottom'
            });
            expectRotation(0);
        });

        it("should default to 90 degree rotation when headerPosition is right", function() {
            makePanel({
                headerPosition: 'right'
            });
            expectRotation(90);
        });

        it("should default to 90 degree rotation when headerPosition is left", function() {
            makePanel({
                headerPosition: 'left'
            });
            expectRotation(90);
        });

        describe("headerPosition: top", function() {
            it("should rotate 0 degrees", function() {
                makePanel({
                    headerPosition: 'top',
                    titleRotation: 0
                });
                expectRotation(0);
            });

            it("should rotate 90 degrees", function() {
                makePanel({
                    headerPosition: 'top',
                    titleRotation: 1
                });
                expectRotation(90);
            });

            it("should rotate 270 degrees", function() {
                makePanel({
                    headerPosition: 'top',
                    titleRotation: 2
                });
                expectRotation(270);
            });
        });

        describe("headerPosition: right", function() {
            it("should rotate 0 degrees", function() {
                makePanel({
                    headerPosition: 'right',
                    titleRotation: 0
                });
                expectRotation(0);
            });

            it("should rotate 90 degrees", function() {
                makePanel({
                    headerPosition: 'right',
                    titleRotation: 1
                });
                expectRotation(90);
            });

            it("should rotate 270 degrees", function() {
                makePanel({
                    headerPosition: 'right',
                    titleRotation: 2
                });
                expectRotation(270);
            });
        });

        describe("headerPosition: bottom", function() {
            it("should rotate 0 degrees", function() {
                makePanel({
                    headerPosition: 'bottom',
                    titleRotation: 0
                });
                expectRotation(0);
            });

            it("should rotate 90 degrees", function() {
                makePanel({
                    headerPosition: 'bottom',
                    titleRotation: 1
                });
                expectRotation(90);
            });

            it("should rotate 270 degrees", function() {
                makePanel({
                    headerPosition: 'bottom',
                    titleRotation: 2
                });
                expectRotation(270);
            });
        });

        describe("headerPosition: left", function() {
            it("should rotate 0 degrees", function() {
                makePanel({
                    headerPosition: 'left',
                    titleRotation: 0
                });
                expectRotation(0);
            });

            it("should rotate 90 degrees", function() {
                makePanel({
                    headerPosition: 'left',
                    titleRotation: 1
                });
                expectRotation(90);
            });

            it("should rotate 270 degrees", function() {
                makePanel({
                    headerPosition: 'left',
                    titleRotation: 2
                });
                expectRotation(270);
            });
        });

    });

    //
    // TODO: RTL specs have been commented out b/c the overrides are not being applied before the target class mixes
    // in the classes. For example, should be:
    //
    //          Renderable -> rtl.Renderable -> Component
    //
    // but in dev mode the order is:
    //
    //          Renderable -> Component -> rtl.Renderable
    //
    // The specs should be re-activated when this issue is resolved.
    //
    (function () {
        // Here we're testing both the `constrain` and `constrainHeader` Panel properties.
        // We're testing the following use cases:
        //
        //      1. Rendering using the renderTo config.
        //      2. Rendering using the .render() method.
        //      3. Rendering to an absolutely-positioned panel.
        //      4. Rendering to a relatively-positioned panel.
        //      5. Constraining the header.
        //      6. Constraining the entire component.
        //      7. All previous iterations as RTL.
        //
        // It's important to test both relative and absolute positioning because the the former creates
        // an offsetParent relationship with the constrained Panel and the latter demonstrates that an
        // absolutely-positioned Panel will be properly constrained within another Panel.
        //
        // Note that the self-executing anonymous function isn't necessary but is here to help with readability.
        function createConstrainSuite(cfg) {
            var renderTo = cfg.renderTo,
                positionAbsolute = cfg.positionAbsolute,
                constrainHeader = cfg.constrainHeader,
                isRtl = cfg.isRtl,
                suite = ['constraining: renderTo = ', !!renderTo, ', positionAbsolute = ', !!positionAbsolute, ', constrainHeader = ', !!constrainHeader, ', isRtl = ', !!isRtl].join('');

            describe(suite, function () {
                var pan, pan2, style, xy, offsets;

                beforeEach(function () {
                    pan = new Ext.panel.Panel({
                        rtl: isRtl,
                        title: 'A',
                        style: {
                            position: !positionAbsolute ? 'relative' : 'absolute'
                        },
                        width: 400,
                        height: 400,
                        renderTo: Ext.getBody()
                    });
                });

                afterEach(function () {
                    Ext.destroy(pan2, pan);
                    pan = pan2 = style = xy = offsets = null;
                });

                function createPositionable(offsets) {
                    var x = offsets[0],
                        y = offsets[1] || 30,
                        obj = {};

                    obj[!constrainHeader ? 'constrain' : 'constrainHeader'] = true;

                    if (renderTo) {
                        obj.renderTo = pan.el;
                    }

                    // Don't use this suite's makePanel function here, we want to control renderTo (or not).
                    pan2 = new Ext.panel.Panel(Ext.apply({
                        title: 'My Panel',
                        width: 100,
                        height: 100,
                        x: x,
                        y: y,
                        html: 'nothing to see here'
                    }, obj));

                    if (!renderTo) {
                        pan2.render(pan.el);
                    }

                    style = pan2.el.dom.style;
                    xy = [ pan2.x, pan2.y ];
                }

                describe('the x offset', function () {
                    it('should constrain a negative x offset', function () {
                        createPositionable([-30]);

                        expect(xy[0]).toBe(0);
                        expect(parseInt(style[!isRtl ? 'left' : 'right'], 10)).toBe(0);
                        expect(parseInt(style.top, 10)).toBe(30);
                    });

                    it('should not constrain a positive x offset', function () {
                        createPositionable([30]);

                        expect(xy[0]).toBe(30);
                        expect(parseInt(style[!isRtl ? 'left' : 'right'], 10)).toBe(30);
                        expect(parseInt(style.top, 10)).toBe(30);
                    });

                    it('should constrain a huge positive x offset', function () {
                        createPositionable([3000]);

                        expect(xy[0]).toBe(300);
                        expect(parseInt(style[!isRtl ? 'left' : 'right'], 10)).toBe(300);
                        expect(parseInt(style.top, 10)).toBe(30);
                    });

                    it('should constrain an overlapping x offset', function () {
                        createPositionable([350]);

                        expect(xy[0]).toBe(300);
                        expect(parseInt(style[!isRtl ? 'left' : 'right'], 10)).toBe(300);
                        expect(parseInt(style.top, 10)).toBe(30);
                    });
                });

                describe('the y offset', function () {
                    it('should constrain a negative y offset', function () {
                        createPositionable([30, -30]);

                        expect(xy[1]).toBe(0);
                        expect(parseInt(style[!isRtl ? 'left' : 'right'], 10)).toBe(30);
                        expect(parseInt(style.top, 10)).toBe(0);
                    });

                    it('should not constrain a positive y offset', function () {
                        createPositionable([30, 30]);

                        expect(xy[1]).toBe(30);
                        expect(parseInt(style[!isRtl ? 'left' : 'right'], 10)).toBe(30);
                        expect(parseInt(style.top, 10)).toBe(30);
                    });

                    it('should constrain a huge positive y offset', function () {
                        createPositionable([30, 3000]);
                        offsets = !constrainHeader ? 300 : 373;

                        expect(xy[1]).toBe(offsets);
                        expect(parseInt(style[!isRtl ? 'left' : 'right'], 10)).toBe(30);
                        expect(parseInt(style.top, 10)).toBe(offsets);
                    });

                    it('should constrain an overlapping y offset', function () {
                        createPositionable([30, 380]);
                        offsets = !constrainHeader ? 300 : 373;

                        expect(xy[1]).toBe(offsets);
                        expect(parseInt(style[!isRtl ? 'left' : 'right'], 10)).toBe(30);
                        expect(parseInt(style.top, 10)).toBe(offsets);
                    });
                });

                describe('both offsets', function () {
                    it('should not constrain either if within accepted offsets', function () {
                        createPositionable([171, 133]);

                        expect(xy).toEqual([171, 133]);
                        expect(parseInt(style[!isRtl ? 'left' : 'right'], 10)).toBe(171);
                        expect(parseInt(style.top, 10)).toBe(133);
                    });

                    it('should constrain both if outside of accepted offsets (positive)', function () {
                        createPositionable([11111, 222222]);
                        offsets = !constrainHeader ? [300, 300] : [300, 373];

                        expect(xy).toEqual(offsets);
                        expect(parseInt(style[!isRtl ? 'left' : 'right'], 10)).toBe(offsets[0]);
                        expect(parseInt(style.top, 10)).toBe(offsets[1]);
                    });

                    it('should constrain both if outside of accepted offsets (negative)', function () {
                        createPositionable([-33333, -444444]);

                        expect(xy).toEqual([0, 0]);
                        expect(parseInt(style[!isRtl ? 'left' : 'right'], 10)).toBe(0);
                        expect(parseInt(style.top, 10)).toBe(0);
                    });

                    it('should constrain both if outside of accepted offsets (x = negative, y = positive)', function () {
                        createPositionable([-555555, 666666]);
                        offsets = !constrainHeader ? [0, 300] : [0, 373];

                        expect(xy).toEqual(offsets);
                        expect(parseInt(style[!isRtl ? 'left' : 'right'], 10)).toBe(offsets[0]);
                        expect(parseInt(style.top, 10)).toBe(offsets[1]);
                    });

                    it('should constrain both if outside of accepted offsets (x = positive, y = negative)', function () {
                        createPositionable([77777, -88888]);

                        expect(xy).toEqual([300, 0]);
                        expect(parseInt(style[!isRtl ? 'left' : 'right'], 10)).toBe(300);
                        expect(parseInt(style.top, 10)).toBe(0);
                    });

                    it('should constrain just one if outside of accepted offsets (x = ok, y = exceeds negative)', function () {
                        createPositionable([79, -99999]);

                        expect(xy).toEqual([79, 0]);
                        expect(parseInt(style[!isRtl ? 'left' : 'right'], 10)).toBe(79);
                        expect(parseInt(style.top, 10)).toBe(0);
                    });

                    it('should constrain just one if outside of accepted offsets (x = ok, y = exceeds positive)', function () {
                        createPositionable([42, 99999]);
                        offsets = !constrainHeader ? [42, 300] : [42, 373];

                        // toBeApprox(expected, errorMargin);
                        expect(xy[0]).toBeApprox(offsets[0], 1);
                        expect(xy[1]).toBeApprox(offsets[1], 1);
                        expect(parseInt(style[!isRtl ? 'left' : 'right'], 10)).toBe(offsets[0]);
                        expect(parseInt(style.top, 10)).toBeApprox(offsets[1], 1);
                    });

                    it('should constrain both if outside of accepted offsets (x = exceeds negative, y = ok)', function () {
                        createPositionable([-10101, 267]);

                        expect(xy).toEqual([0, 267]);
                        expect(parseInt(style[!isRtl ? 'left' : 'right'], 10)).toBe(0);
                        expect(parseInt(style.top, 10)).toBe(267);
                    });

                    it('should constrain both if outside of accepted offsets (x = exceeds positive, y = ok)', function () {
                        createPositionable([10101, 55]);

                        expect(xy).toEqual([300, 55]);
                        expect(parseInt(style[!isRtl ? 'left' : 'right'], 10)).toBe(300);
                        expect(parseInt(style.top, 10)).toBe(55);
                    });
                });
            });
        }

        // renderTo config === (`true` to renderTo, `false` to .render())
        //
        // Render to an absolutely-positioned Panel and constrain the header...
        //
        createConstrainSuite({
            renderTo: true,
            positionAbsolute: true,
            constrainHeader: true
        });
        // .render()
        createConstrainSuite({
            renderTo: false,
            positionAbsolute: true,
            constrainHeader: true
        });
        // ... and RTL.
//        createConstrainSuite({
//            renderTo: true,
//            positionAbsolute: true,
//            constrainHeader: true,
//            isRtl: true
//        });
//        createConstrainSuite({
//            renderTo: false,
//            positionAbsolute: true,
//            constrainHeader: true,
//            isRtl: true
//        });

        //
        // Render to an relatively-positioned Panel and constrain the header...
        //
        createConstrainSuite({
            renderTo: true,
            positionAbsolute: false,
            constrainHeader: true
        });
        createConstrainSuite({
            renderTo: false,
            positionAbsolute: false,
            constrainHeader: true
        });
        // ... and RTL.
//        createConstrainSuite({
//            renderTo: true,
//            positionAbsolute: false,
//            constrainHeader: true,
//            isRtl: true
//        });
//        createConstrainSuite({
//            renderTo: false,
//            positionAbsolute: false,
//            constrainHeader: true,
//            isRtl: true
//        });

        //
        // Render to an absolutely-positioned Panel and constrain the entire component...
        //
        createConstrainSuite({
            renderTo: true,
            positionAbsolute: true,
            constrainHeader: false
        });
        createConstrainSuite({
            renderTo: false,
            positionAbsolute: true,
            constrainHeader: false
        });
        // ... and RTL.
//        createConstrainSuite({
//            renderTo: true,
//            positionAbsolute: true,
//            constrainHeader: false,
//            isRtl: true
//        });
//        createConstrainSuite({
//            renderTo: false,
//            positionAbsolute: true,
//            constrainHeader: false,
//            isRtl: true
//        });

        //
        // Render to an relatively-positioned Panel and constrain the entire component...
        //
        createConstrainSuite({
            renderTo: true,
            positionAbsolute: false,
            constrainHeader: false
        });
        createConstrainSuite({
            renderTo: false,
            positionAbsolute: false,
            constrainHeader: false
        });
        // ... and RTL.
//        createConstrainSuite({
//            renderTo: true,
//            positionAbsolute: false,
//            constrainHeader: false,
//            isRtl: true
//        });
//        createConstrainSuite({
//            renderTo: false,
//            positionAbsolute: false,
//            constrainHeader: false,
//            isRtl: true
//        });
    }());

    // This spec was copied from Container suite with minimal change;
    // recently a regression cropped up where Panel overrode
    // Container's getFocusEl and broke focus delegation
    // mechanism (https://sencha.jira.com/browse/EXTJS-15726).
    // Panels are important enough to warrant additional set of
    // defaultFocus tests so here we go.
    describe("defaultFocus", function() {
        function makeCt(cfg) {
            makePanel(Ext.apply({
                width: 100,
                height: 100
            }, cfg));
            
            ct = panel;
        }
        
        describe("with defaultFocus", function() {
            var fooCmp, barCmp;
            
            beforeEach(function() {
                makeCt({
                    items: [{
                        xtype: 'component',
                        html: 'foo'
                    }, {
                        xtype: 'component',
                        itemId: 'bar',
                        html: 'bar'
                    }]
                });
                
                fooCmp = ct.items.getAt(0);
                barCmp = ct.items.getAt(1);
            });
            
            it("should return foo", function() {
                ct.defaultFocus = 'component';
                
                var focusEl = ct.getFocusEl();
                
                expect(focusEl).toBe(fooCmp);
            });
            
            it("should return bar", function() {
                ct.defaultFocus = '#bar';
                
                var focusEl = ct.getFocusEl();
                
                expect(focusEl).toBe(barCmp);
            });
        });
        
        describe("no defaultFocus", function() {
            beforeEach(function() {
                makeCt();
            });
            
            it("should return targetEl when focusable", function() {
                ct.focusable = true;
                
                var focusEl = ct.getFocusEl();
                
                expect(focusEl).toBe(ct.getTargetEl());
            });
            
            it("should return undefined when not focusable", function() {
                var focusEl = ct.getFocusEl();
                
                expect(focusEl).toBe(undefined);
            });
        });
    });
    
    describe("defaultButton", function() {
        var pressKey = jasmine.pressKey,
            okSpy, cancelSpy, keydownSpy, fooInput, barInput, cancelButton, event;
        
        beforeEach(function() {
            okSpy = jasmine.createSpy('OK button handler');
            cancelSpy = jasmine.createSpy('Cancel button handler');
            keydownSpy = jasmine.createSpy('Panel keydown');
            
            makePanel({
                renderTo: undefined,
                x: 10,
                y: 10,
                width: 400,
                height: 400,
                referenceHolder: true,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'foo',
                    reference: 'fooInput'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'bar',
                    reference: 'barInput'
                }],
                defaultButton: 'okButton',
                buttons: [{
                    reference: 'okButton',
                    text: 'OK',
                    handler: okSpy
                }, {
                    reference: 'cancelButton',
                    text: 'Cancel',
                    handler: cancelSpy
                }]
            });
            
            fooInput = panel.lookupReference('fooInput');
            barInput = panel.lookupReference('barInput');
            cancelButton = panel.lookupReference('cancelButton');
            
            panel.on('boxready', function() {
                this.el.on('keydown', keydownSpy);
            });
            
            okSpy.andCallFake(function(btn, e) {
                event = e;
            });
            
            keydownSpy.andCallFake(function(e) {
                event = e;
            });
        });
        
        afterEach(function() {
            panel.el.un('keydown', keydownSpy);
            okSpy = cancelSpy = keydownSpy = fooInput = barInput = cancelButton = null;
            event = null;
        });
        
        describe("no defaultButton", function() {
            beforeEach(function() {
                panel.defaultButton = undefined;
                panel.render(Ext.getBody());
            });
            
            it("should not fire OK handler", function() {
                pressKey(fooInput, 'enter');
                
                waitForSpy(keydownSpy);
                
                runs(function() {
                    expect(okSpy).not.toHaveBeenCalled();
                });
            });
            
            it("should not have stopped the keydown event", function() {
                pressKey(barInput, 'enter');
                
                waitForSpy(keydownSpy);
                
                runs(function() {
                    expect(event.isStopped).toBeFalsy();
                });
            });
        });
        
        describe("with defaultButton", function() {
            beforeEach(function() {
                panel.render(Ext.getBody());
            });
            
            it("should fire OK handler in fooInput", function() {
                pressKey(fooInput, 'enter');
                
                waitForSpy(okSpy);
                
                runs(function() {
                    expect(okSpy).toHaveBeenCalled();
                });
            });
            
            it("should fire OK handler in barInput", function() {
                pressKey(barInput, 'enter');
                
                waitForSpy(okSpy);
                
                runs(function() {
                    expect(okSpy).toHaveBeenCalled();
                });
            });
            
            it("should not fire OK handler on Cancel button", function() {
                pressKey(cancelButton, 'enter');
                
                waitForSpy(cancelSpy);
                
                runs(function() {
                    expect(okSpy).not.toHaveBeenCalled();
                });
            });
            
            it("should have stopped the keydown event", function() {
                pressKey(fooInput, 'enter');
                
                waitForSpy(okSpy);
                
                runs(function() {
                    expect(event.isStopped).toBeTruthy();
                });
            });
            
            it("should not have reached main el keydown listener", function() {
                pressKey(barInput, 'enter');
                
                waitForSpy(okSpy);
                
                runs(function() {
                    expect(keydownSpy).not.toHaveBeenCalled();
                });
            });
        });
        
        describe("with defaultButton and defaultButtonTarget", function() {
            beforeEach(function() {
                panel.defaultButtonTarget = 'el';
                panel.render(Ext.getBody());
            });
            
            it("should fire OK handler in fooInput", function() {
                pressKey(fooInput, 'enter');
                
                waitForSpy(okSpy);
                
                runs(function() {
                    expect(okSpy).toHaveBeenCalled();
                });
            });
            
            it("should fire OK handler in barInput", function() {
                pressKey(barInput, 'enter');
                
                waitForSpy(okSpy);
                
                runs(function() {
                    expect(okSpy).toHaveBeenCalled();
                });
            });
            
            it("should NOT fire OK handler on Cancel button", function() {
                pressKey(cancelButton, 'enter');
                
                waitForSpy(cancelSpy);
                
                runs(function() {
                    expect(okSpy).not.toHaveBeenCalled();
                });
            });
            
            it("should have stopped the keydown event", function() {
                pressKey(fooInput, 'enter');
                
                waitForSpy(okSpy);
                
                runs(function() {
                    expect(event.isStopped).toBeTruthy();
                });
            });
        });
        
        describe("nested panel", function() {
            var nestedPanel, nestedInput, nestedOk, nestedCancel,
                nestedOkSpy, nestedCancelSpy;
            
            beforeEach(function() {
                nestedOkSpy = jasmine.createSpy('Nested OK handler');
                nestedCancelSpy = jasmine.createSpy('Nested Cancel handler');
                
                nestedPanel = panel.add({
                    xtype: 'panel',
                    title: 'nested',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Nested',
                        reference: 'nestedInput'
                    }],
                    buttons: [{
                        text: 'Nested OK',
                        reference: 'nestedOk',
                        handler: nestedOkSpy
                    }, {
                        text: 'Nested Cancel',
                        reference: 'nestedCancel',
                        handler: nestedCancelSpy
                    }]
                });
                
                nestedInput = panel.lookupReference('nestedInput');
                nestedOk = panel.lookupReference('nestedOk');
                nestedCancel = panel.lookupReference('nestedCancel');
                
                nestedOkSpy.andCallFake(function(btn, e) {
                    event = e;
                });
                
                nestedCancelSpy.andCallFake(function(btn, e) {
                    event = e;
                    
                    e.stopEvent();
                    
                    return false;
                });
            });
            
            afterEach(function() {
                nestedOkSpy = nestedCancelSpy = null;
                nestedInput = nestedOk = nestedCancel = null;
            });
            
            describe("no defaultButton config", function() {
                beforeEach(function() {
                    panel.render(Ext.getBody());
                });
                
                it("should fire outer OK handler on nested input", function() {
                    pressKey(nestedInput, 'enter');
                    
                    waitForSpy(okSpy);
                    
                    runs(function() {
                        expect(okSpy).toHaveBeenCalled();
                    });
                });
                
                it("should NOT fire outer OK handler on nested OK button", function() {
                    pressKey(nestedOk, 'enter');
                    
                    waitForSpy(nestedOkSpy);
                    
                    runs(function() {
                        expect(okSpy).not.toHaveBeenCalled();
                    });
                });
                
                it("should NOT fire outer OK handler on nested Cancel button", function() {
                    pressKey(nestedCancel, 'enter');
                    
                    waitForSpy(nestedCancelSpy);
                    
                    runs(function() {
                        expect(okSpy).not.toHaveBeenCalled();
                    });
                });
            });
            
            describe("with defaultButton config", function() {
                beforeEach(function() {
                    nestedPanel.defaultButton = 'nestedOk';
                    panel.render(Ext.getBody());
                });
                
                describe("on nested input", function() {
                    beforeEach(function() {
                        pressKey(nestedInput, 'enter');
                        
                        waitForSpy(nestedOkSpy);
                    });
                    
                    it("should fire nested OK handler", function() {
                        expect(nestedOkSpy).toHaveBeenCalled();
                    });
                    
                    it("should NOT fire outer OK handler", function() {
                        // Check that OUTER spy hasn't been fired;
                        // we can only get there if the above waitForSpy()
                        // didn't timeout
                        expect(okSpy).not.toHaveBeenCalled();
                    });
                    
                    it("should have stopped the event", function() {
                        expect(event.isStopped).toBeTruthy();
                    });
                    
                    it("should not have reached outer keydown handler", function() {
                        expect(keydownSpy).not.toHaveBeenCalled();
                    });
                });
                
                describe("on nested OK button", function() {
                    beforeEach(function() {
                        pressKey(nestedOk, 'enter');
                    
                        waitForSpy(nestedOkSpy);
                    });
                    
                    it("should fire nested OK handler", function() {
                        expect(nestedOkSpy).toHaveBeenCalled();
                    });
                    
                    it("should NOT fire outer OK handler", function() {
                        expect(okSpy).not.toHaveBeenCalled();
                    });
                    
                    it("should have stopped the event", function() {
                        expect(event.isStopped).toBeTruthy();
                    });
                    
                    it("should not have reached outer keydown handler", function() {
                        expect(keydownSpy).not.toHaveBeenCalled();
                    });
                });
                
                describe("on nested Cancel button", function() {
                    beforeEach(function() {
                        pressKey(nestedCancel, 'enter');
                        
                        waitForSpy(nestedCancelSpy);
                    });
                    
                    it("should fire nested Cancel handler", function() {
                        expect(nestedCancelSpy).toHaveBeenCalled();
                    });
                    
                    it("should NOT fire nested OK handler", function() {
                        expect(nestedOkSpy).not.toHaveBeenCalled();
                    });
                    
                    it("should NOT fire outer OK handler", function() {
                        expect(okSpy).not.toHaveBeenCalled();
                    });
                    
                    it("should have not reached outer keydown handler", function() {
                        expect(keydownSpy).not.toHaveBeenCalled();
                    });
                    
                    it("should have stopped the event", function() {
                        expect(event.isStopped).toBeTruthy();
                    });
                });
            });
        });
    });

    describe("docked items", function() {
        var a, b, c;

        function makeDockPanel(cfg) {
            cfg = Ext.apply({
                width: 600,
                height: 600,
                border: false,
                dockedItems: [{
                    xtype: 'component',
                    dock: 'top',
                    height: 50,
                    itemId: 'dockA'
                }, {
                    xtype: 'component',
                    dock: 'top',
                    height: 50,
                    itemId: 'dockB'
                }, {
                    xtype: 'component',
                    dock: 'top',
                    height: 50,
                    itemId: 'dockC'
                }]
            }, cfg);
            makePanel(cfg);
            a = panel.down('#dockA');
            b = panel.down('#dockB');
            c = panel.down('#dockC');
        }

        afterEach(function() {
            a = b = c = null;
        });

        describe("remove", function() {
            it("should forward calls to docked components to removeDocked", function() {
                makeDockPanel();
                var spy = spyOn(panel, 'removeDocked').andCallThrough();
                panel.remove(a);
                expect(spy.callCount).toBe(1);
                expect(spy.mostRecentCall.args[0]).toBe(a);
            });
        }); 

        describe("addDocked", function() {
            var d, e;

            beforeEach(function() {
                d = new Ext.Component({
                    dock: 'top',
                    height: 50,
                    itemId: 'dockD'
                });
                e = new Ext.Component({
                    dock: 'top',
                    height: 50,
                    itemId: 'dockE'
                });
            });

            afterEach(function() {
                d = e = Ext.destroy(d, e);
            });

            describe("single item", function() {
                describe("arg types", function() {
                    it("should accept a component instance", function() {
                        makeDockPanel();
                        panel.addDocked(d);
                        var items = panel.getDockedItems();
                        expect(items.length).toBe(4);
                        expect(Ext.Array.contains(items, d)).toBe(true);
                    });

                    it("should accept a component config", function() {
                        makeDockPanel();
                        panel.addDocked({
                            xtype: 'component',
                            itemId: 'foo'
                        });
                        var items = panel.getDockedItems();
                        expect(items.length).toBe(4);
                        expect(items[3].getItemId()).toBe('foo');
                    });
                });

                describe("position", function() {
                    it("should default to the end", function() {
                        makeDockPanel();
                        panel.addDocked(d);
                        expect(panel.getDockedItems()[3]).toBe(d);
                        panel.addDocked(e);
                        expect(panel.getDockedItems()[4]).toBe(e);
                    });

                    it("should be able to insert at the start", function() {
                        makeDockPanel();
                        panel.addDocked(d, 0);
                        expect(panel.getDockedItems()[0]).toBe(d);
                    });

                    it("should be able to insert into the collection", function() {
                        makeDockPanel();
                        panel.addDocked(d, 1);
                        expect(panel.getDockedItems()[1]).toBe(d);
                    });

                    it("should limit the index if it is larger than the index", function() {
                        makeDockPanel();
                        panel.addDocked(d, 100);
                        expect(panel.getDockedItems()[3]).toBe(d);
                    });
                });

                describe("return type", function() {
                    it("should return an array of the added item", function() {
                        makeDockPanel();
                        expect(panel.addDocked(d)).toEqual([d]);
                    });
                });

                describe("events/template methods", function() {
                    beforeEach(function() {
                        makeDockPanel();
                    });

                    it("should fire the dockedadd event and pass the container, item and index", function() {
                        var spy = jasmine.createSpy(),
                            args;

                        panel.on('dockedadd', spy);
                        panel.addDocked(d);
                        expect(spy.callCount).toBe(1);
                        args = spy.mostRecentCall.args;
                        expect(args[0]).toBe(panel);
                        expect(args[1]).toBe(d);
                        expect(args[2]).toBe(3);
                    });

                    it("should call the onAdded method on the item", function() {
                        var spy = spyOn(d, 'onAdded').andCallThrough(),
                            args;

                        panel.addDocked(d);
                        expect(spy.callCount).toBe(1);
                        args = spy.mostRecentCall.args;
                        expect(args[0]).toBe(panel);
                        expect(args[1]).toBe(3);
                        expect(args[2]).toBe(true);
                    });

                    it("should call onDockedAdd", function() {
                        var spy = spyOn(panel, 'onDockedAdd').andCallThrough();
                        panel.addDocked(d);
                        expect(spy.callCount).toBe(1);
                        expect(spy.mostRecentCall.args[0]).toBe(d);
                    });
                });

                describe("layout", function() {
                    beforeEach(function() {
                        makeDockPanel();
                    });

                    it("should execute a layout", function() {
                        expect(panel.body.getHeight()).toBe(450);
                        panel.addDocked(d);
                        expect(panel.body.getHeight()).toBe(400);
                    });

                    it("should only run a single layout", function() {
                        var before = panel.componentLayoutCounter;
                        panel.addDocked(d);
                        expect(panel.componentLayoutCounter).toBe(before + 1);
                    });
                });
            });

            describe("multiple items", function() {
                describe("arg types", function() {
                    it("should accept an array of component instance", function() {
                        makeDockPanel();
                        panel.addDocked([d, e]);
                        var items = panel.getDockedItems();
                        expect(items.length).toBe(5);
                        expect(Ext.Array.contains(items, d)).toBe(true);
                        expect(Ext.Array.contains(items, e)).toBe(true);
                    });

                    it("should accept an array of component configs", function() {
                        makeDockPanel();
                        panel.addDocked([{
                            xtype: 'component',
                            itemId: 'foo'
                        }, {
                            xtype: 'component',
                            itemId: 'bar'
                        }]);
                        var items = panel.getDockedItems();
                        expect(items.length).toBe(5);
                        expect(items[3].getItemId()).toBe('foo');
                        expect(items[4].getItemId()).toBe('bar');
                    });

                    it("should accept a mix of configs and components", function() {
                        makeDockPanel();
                        panel.addDocked([d, {
                            xtype: 'component',
                            itemId: 'foo'
                        }]);
                        var items = panel.getDockedItems();
                        expect(items.length).toBe(5);
                        expect(items[3]).toBe(d);
                        expect(items[4].getItemId()).toBe('foo');
                    });
                });

                describe("position", function() {
                    it("should default to the end", function() {
                        makeDockPanel();
                        panel.addDocked([d, e]);
                        expect(panel.getDockedItems()[3]).toBe(d);
                        panel.addDocked(e);
                        expect(panel.getDockedItems()[4]).toBe(e);
                    });

                    it("should be able to insert at the start", function() {
                        makeDockPanel();
                        panel.addDocked([d, e], 0);
                        expect(panel.getDockedItems()[0]).toBe(d);
                        expect(panel.getDockedItems()[1]).toBe(e);
                    });

                    it("should be able to insert into the collection", function() {
                        makeDockPanel();
                        panel.addDocked([d, e], 1);
                        expect(panel.getDockedItems()[1]).toBe(d);
                        expect(panel.getDockedItems()[2]).toBe(e);
                    });

                    it("should limit the index if it is larger than the index", function() {
                        makeDockPanel();
                        panel.addDocked([d, e], 100);
                        expect(panel.getDockedItems()[3]).toBe(d);
                        expect(panel.getDockedItems()[4]).toBe(e);
                    });
                });

                describe("return type", function() {
                    it("should return an array of the added items, but not the same reference", function() {
                        var add = [d, e],
                            result;

                        makeDockPanel();
                        result = panel.addDocked([d, e]);
                        expect(result).toEqual([d, e]);
                        expect(result).not.toBe(add);
                    });
                });

                describe("events/template methods", function() {
                    beforeEach(function() {
                        makeDockPanel();
                    });

                    describe("without position", function() {
                        it("should fire the dockedadd event and pass the container, item and index", function() {
                            var spy = jasmine.createSpy(),
                                args;

                            panel.on('dockedadd', spy);
                            panel.addDocked([d, e]);
                            expect(spy.callCount).toBe(2);

                            args = spy.calls[0].args;
                            expect(args[0]).toBe(panel);
                            expect(args[1]).toBe(d);
                            expect(args[2]).toBe(3);

                            args = spy.calls[1].args;
                            expect(args[0]).toBe(panel);
                            expect(args[1]).toBe(e);
                            expect(args[2]).toBe(4);
                        });

                        it("should call the onAdded method on the item", function() {
                            var dSpy = spyOn(d, 'onAdded').andCallThrough(),
                                eSpy = spyOn(e, 'onAdded').andCallThrough(),
                                args;

                            panel.addDocked([d, e]);

                            expect(dSpy.callCount).toBe(1);
                            args = dSpy.mostRecentCall.args;
                            expect(args[0]).toBe(panel);
                            expect(args[1]).toBe(3);
                            expect(args[2]).toBe(true);

                            expect(eSpy.callCount).toBe(1);
                            args = eSpy.mostRecentCall.args;
                            expect(args[0]).toBe(panel);
                            expect(args[1]).toBe(4);
                            expect(args[2]).toBe(true);
                        });

                        it("should call onDockedAdd", function() {
                            var spy = spyOn(panel, 'onDockedAdd').andCallThrough();
                            panel.addDocked([d, e]);
                            expect(spy.callCount).toBe(2);
                            expect(spy.calls[0].args[0]).toBe(d);
                            expect(spy.calls[1].args[0]).toBe(e);
                        });
                    });

                    describe("with position", function() {
                        it("should fire the dockedadd event and pass the container, item and index", function() {
                            var spy = jasmine.createSpy(),
                                args;

                            panel.on('dockedadd', spy);
                            panel.addDocked([d, e], 1);
                            expect(spy.callCount).toBe(2);

                            args = spy.calls[0].args;
                            expect(args[0]).toBe(panel);
                            expect(args[1]).toBe(d);
                            expect(args[2]).toBe(1);

                            args = spy.calls[1].args;
                            expect(args[0]).toBe(panel);
                            expect(args[1]).toBe(e);
                            expect(args[2]).toBe(2);
                        });

                        it("should call the onAdded method on the item", function() {
                            var dSpy = spyOn(d, 'onAdded').andCallThrough(),
                                eSpy = spyOn(e, 'onAdded').andCallThrough(),
                                args;

                            panel.addDocked([d, e], 1);

                            expect(dSpy.callCount).toBe(1);
                            args = dSpy.mostRecentCall.args;
                            expect(args[0]).toBe(panel);
                            expect(args[1]).toBe(1);
                            expect(args[2]).toBe(true);

                            expect(eSpy.callCount).toBe(1);
                            args = eSpy.mostRecentCall.args;
                            expect(args[0]).toBe(panel);
                            expect(args[1]).toBe(2);
                            expect(args[2]).toBe(true);
                        });

                        it("should call onDockedAdd", function() {
                            var spy = spyOn(panel, 'onDockedAdd').andCallThrough();
                            panel.addDocked([d, e], 1);
                            expect(spy.callCount).toBe(2);
                            expect(spy.calls[0].args[0]).toBe(d);
                            expect(spy.calls[1].args[0]).toBe(e);
                        });
                    });
                });

                describe("layout", function() {
                    beforeEach(function() {
                        makeDockPanel();
                    });

                    it("should execute a layout", function() {
                        expect(panel.body.getHeight()).toBe(450);
                        panel.addDocked([d, e]);
                        expect(panel.body.getHeight()).toBe(350);
                    });

                    it("should only run a single layout", function() {
                        var before = panel.componentLayoutCounter;
                        panel.addDocked([d, e]);
                        expect(panel.componentLayoutCounter).toBe(before + 1);
                    });
                });
            });
        });

        describe("removeDocked", function() {
            it("should remove the item from the dockedItems", function() {
                makeDockPanel();
                panel.removeDocked(b);
                var items = panel.getDockedItems();
                expect(items.length).toBe(2);
                expect(Ext.Array.contains(items, b)).toBe(false);
            });

            describe("return value", function() {
                it("should return the passed item", function() {
                    makeDockPanel();
                    expect(panel.removeDocked(a)).toBe(a);
                });

                it("should return the passed item when it is not contained in the docked items", function() {
                    var other = new Ext.Component();
                    makeDockPanel();
                    expect(panel.removeDocked(other)).toBe(other);
                    
                    other.destroy();
                });
            });

            describe("autoDestroy", function() {
                it("should not destroy with panel.autoDestroy=true & autoDestroy=false", function() {
                    makeDockPanel({
                        autoDestroy: true
                    });
                    panel.removeDocked(a, false);
                    expect(a.destroyed).not.toBe(true);
                    a.destroy();
                });

                it("should destroy with panel.autoDestroy=true & autoDestroy=true", function() {
                    makeDockPanel({
                        autoDestroy: true
                    });
                    panel.removeDocked(a, true);
                    expect(a.destroyed).toBe(true);
                });

                it("should not destroy with panel.autoDestroy=false & autoDestroy=false", function() {
                    makeDockPanel({
                        autoDestroy: false
                    });
                    panel.removeDocked(a, false);
                    expect(a.destroyed).not.toBe(true);
                    a.destroy();
                });

                it("should destroy with panel.autoDestroy=false & autoDestroy=true", function() {
                    makeDockPanel({
                        autoDestroy: true
                    });
                    panel.removeDocked(a, true);
                    expect(a.destroyed).toBe(true);
                });
            });

            describe("events/template methods", function() {
                beforeEach(function() {
                    makeDockPanel();
                });

                it("should fire the dockedremove method and pass the container and item", function() {
                    var spy = jasmine.createSpy(),
                        args;

                    panel.on('dockedremove', spy);
                    panel.removeDocked(a);
                    expect(spy.callCount).toBe(1);
                    args = spy.mostRecentCall.args;
                    expect(args[0]).toBe(panel);
                    expect(args[1]).toBe(a);
                }); 

                it("should call onRemoved on the item and pass the destroying flag", function() {
                    var spy = spyOn(a, 'onRemoved').andCallThrough();
                    panel.removeDocked(a);
                    expect(spy.callCount).toBe(1);
                    expect(spy.mostRecentCall.args[0]).toBe(true);
                });

                it("should call onDockedRemove on the panel and pass the item", function() {
                    var spy = spyOn(panel, 'onDockedRemove').andCallThrough();
                    panel.removeDocked(a);
                    expect(spy.callCount).toBe(1);
                    expect(spy.mostRecentCall.args[0]).toBe(a);
                });
            });

            describe("layout", function() {
                beforeEach(function() {
                    makeDockPanel();
                });

                it("should execute a layout", function() {
                    expect(panel.body.getHeight()).toBe(450);
                    panel.removeDocked(a);
                    expect(panel.body.getHeight()).toBe(500);
                });

                it("should only run a single layout", function() {
                    var before = panel.componentLayoutCounter;
                    panel.removeDocked(a);
                    expect(panel.componentLayoutCounter).toBe(before + 1);
                });
            });
        });
    });
    
    describe("ARIA", function() {
        var expectAriaAttr = jasmine.expectAriaAttr;
        
        function expectAria(attr, value) {
            jasmine.expectAriaAttr(panel, attr, value);
        }
        
        function expectNoAria(attr) {
            jasmine.expectNoAriaAttr(panel, attr);
        }
        
        function expectBodyAria(attr, value) {
            jasmine.expectAriaAttr(panel.body, attr, value);
        }
        
        function expectNoBodyAria(attr) {
            jasmine.expectNoAriaAttr(panel.body, attr);
        }
        
        describe("attributes", function() {
            describe("ariaEl", function() {
                beforeEach(function() {
                    makePanel();
                });
                
                it("should be main el", function() {
                    expect(panel.ariaEl).toBe(panel.el);
                });
            });
            
            describe("main el", function() {
                describe("static roles", function() {
                    beforeEach(function() {
                        makePanel();
                    });
                    
                    it("should have presentation role by default", function() {
                        expectAria('role', 'presentation');
                    });
                });
                
                describe("explicit widget role", function() {
                    describe("in general", function() {
                        beforeEach(function() {
                            makePanel({ ariaRole: 'foo' });
                        });
                        
                        it("should set el role to ariaRole", function() {
                            expectAria('role', 'foo');
                        });
                        
                        it("should not set ariaRole on the body el", function() {
                            expectBodyAria('role', 'presentation');
                        });
                        
                        it("should not have aria-expanded", function() {
                            expectNoAria('aria-expanded');
                        });
                    });
                    
                    describe("no header no title", function() {
                        beforeEach(function() {
                            makePanel({
                                ariaRole: 'throbbe'
                            });
                        });
                        
                        it("should not have aria-label", function() {
                            expectNoAria('aria-label');
                        });
                        
                        it("should not have aria-labelledby", function() {
                            expectNoAria('aria-labelledby');
                        });
                    });
                    
                    describe("no header with title", function() {
                        beforeEach(function() {
                            makePanel({
                                ariaRole: 'bar',
                                title: 'blerg',
                                header: false
                            });
                            
                            it("should not have aria-labelledby", function() {
                                expectNoAria('aria-labelledby');
                            });
                            
                            it("should have aria-label", function() {
                                expectAria('aria-label', 'blerg');
                            });
                        });
                    });
                    
                    describe("with header", function() {
                        beforeEach(function() {
                            makePanel({
                                ariaRole: 'baz',
                                title: 'frob'
                            });
                        });
                        
                        it("should have aria-labelledby", function() {
                            expectAria('aria-labelledby', panel.header.titleCmp.textEl.id);
                        });
                        
                        it("should not have aria-label", function() {
                            expectNoAria('aria-label');
                        });
                        
                        it("should have presentation role on the header with no tools", function() {
                            expectAriaAttr(panel.header, 'role', 'presentation');
                        });
                        
                        it("should have presentation role on titleCmp", function() {
                            expectAriaAttr(panel.header.titleCmp, 'role', 'presentation');
                        });
                    });
                });
                
                describe("region role", function() {
                    beforeEach(function() {
                        makePanel({
                            ariaRole: 'region',
                            title: 'foo'
                        });
                    });
                    
                    it("should have aria-labelledby", function() {
                        expectAria('aria-labelledby', panel.headingEl.id);
                    });
                    
                    it("should not have aria-label", function() {
                        expectNoAria('aria-label');
                    });
                });
                
                // This one is special with regards to aria-labelledby
                describe("tabpanel role", function() {
                    beforeEach(function() {
                        makePanel({
                            ariaRole: 'tabpanel',
                            title: 'foo'
                        });
                    });
                    
                    // TabPanel sets it
                    it("should not set aria-labelledby", function() {
                        expectNoAria('aria-labelledby');
                    });
                    
                    // This would get in the way
                    it("should not set aria-label", function() {
                        expectNoAria('aria-label');
                    });
                });
            });
            
            describe("body el", function() {
                describe("static roles", function() {
                    beforeEach(function() {
                        makePanel({
                            bodyAriaRenderAttributes: {
                                'aria-foo': 'bar'
                            }
                        });
                    });
                    
                    it("should have presentation role by default", function() {
                        expectBodyAria('role', 'presentation');
                    });
                    
                    it("should not render body ARIA attributes", function() {
                        expectNoBodyAria('aria-foo');
                    });
                });
                
                describe("widget roles", function() {
                    beforeEach(function() {
                        makePanel({
                            bodyAriaRole: 'frob',
                            bodyAriaRenderAttributes: {
                                'aria-qux': 'bonzo'
                            }
                        });
                    });
                    
                    it("should set role to bodyAriaRole", function() {
                        expectBodyAria('role', 'frob');
                    });
                    
                    it("should render body ARIA attributes", function() {
                        expectBodyAria('aria-qux', 'bonzo');
                    });
                    
                    it("should not set bodyAriaRole on the main el", function() {
                        expectAria('role', 'presentation');
                    });
                });
            });
            
            // The purpose of tool tests is to make sure the attribute mungung
            // we're doing for certain cases does not spread beyond these cases.
            // Look for Accordion in Panel to see more.
            describe("standard tools", function() {
                var closeTool, collapseTool, expandTool;
                
                beforeEach(function() {
                    makePanel({
                        title: 'foo',
                        closable: true,
                        collapsible: true,
                        animCollapse: false
                    });
                    
                    closeTool = panel.down('tool[type=close]');
                    collapseTool = panel.collapseTool;
                    expandTool = panel.expandTool;
                });
                
                afterEach(function() {
                    closeTool = collapseTool = expandTool = null;
                });
                
                describe("close tool", function() {
                    // Not tabbable here; panel header is a FocusableContainer!
                    it("should be focusable", function() {
                        expect(closeTool.el.isFocusable()).toBe(true);
                    });
                    
                    it("should have button role", function() {
                        expectAriaAttr(closeTool, 'role', 'button');
                    });
                    
                    it("should have aria-label", function() {
                        expectAriaAttr(closeTool, 'aria-label', 'Close panel');
                    });
                });
                
                describe("collapse tool", function() {
                    it("should be focusable", function() {
                        expect(collapseTool.el.isFocusable()).toBe(true);
                    });
                    
                    it("should have button role", function() {
                        expectAriaAttr(collapseTool, 'role', 'button');
                    });
                    
                    it("should have aria-label", function() {
                        expectAriaAttr(collapseTool, 'aria-label', 'Collapse panel');
                    });
                });
                
                describe("expand tool", function() {
                    beforeEach(function() {
                        panel.collapse();
                    });
                    
                    it("should be focusable", function() {
                        expect(expandTool.el.isFocusable()).toBe(true);
                    });
                    
                    it("should have button role", function() {
                        expectAriaAttr(expandTool, 'role', 'button');
                    });
                    
                    it("should have aria-label", function() {
                        expectAriaAttr(expandTool, 'aria-label', 'Expand panel');
                    });
                });
            });
        }); // attributes
        
        describe("regions", function() {
            describe("automagic ariaRole", function() {
                it("should work when isViewportBorderChild", function() {
                    makePanel({ isViewportBorderChild: true, title: 'bonzo' });
                    
                    expect(panel.ariaRole).toBe('region');
                });
                
                it("should not work when isViewportBorderChild and has ariaRole", function() {
                    makePanel({
                        isViewportBorderChild: true,
                        ariaRole: 'plugh',
                        title: 'xyzzy'
                    });
                    
                    expect(panel.ariaRole).toBe('plugh');
                });
                
                it("should warn when isViewportBorderChild && !title", function() {
                    spyOn(Ext.log, 'warn');
                    
                    makePanel({ isViewportBorderChild: true });
                    
                    var warn = Ext.log.warn.mostRecentCall.args[0];
                    
                    expect(warn).toMatch(/does not have a title/);
                });
                
                it("should warn when ariaRole == region && !title", function() {
                    spyOn(Ext.log, 'warn');
                    
                    makePanel({ ariaRole: 'region' });
                    
                    var warn = Ext.log.warn.mostRecentCall.args[0];
                    
                    expect(warn).toMatch(/does not have a title/);
                });
            });
            
            describe("headingEl", function() {
                describe("creation", function() {
                    it("should be created when isViewportBorderChild", function() {
                        makePanel({ isViewportBorderChild: true, title: 'throbbe' });
                        
                        expect(panel.headingEl).toBeDefined();
                    });
                    
                    it("should be created when ariaRole == region", function() {
                        makePanel({ ariaRole: 'region', title: 'foobaroo' });
                        
                        expect(panel.headingEl).toBeDefined();
                    });
                });
                
                describe("position and content", function() {
                    beforeEach(function() {
                        makePanel({
                            isViewportBorderChild: true,
                            title: 'frobbe'
                        });
                    });
                    
                    it("should be docked above the header", function() {
                        var dom = panel.el.dom.childNodes[0];
                        
                        expect(dom.getAttribute('role')).toBe('heading');
                    });
                    
                    it("should have innerHTML set to the title", function() {
                        expect(panel.headingEl.getHtml()).toBe('frobbe');
                    });
                    
                    it("should have innerHTML updated when title changes", function() {
                        panel.setTitle('vita voom');
                        
                        expect(panel.headingEl.getHtml()).toBe('vita voom');
                    });
                });
                
                describe("destruction", function() {
                    var headingEl;
                    
                    beforeEach(function() {
                        makePanel({
                            ariaRole: 'region',
                            title: 'blerg'
                        });
                        
                        headingEl = panel.headingEl;
                        
                        // The warning is expected
                        spyOn(Ext.log, 'warn');
                        
                        panel.setTitle(null);
                        panel.header = false;
                        panel.updateHeader();
                    });
                    
                    it("should be removed from docked items", function() {
                        var els = panel.el.query('[role=heading]');
                        
                        expect(els.length).toBe(0);
                    });
                    
                    it("should be destroyed", function() {
                        expect(headingEl.destroyed).toBe(true);
                    });
                    
                    it("should be nulled out", function() {
                        expect(panel.headingEl).toBe(null);
                    });
                });
            });
        }); // regions
        
        describe("state", function() {
            describe("aria-expanded", function() {
                function makeSuite(animate) {
                    describe("animCollapse: " + animate, function() {
                        describe("before rendering", function() {
                            beforeEach(function() {
                                makePanel({
                                    ariaRole: 'mymse',
                                    title: 'foo',
                                    collapsible: true,
                                    animCollapse: animate,
                                    renderTo: undefined
                                });
                            });
                            
                            describe("collapsed = false", function() {
                                beforeEach(function() {
                                    panel.collapsed = false;
                                });
                                
                                it("should set aria-expanded to true by default", function() {
                                    panel.render(Ext.getBody());
                                    
                                    expectAria('aria-expanded', 'true');
                                });
                                
                                it("should set aria-expanded to false after collapsing", function() {
                                    panel.collapse();
                                    panel.render(Ext.getBody());
                                    
                                    expectAria('aria-expanded', 'false');
                                });
                                
                                it("should set aria-expanded to true after expanding", function() {
                                    panel.collapse();
                                    panel.expand();
                                    panel.render(Ext.getBody());
                                    
                                    expectAria('aria-expanded', 'true');
                                });
                            });
                            
                            describe("collapsed = true", function() {
                                beforeEach(function() {
                                    panel.collapsed = true;
                                });
                                
                                it("should set aria-expanded to false by default", function() {
                                    panel.render(Ext.getBody());
                                    
                                    expectAria('aria-expanded', 'false');
                                });
                                
                                it("should set aria-expanded to true after expanding", function() {
                                    panel.expand();
                                    panel.render(Ext.getBody());
                                    
                                    expectAria('aria-expanded', 'true');
                                });
                                
                                it("should set aria-expanded to false after collapsing", function() {
                                    panel.expand();
                                    panel.collapse();
                                    panel.render(Ext.getBody());
                                    
                                    expectAria('aria-expanded', 'false');
                                });
                            });
                        });
                        
                        describe("after rendering", function() {
                            var collapseSpy, expandSpy;
                            
                            beforeEach(function() {
                                collapseSpy = jasmine.createSpy('collapse');
                                expandSpy = jasmine.createSpy('expand');
                                
                                makePanel({
                                    ariaRole: 'splurge',
                                    title: 'foo',
                                    collapsible: true,
                                    animCollapse: animate,
                                    listeners: {
                                        collapse: collapseSpy,
                                        expand: expandSpy
                                    }
                                });
                            });
                            
                            it("should set aria-expanded to true by default", function() {
                                expectAria('aria-expanded', 'true');
                            });
                            
                            it("should set aria-expanded to false after collapsing", function() {
                                runs(function() {
                                    panel.collapse();
                                });
                                
                                waitsForSpy(collapseSpy, 'collapse', 1000);
                                
                                runs(function() {
                                    expectAria('aria-expanded', 'false');
                                });
                            });
                            
                            it("should set aria-expanded to true after expanding", function() {
                                runs(function() {
                                    panel.collapse();
                                });
                                
                                waitsForSpy(collapseSpy, 'collapse', 1000);
                                
                                runs(function() {
                                    panel.expand();
                                });
                                
                                waitsForSpy(expandSpy, 'expand', 1000);
                                
                                runs(function() {
                                    expectAria('aria-expanded', 'true');
                                });
                            });
                        });
                    });
                }
                
                makeSuite(100);
                makeSuite(false);
            }); // aria-expanded
        }); // state

        describe('tab guards', function () {
            it('should contain tab guard elements with no dockedItems', function () {
                makePanel({
                    tabGuard: true,
                    width: 300
                });

                var children = panel.el.dom.childNodes;

                expect(children.length).toBe(3);

                expect(children[0].id).toBe(panel.tabGuardBeforeEl.id);
                expect(children[1].id).toBe(panel.body.id);
                expect(children[2].id).toBe(panel.tabGuardAfterEl.id);
            });

            it('should contain tab guard elements with header, tbar and bbar', function () {
                makePanel({
                    tabGuard: true,
                    width: 300,
                    title: 'Hello',
                    tbar: [{
                        xtype: 'component',
                        html: 'first'
                    }],
                    bbar: [{
                        xtype: 'component',
                        html: 'last'
                    }]
                });

                var children = panel.el.dom.childNodes;
                var docked = panel.dockedItems;

                expect(children.length).toBe(6);

                expect(children[0].id).toBe(panel.tabGuardBeforeEl.id);
                expect(children[1].id).toBe(panel.header.id);
                expect(children[1].id).toBe(docked.getAt(0).id);
                expect(children[2].id).toBe(docked.getAt(1).id);
                expect(children[3].id).toBe(panel.body.id);
                expect(children[4].id).toBe(docked.getAt(2).id);
                expect(children[5].id).toBe(panel.tabGuardAfterEl.id);
            });

            it('should contain tab guard elements with tbar and bbar', function () {
                makePanel({
                    tabGuard: true,
                    width: 300,
                    tbar: [{
                        xtype: 'component',
                        html: 'first'
                    }],
                    bbar: [{
                        xtype: 'component',
                        html: 'last'
                    }]
                });

                var children = panel.el.dom.childNodes;
                var docked = panel.dockedItems;

                expect(children.length).toBe(5);

                expect(children[0].id).toBe(panel.tabGuardBeforeEl.id);
                expect(children[1].id).toBe(docked.getAt(0).id);
                expect(children[2].id).toBe(panel.body.id);
                expect(children[3].id).toBe(docked.getAt(1).id);
                expect(children[4].id).toBe(panel.tabGuardAfterEl.id);
            });

            it('should contain tab guard elements with header adding tbar then bbar', function () {
                makePanel({
                    tabGuard: true,
                    width: 300,
                    title: 'Hello'
                });

                var children = panel.el.dom.childNodes;
                var docked = panel.dockedItems;

                expect(children.length).toBe(4);

                var tbar = panel.addDocked({
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        xtype: 'component',
                        html: 'first'
                    }]
                });

                var bbar = panel.addDocked({
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                        xtype: 'component',
                        html: 'last'
                    }]
                });

                expect(children.length).toBe(6);

                expect(children[0].id).toBe(panel.tabGuardBeforeEl.id);
                expect(children[1].id).toBe(panel.header.id);
                expect(children[1].id).toBe(docked.getAt(0).id);
                expect(children[2].id).toBe(docked.getAt(1).id);
                expect(children[2].id).toBe(tbar[0].id);
                expect(children[3].id).toBe(panel.body.id);
                expect(children[4].id).toBe(docked.getAt(2).id);
                expect(children[4].id).toBe(bbar[0].id);
                expect(children[5].id).toBe(panel.tabGuardAfterEl.id);
            });

            it('should contain tab guard elements with header adding bbar then tbar', function () {
                makePanel({
                    tabGuard: true,
                    width: 300,
                    title: 'Hello'
                });

                var children = panel.el.dom.childNodes;
                var docked = panel.dockedItems;

                expect(children.length).toBe(4);

                var bbar = panel.addDocked({
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                        xtype: 'component',
                        html: 'last'
                    }]
                });

                var tbar = panel.addDocked({
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        xtype: 'component',
                        html: 'first'
                    }]
                });

                expect(children.length).toBe(6);

                expect(children[0].id).toBe(panel.tabGuardBeforeEl.id);
                expect(children[1].id).toBe(panel.header.id);
                expect(children[1].id).toBe(docked.getAt(0).id);
                expect(children[2].id).toBe(docked.getAt(2).id);
                expect(children[2].id).toBe(tbar[0].id);
                expect(children[3].id).toBe(panel.body.id);
                expect(children[4].id).toBe(docked.getAt(1).id);
                expect(children[4].id).toBe(bbar[0].id);
                expect(children[5].id).toBe(panel.tabGuardAfterEl.id);
            });

            it('should contain tab guard elements with header adding all bars', function () {
                makePanel({
                    tabGuard: true,
                    width: 300,
                    title: 'Hello'
                });

                var children = panel.el.dom.childNodes;
                var docked = panel.dockedItems;

                expect(children.length).toBe(4);

                var bbar = panel.addDocked({
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                        xtype: 'component',
                        html: 'bottom'
                    }]
                });

                var rbar = panel.addDocked({
                    xtype: 'toolbar',
                    dock: 'right',
                    items: [{
                        xtype: 'component',
                        html: 'right'
                    }]
                });

                var lbar = panel.addDocked({
                    xtype: 'toolbar',
                    dock: 'left',
                    items: [{
                        xtype: 'component',
                        html: 'left'
                    }]
                });

                var tbar = panel.addDocked({
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        xtype: 'component',
                        html: 'top'
                    }]
                });

                expect(children.length).toBe(8);

                expect(children[0].id).toBe(panel.tabGuardBeforeEl.id);
                expect(children[1].id).toBe(panel.header.id);
                expect(children[1].id).toBe(docked.getAt(0).id);
                expect(children[2].id).toBe(docked.getAt(4).id);
                expect(children[2].id).toBe(tbar[0].id);
                expect(children[3].id).toBe(docked.getAt(3).id);
                expect(children[3].id).toBe(lbar[0].id);
                expect(children[4].id).toBe(panel.body.id);
                expect(children[5].id).toBe(docked.getAt(2).id);
                expect(children[5].id).toBe(rbar[0].id);
                expect(children[6].id).toBe(docked.getAt(1).id);
                expect(children[6].id).toBe(bbar[0].id);
                expect(children[7].id).toBe(panel.tabGuardAfterEl.id);
            });
        });
    }); // ARIA
});
