// getFrameInfo spec can't be run in opera because opera will not read invalid values
// from the CSS font-family property that is used to convey frame dimensions.
if (!Ext.isOpera) {
    Ext.require('Ext.Component');
    
    Ext.onReady(function(){
        describe('Ext.util.Renderable', function(){

            describe('getFrameInfo', function() {
                var comp,
                    styleEl;

                afterEach(function () {
                    Ext.destroy(comp);
                    comp = null;
                    if (styleEl) {
                        styleEl.destroy();
                        styleEl = null;
                    }
                });

                function createComp (framing) {
                    var supportsBorderRadius = Ext.supports.CSS3BorderRadius,
                        CSS = Ext.util.CSS;

                    CSS.createStyleSheet(
                        '.style-proxy { font-family: ' + framing + ' }',
                        'renderable-test-stylesheet'
                    );

                    Ext.supports.CSS3BorderRadius = false;

                    styleEl = Ext.getBody().createChild({
                        cls: 'style-proxy'
                    });

                    comp = new Ext.Component({
                        frame: true,
                        getStyleProxy: function () {
                            return styleEl;
                        }
                    });
                    comp.getFrameInfo();

                    CSS.removeStyleSheet('renderable-test-stylesheet');
                    Ext.supports.CSS3BorderRadius = supportsBorderRadius;
                }

                it('should return framing info', function() {
                    createComp('dh-1-2-3-4');

                    var frameInfo = comp.frameSize;

                    expect(frameInfo.table).toBe(false);
                    expect(frameInfo.vertical).toBe(false);

                    expect(frameInfo.top).toBe(1);
                    expect(frameInfo.right).toBe(2);
                    expect(frameInfo.bottom).toBe(3);
                    expect(frameInfo.left).toBe(4);

                    expect(frameInfo.width).toBe(6);
                    expect(frameInfo.height).toBe(4);
                });

            }); // getFrameInfo

            describe('Using existing el', function() {
                var viewport,
                    previousNodes;

                beforeEach(function() {
                    // The content of the body is being checked by this test so we have to empty it
                    var n = document.body.childNodes,
                        len = n.length,
                        i;

                    // Temporarily pull all content out of the document.
                    // We need to put it back in case any of it is being left erroneously to be picked up by Jasmine
                    previousNodes = document.createDocumentFragment();
                    for (i = 0; i < len; i++) {
                        previousNodes.appendChild(n[0]);
                    }
                });
                afterEach(function() {
                    viewport.destroy();
                    
                    // Restore previous state of document
                    document.body.appendChild(previousNodes);
                });
                it('should incorprate existing DOM into the Component tree', function() {
                    Ext.getBody().createChild({
                        tag: 'div',
                        id: 'existing-element',
                        cn: {
                            tag: 'ul',
                            cn: [{
                                tag: 'li',
                                html: '<a href="http://www.sencha.com">Sencha</a>'
                            }, {
                                tag: 'li',
                                html: '<a href="http://www.google.com">Google</a>'
                            }]
                        }
                    });

                    viewport = new Ext.container.Viewport({
                        layout: 'border',
                        items: [{
                            region: 'north',
                            xtype: 'component',
                            el: 'existing-element'
                        }, {
                            xtype: 'panel',
                            id: 'test-panel',
                            region: 'center',
                            html: "test"
                        }]
                    });
                    // Compare to known, correct DOM structure without possibly variable style and class and role and data-ref attributes
                    expect(viewport.el.dom.innerHTML.replace(/\s*class="[^"]*"/g, '').replace(/\s*style="[^"]*"/g, '').replace(/\s*role="[^"]*"/g, '').replace(/\s*data-ref="[^"]*"/g, '').replace(/\s{2,}/g, ' ')).toBe('<div id="existing-element"><ul><li><a href="http://www.sencha.com">Sencha</a></li><li><a href="http://www.google.com">Google</a></li></ul></div><div id="test-panel"><div id="test-panel-body"><div id="test-panel-outerCt"><div id="test-panel-innerCt">test</div></div></div></div>');
                });
            });
        });
    });
}