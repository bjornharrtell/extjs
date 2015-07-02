describe('Ext.layout.component.Dock', function(){

    var ct;

    afterEach(function(){
        Ext.destroy(ct);
        ct = null;
    });

    function makeCt(options, layoutOptions) {
        var failedLayouts = Ext.failedLayouts;

        ct = Ext.widget(Ext.apply({
                xtype: 'panel',
                renderTo: Ext.getBody()
            }, options));

        if (failedLayouts != Ext.failedLayouts) {
            expect('failedLayout=true').toBe('false');
        }
    }
    
    describe("shrink wrapping around docked items", function(){
        
        var top = 'top',
            left = 'left',
            u; // u to be used as undefined
            
        var makeDocked = function(dock, w, h, html) {
            var style = {};
            if (w) {
                style.width = w + 'px';
            }
            
            if (h) {
                style.height = h + 'px';
            }
            
            return new Ext.Component({
                dock: dock,
                shrinkWrap: true,
                style: style,
                html: html
            });
        };
    
        describe("width", function(){
            var makeDocker = function(options){
                return makeCt(Ext.apply({
                    shrinkWrap: true,
                    border: false,
                    bodyBorder: false,
                    shrinkWrapDock: 2
                }, options));    
            };
            
            it("should stretch the body width if the docked item is larger", function(){
                makeDocker({
                    dockedItems: [
                         makeDocked(top, 100, u)
                    ],
                    html: 'a'
                });
                expect(ct.getWidth()).toBe(100);
                expect(ct.body.getWidth()).toBe(100);
            });
            
            it("should stretch the docked width if the body is larger", function(){
                makeDocker({
                    dockedItems: [
                        makeDocked(top, u, u, 'a')
                    ],
                    html: '<div style="width: 100px;"></div>'
                });
                expect(ct.getWidth()).toBe(100);
                expect(ct.getDockedItems()[0].getWidth()).toBe(100);
            });
            
            it("should stretch other docked items to the size of the largest docked item if it is bigger than the body", function(){
                makeDocker({
                    dockedItems: [
                        makeDocked(top, 100, u),
                        makeDocked(top, u, u, 'b')
                    ],
                    html: 'a'
                });
                expect(ct.getDockedItems()[1].getWidth()).toBe(100);
            });
            
            it("should stretch all docked items to the size of the body if the body is largest", function(){
                makeDocker({
                    dockedItems: [
                        makeDocked(top, u, u, 'a'),
                        makeDocked(top, u, u, 'b')
                    ],
                    html: '<div style="width: 100px;"></div>'
                });
                expect(ct.getDockedItems()[0].getWidth()).toBe(100);
                expect(ct.getDockedItems()[1].getWidth()).toBe(100);
            });
            
            it("should stretch all items if the body and a single docked item are the largest & same size", function(){
                makeDocker({
                    dockedItems: [
                        makeDocked(top, 50, u, u),
                        makeDocked(top, 100, u, u)
                    ],
                    html: '<div style="width: 100px;"></div>'
                }); 
                expect(ct.getDockedItems()[0].getWidth()).toBe(100);
                expect(ct.getDockedItems()[1].getWidth()).toBe(100);   
            });
        });
        
        describe("height", function(){
            var makeDocker = function(options){
                return makeCt(Ext.apply({
                    shrinkWrap: true,
                    border: false,
                    bodyBorder: false,
                    shrinkWrapDock: 1
                }, options));    
            };
            
            it("should stretch the body height if the docked item is larger", function(){
                makeDocker({
                    dockedItems: [
                        makeDocked(left, u, 100)
                    ],
                    html: 'a'
                });
                expect(ct.getHeight()).toBe(100);
                expect(ct.body.getHeight()).toBe(100);
            });
            
            it("should stretch the docked height if the body is larger", function(){
                makeDocker({
                    dockedItems: [
                        makeDocked(left, u, u, 'a')
                    ],
                    html: '<div style="height: 100px;"></div>'
                });
                expect(ct.getHeight()).toBe(100);
                expect(ct.getDockedItems()[0].getHeight()).toBe(100);
            });
            
            it("should stretch other docked items to the size of the largest docked item if it is bigger than the body", function(){
                makeDocker({
                    dockedItems: [
                        makeDocked(left, u, 100),
                        makeDocked(left, u, u, 'b')
                    ],
                    html: 'a'
                });
                expect(ct.getDockedItems()[1].getHeight()).toBe(100);
            });
            
            it("should stretch all docked items to the size of the body if the body is largest", function(){
                makeDocker({
                    dockedItems: [
                        makeDocked(left, u, u, 'a'),
                        makeDocked(left, u, u, 'b')
                    ],
                    html: '<div style="height: 100px;"></div>'
                });
                expect(ct.getDockedItems()[0].getHeight()).toBe(100);
                expect(ct.getDockedItems()[1].getHeight()).toBe(100);
            });
            
            it("should stretch all items if the body and a single docked item are the largest & same size", function(){
                makeDocker({
                    dockedItems: [
                        makeDocked(left, u, 50, u),
                        makeDocked(left, u, 100, u)
                    ],
                    html: '<div style="height: 100px;"></div>'
                }); 
                expect(ct.getDockedItems()[0].getHeight()).toBe(100);
                expect(ct.getDockedItems()[1].getHeight()).toBe(100);   
            });
        });
        
        describe("combination", function(){
            var makeDocker = function(options){
                return makeCt(Ext.apply({
                    shrinkWrap: true,
                    border: false,
                    bodyBorder: false,
                    shrinkWrapDock: true
                }, options));    
            };
            
            it("should stretch the body in both dimensions if the docked items are larger", function(){
                makeDocker({
                    dockedItems: [
                        makeDocked(top, 100, u),
                        makeDocked(left, u, 75)
                    ],
                    html: 'a'
                });
                expect(ct.getWidth()).toBe(100);
                expect(ct.body.getWidth()).toBe(100);
                expect(ct.getHeight()).toBe(75);
                expect(ct.body.getHeight()).toBe(75);
            });
            
            it("should only stretch the width the dimension where the body is smaller", function(){
                makeDocker({
                    dockedItems: [
                        makeDocked(top, 100, u),
                        makeDocked(left, u, 75)
                    ],
                    html: '<div style="width: 50px; height: 100px;">'
                });
                expect(ct.getWidth()).toBe(100);
                expect(ct.body.getWidth()).toBe(100);
                expect(ct.getHeight()).toBe(100);
                expect(ct.body.getHeight()).toBe(100);
                expect(ct.getDockedItems()[1].getHeight()).toBe(100);
            });
            
            it("should only stretch the height the dimension where the body is smaller", function(){
                makeDocker({
                    dockedItems: [
                        makeDocked(top, 100, u),
                        makeDocked(left, u, 75)
                    ],
                    html: '<div style="width: 200px; height: 50px;">'
                });
                expect(ct.getHeight()).toBe(75);
                expect(ct.body.getHeight()).toBe(75);
                expect(ct.getWidth()).toBe(200);
                expect(ct.body.getWidth()).toBe(200);
                expect(ct.getDockedItems()[0].getWidth()).toBe(200);
            });
            
            it("should not stretch the body if neither docked item is bigger", function(){
                makeDocker({
                    dockedItems: [
                        makeDocked(top, 100, u),
                        makeDocked(left, u, 75)
                    ],
                    html: '<div style="width: 200px; height: 100px;">'
                });
                expect(ct.getWidth()).toBe(200);
                expect(ct.body.getWidth()).toBe(200);
                expect(ct.getHeight()).toBe(100);
                expect(ct.body.getHeight()).toBe(100);
                expect(ct.getDockedItems()[0].getWidth()).toBe(200);
                expect(ct.getDockedItems()[1].getHeight()).toBe(100);
            });
        });
        
        describe("min/max constraints", function(){
            describe("width", function(){
                var makeDocker = function(options){
                    return makeCt(Ext.apply({
                        shrinkWrap: true,
                        border: false,
                        bodyBorder: false,
                        shrinkWrapDock: 2
                    }, options));    
                };
                
                it("should constrain to a minWidth", function(){
                    makeDocker({
                        minWidth: 200,
                        dockedItems: [
                            makeDocked(top, 100, u)
                        ]
                    });    
                    expect(ct.getWidth()).toBe(200);
                    expect(ct.getDockedItems()[0].getWidth()).toBe(200);
                });
                
                it("should constrain to a maxWidth", function(){
                    makeDocker({
                        maxWidth: 100,
                        dockedItems: [
                            makeDocked(top, 200, u)
                        ]
                    });    
                    expect(ct.getWidth()).toBe(100);
                    expect(ct.getDockedItems()[0].getWidth()).toBe(100);
                });
            });
            
            describe("height", function(){
                var makeDocker = function(options){
                    return makeCt(Ext.apply({
                        shrinkWrap: true,
                        border: false,
                        bodyBorder: false,
                        shrinkWrapDock: 1
                    }, options));    
                };
                
                it("should constrain to a minHeight", function(){
                    makeDocker({
                        minHeight: 200,
                        dockedItems: [
                            makeDocked(left, u, 100)
                        ]
                    });    
                    expect(ct.getHeight()).toBe(200);
                    expect(ct.getDockedItems()[0].getHeight()).toBe(200);
                });
                
                it("should constrain to a maxWidth", function(){
                    makeDocker({
                        maxHeight: 100,
                        dockedItems: [
                            makeDocked(left, u, 200)
                        ]
                    });    
                    expect(ct.getHeight()).toBe(100);
                    expect(ct.getDockedItems()[0].getHeight()).toBe(100);
                });
            });
            
            describe("combination", function(){
                var makeDocker = function(options){
                    return makeCt(Ext.apply({
                        shrinkWrap: true,
                        border: false,
                        bodyBorder: false,
                        shrinkWrapDock: true
                    }, options));    
                };
                
                it("should constrain a minHeight & maxWidth", function(){
                    makeDocker({
                        minHeight: 100,
                        maxWidth: 100,
                        dockedItems: [
                            makeDocked(top, 200, u),
                            makeDocked(left, u, 50)
                        ]
                    });  
                    expect(ct.getWidth()).toBe(100);  
                    expect(ct.getHeight()).toBe(100);
                    expect(ct.getDockedItems()[0].getWidth()).toBe(100);
                    expect(ct.getDockedItems()[1].getHeight()).toBe(100);
                });
                
                it("should constrain a maxHeight & minWidth", function(){
                    makeDocker({
                        maxHeight: 100,
                        minWidth: 100,
                        dockedItems: [
                            makeDocked(top, 50, u),
                            makeDocked(left, u, 200)
                        ]
                    });  
                    expect(ct.getWidth()).toBe(100);  
                    expect(ct.getHeight()).toBe(100);
                    expect(ct.getDockedItems()[0].getWidth()).toBe(100);
                    expect(ct.getDockedItems()[1].getHeight()).toBe(100);
                });
                
                it("should constrain a minHeight and minWidth", function() {
                    makeDocker({
                        minHeight: 100,
                        minWidth: 100,
                        dockedItems: [
                            makeDocked(top, 50, u),
                            makeDocked(left, u, 50)
                        ]
                    });  
                    expect(ct.getWidth()).toBe(100);  
                    expect(ct.getHeight()).toBe(100);
                    expect(ct.getDockedItems()[0].getWidth()).toBe(100);
                    expect(ct.getDockedItems()[1].getHeight()).toBe(100);
                });
                
                it("should constrain a maxHeight and maxWidth", function() {
                    makeDocker({
                        maxHeight: 100,
                        maxWidth: 100,
                        dockedItems: [
                            makeDocked(top, 200, u),
                            makeDocked(left, u, 200)
                        ]
                    });  
                    expect(ct.getWidth()).toBe(100);  
                    expect(ct.getHeight()).toBe(100);
                    expect(ct.getDockedItems()[0].getWidth()).toBe(100);
                    expect(ct.getDockedItems()[1].getHeight()).toBe(100);
                });
            });
        });
        
    });

    describe('interaction within box layout', function(){
        it('should handle stretchmax and minHeight together', function(){
            makeCt({
                    width: 100,
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'stretchmax'
                    },
                    items: [{
                        xtype: 'panel',
                        border: false,
                        items: {
                            xtype: 'component',
                            width: 20,
                            height: 20,
                            style: 'background-color: red'
                        },
                        dockedItems: [{
                            xtype: 'component',
                            height: 20,
                            dock: 'bottom',
                            style: 'background-color: blue'
                        }],
                        minHeight: 100
                    }, {
                        xtype: 'component',
                        style: 'background-color: yellow',
                        height: 200,
                        width: 20
                    }]
                });

            expect(ct).toHaveLayout({
                el: { w: 100, h: 200 },
                items: {
                    0: {
                        el: { xywh: '0 0 20 200' },
                        items: {
                            0: { el: { xywh: '0 0 20 20' } }
                        },
                        dockedItems: {
                            0: { el: { xywh: '0 180 20 20' } }
                        }
                    },
                    1: { el: { xywh: '20 0 20 200' } }
                }
            });
        });
    });
});
