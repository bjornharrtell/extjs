describe('Ext.overrides.dom.Element', function() {
    var E = Ext.dom.Element,
        disableableTags = {
            BUTTON: true,
            INPUT: true,
            SELECT: true,
            TEXTAREA: true,
            OPTGROUP: true,
            OPTION: true,
            FIELDSET: true
        },
        topEl, el, dom;
    
    function createElement(markup, selector) {
        if (Ext.isArray(markup)) {
            markup = markup.join('');
        }
        
        topEl = Ext.dom.Helper.insertFirst(Ext.getBody(), markup, true);
        
        el = selector ? topEl.down(selector) : topEl;
        dom = el.dom;
    }
    
    // In IE, focus events are asynchronous so we often have to wait
    // after attempting to focus something. Otherwise tests will fail.
    function waitForFocus(el, desc, timeout) {
        var dom = el.isElement ? el.dom : el;
        
        desc    = desc    || dom.id;
        timeout = timeout || 100;
        
        waitsFor(
            function() { return Ext.Element.getActiveElement() === dom },
            desc + ' to focus',
            timeout
        );
    }
    
    function focusAndExpect(el, shouldBeFocused) {
        runs(function() {
            el.focus();
        });
        
        if (shouldBeFocused) {
            waitForFocus(el);
        }
        else {
            // If we're expecting an element *not* to be focused,
            // we can't use waitsFor() because its condition will
            // never be met and the spec will fail without reaching
            // the actual expectation. So we just wait.
            waits(10);
        }
        
        runs(function() {
            var have = Ext.Element.getActiveElement(),
                want = !shouldBeFocused ? document.body
                     : el.isElement     ? el.dom
                     :                    el
                     ;
            
            expect(have).toBe(want);
        });
    }
    
    afterEach(function() {
        if (topEl) {
            topEl.destroy();
        }
        else if (el) {
            el.destroy();
        }

        topEl = el = dom = null;
    });
    
    describe("focusables", function() {
        function createFocusableSpecs(name, beforeFn, wantFocusable) {
            return describe(name, function() {
                beforeEach(beforeFn || function() {});
                
                it("isFocusable should return " + wantFocusable, function() {
                    expect(el.isFocusable()).toBe(wantFocusable);
                });
                
                it("element should " + (wantFocusable ? "" : "not ") + "focus", function() {
                    focusAndExpect(el, wantFocusable);
                });
            });
        }
        
        function createStandardSuite(wantFocusable) {
            createFocusableSpecs(
                "with tabIndex < 0",
                function() { dom.setAttribute('tabindex', -1) },
                wantFocusable
            );
            
            createFocusableSpecs(
                "with tabIndex = 0",
                function() { dom.setAttribute('tabindex', 0) },
                wantFocusable
            );
            
            createFocusableSpecs(
                "with tabIndex > 0",
                function() { dom.setAttribute('tabindex', 1) },
                wantFocusable
            );
        }
        
        function createVisibilitySuites() {
            function createVisibilitySpecs(mode) {
                var realMode = Ext.Element[mode];
            
                return describe("hidden with mode: " + mode, function() {
                    beforeEach(function() {
                        el.setVisibilityMode(realMode);
                        el.setVisible(false);
                    });
                    
                    // When an element is hidden it should not be focusable,
                    // so we always pass `false` here
                    createStandardSuite(false);
                });
            }
            
            createVisibilitySpecs('VISIBILITY');
            createVisibilitySpecs('DISPLAY');
            createVisibilitySpecs('OFFSETS');
        }
                    
        describe("isFocusable", function() {
            describe("absolutely non-focusable elements", function() {
                function createSuite(name, elConfig) {
                    return describe(name, function() {
                        beforeEach(function() {
                            createElement(elConfig);
                        });
                        
                        createFocusableSpecs("with no tabIndex", null, false);
                        
                        createStandardSuite(false);
                        
                        createVisibilitySuites();
                    });
                }
                
                createSuite('hidden input', { tag: 'input', type: 'hidden' });
            });
            
            describe("naturally focusable elements", function() {
                function createSuite(name, elConfig) {
                    return describe(name, function() {
                        beforeEach(function() {
                            createElement(elConfig);
                        });
                        
                        describe("no special attributes", function() {
                            it("is true with no tabIndex on " + name, function() {
                                expect(el.isFocusable()).toBe(true);
                            });
                        
                            it("is true for " + name + " with tabIndex = 0", function() {
                                dom.tabIndex = 0;
                        
                                expect(el.isFocusable()).toBe(true);
                            });
                        
                            it("is true for " + name + " with tabIndex > 0", function() {
                                dom.tabIndex = 42;
                        
                                expect(el.isFocusable()).toBe(true);
                            });
                        
                            it("is true for " + name + " with tabIndex < 0", function() {
                                dom.tabIndex = -100;
                        
                                expect(el.isFocusable()).toBe(true);
                            });
                        
                            createVisibilitySuites();
                        });
                        
                        if ( disableableTags[ (elConfig.tag || 'div').toUpperCase() ] ) {
                            describe("disabled=true " + name, function() {
                                beforeEach(function() {
                                    dom.setAttribute('disabled', true);
                                });
                                
                                it("is false with no tabIndex", function() {
                                    expect(el.isFocusable()).toBe(false);
                                });
                                
                                it("is false with tabIndex < 0", function() {
                                    dom.tabIndex = -42;
                                    
                                    expect(el.isFocusable()).toBe(false);
                                });
                                
                                it("is false with tabIndex = 0", function() {
                                    dom.setAttribute('tabindex', 0);
                                    
                                    expect(el.isFocusable()).toBe(false);
                                });
                                
                                it("is false with tabIndex > 0", function() {
                                    dom.tabIndex = 42;
                                    
                                    expect(el.isFocusable()).toBe(false);
                                });
                                
                                // disabled and invisible should not be focusable
                                createVisibilitySuites();
                            });
                        }
                        
                        describe("editable " + name, function() {
                            beforeEach(function() {
                                dom.setAttribute('contenteditable', true);
                            });
                            
                            it("is true for " + name + " with no tabIndex", function() {
                                expect(el.isFocusable()).toBeTruthy();
                            });
                            
                            it("is true for " + name + " with tabIndex < 0", function() {
                                dom.tabIndex = -1;
                            
                                expect(el.isFocusable()).toBeTruthy();
                            });
                            
                            it("is true for " + name + " with tabIndex = 0", function() {
                                dom.tabIndex = 0;
                                
                                expect(el.isFocusable()).toBeTruthy();
                            });
                            
                            it("is true for " + name + " with tabIndex > 0", function() {
                                dom.tabIndex = 1;
                                
                                expect(el.isFocusable()).toBeTruthy();
                            });
                            
                            // editable but invisible should not be focusable
                            createVisibilitySuites();
                        });
                    });
                }

                createSuite('anchor with href', { tag: 'a', href: '#' });
                
                if (!Ext.isIE9m) {
                    createSuite('link with href', {
                        tag: 'link',
                        href: '#',
                        style: {
                            display: 'block'
                        }
                    });
                }
                
                createSuite('button', { tag: 'button' });
                createSuite('iframe', { tag: 'iframe' });
                createSuite('input', { tag: 'input' });
                createSuite('select', { tag: 'select', cn: [{ tag: 'option', value: 'foo' }] });
                createSuite('textarea', { tag: 'textarea' });
                
                // In IE8, <embed> element cleanup fails for some reason, or maybe
                // just happens with a delay but that is enough to fail the tests
                // with "document.body contains childNodes" error.
                if (!Ext.isIE8) {
                    createSuite('embed', {
                        tag: 'embed',
                        height: 100,
                        width: 100,
                        type: 'image/gif',
                        src: 'resources/images/foo.gif'
                    });
                }
                
                createSuite('object', {
                    tag: 'object',
                    style: 'height: 100px; width: 100px',
                    type: 'image/gif',
                    data: 'resources/images/foo.gif'
                });
            });
            
            if (Ext.isIE) {
                describe("documentElement", function() {
                    it("should report as focusable", function() {
                        var focusable = Ext.fly(document.documentElement).isFocusable();
                        
                        expect(focusable).toBe(true);
                    });
                });
            }
            
            describe("non-naturally focusable elements", function() {
                function createSuite(name, elConfig, selector) {
                    return describe(name, function() {
                        beforeEach(function() {
                            createElement(elConfig, selector);
                        });
                        
                        describe("no special attributes", function() {
                            it("is false with no tabIndex", function() {
                                expect(el.isFocusable()).toBe(false);
                            });
                        
                            it("is true with tabIndex < 0", function() {
                                dom.setAttribute('tabindex', '-1');
                            
                                expect(el.isFocusable()).toBe(true);
                            });
                        
                            it("is true with tabIndex = 0", function() {
                                dom.tabIndex = 0;
                            
                                expect(el.isFocusable()).toBe(true);
                            });
                        
                            it("is true with tabIndex > 0", function() {
                                dom.setAttribute('tabindex', 10);
                            
                                expect(el.isFocusable()).toBe(true);
                            });
                        
                            createVisibilitySuites();
                        });
                        
                        describe("editable " + name, function() {
                            beforeEach(function() {
                                dom.setAttribute('contenteditable', true);
                            });
                            
                            it("is true with no tabIndex", function() {
                                expect(el.isFocusable()).toBe(true);
                            });
                        
                            it("is true with tabIndex < 0", function() {
                                dom.tabIndex = -1;
                            
                                expect(el.isFocusable()).toBe(true);
                            });
                        
                            it("is true with tabIndex = 0", function() {
                                dom.tabIndex = 0;
                                
                                expect(el.isFocusable()).toBe(true);
                            });
                            
                            it("is true with tabIndex > 0", function() {
                                dom.tabIndex = 1;
                                
                                expect(el.isFocusable()).toBe(true);
                            });
                            
                            // editable but invisible should not be focusable
                            createVisibilitySuites();
                        });
                    });
                }

                createSuite('anchor w/o href', { tag: 'a' });
                createSuite('div', { tag: 'div' });
                createSuite('span', { tag: 'span' });
                createSuite('p', { tag: 'p' });
                createSuite('ul li', { tag: 'ul', cn: [{ tag: 'li' }] }, 'li');
                createSuite('ol li', { tag: 'ol', cn: [{ tag: 'li' }] }, 'li' );
                createSuite('img', { tag: 'img' });
                createSuite('td', {
                    tag: 'table',
                    cn: [{
                        tag: 'tr',
                        cn: [{
                            tag: 'td',
                            html: '&nbsp;'
                        }]
                    }]
                }, 'td');
            });
        });
    });
    
    describe("tabbables", function() {
        function createVisibilitySuites() {
            function createSuite(mode) {
                var realMode = Ext.Element[mode];
            
                return describe("hidden with mode: " + mode, function() {
                    beforeEach(function() {
                        el.setVisibilityMode(realMode);
                        el.setVisible(false);
                    });
                
                    it("is false with tabIndex < 0", function() {
                        el.set({ tabindex: -1 });
                    
                        expect(el.isTabbable()).toBe(false);
                    });
                
                    it("is false with tabIndex = 0", function() {
                        el.set({ tabindex: 0 });
                    
                        expect(el.isTabbable()).toBe(false);
                    });
                
                    it("is false with tabIndex > 0", function() {
                        el.set({ tabindex: 1 });
                    
                        expect(el.isTabbable()).toBe(false);
                    });
                });
            }
            
            createSuite('VISIBILITY');
            createSuite('DISPLAY');
            createSuite('OFFSETS');
        }
        describe("isTabbable", function() {
            describe("naturally non-tabbable elements", function() {
                function createSuite(name, elConfig) {
                    return describe(name, function() {
                        beforeEach(function() {
                            createElement(elConfig);
                        });
                        
                        it("should be non-tabbable naturally", function() {
                            expect(el.isTabbable()).toBeFalsy();
                        });
                        
                        it("should be non-tabbable with tabIndex < 0", function() {
                            dom.setAttribute('tabindex', -1);
                            
                            expect(el.isTabbable()).toBeFalsy();
                        });
                        
                        it("should be non-tabbable with tabIndex = 0", function() {
                            dom.setAttribute('tabindex', 0);
                            
                            expect(el.isTabbable()).toBeFalsy();
                        });
                        
                        it("should be non-tabbable with tabIndex > 0", function() {
                            dom.setAttribute('tabindex', 1);
                            
                            expect(el.isTabbable()).toBeFalsy();
                        });
                        
                        it("should be non-tabbable with contentEditable", function() {
                            dom.setAttribute('tabindex', 0);
                            dom.setAttribute('contenteditable', true);
                            
                            expect(el.isTabbable()).toBeFalsy();
                        });
                        
                        createVisibilitySuites();
                    });
                }
                
                createSuite('hidden input', { tag: 'input', type: 'hidden' });
            });
            
            describe("naturally tabbable elements", function() {
                function createSuite(name, elConfig) {
                    return describe(name, function() {
                        beforeEach(function() {
                            createElement(elConfig);
                        });
                        
                        describe("no special attributes", function() {
                            it("is true with no tabIndex", function() {
                                expect(el.isTabbable()).toBe(true);
                            });
                            
                            it("is false with tabIndex < 0", function() {
                                dom.tabIndex = -100;
                                
                                expect(el.isTabbable()).toBe(false);
                            });
                            
                            it("is true with tabIndex = 0", function() {
                                dom.tabIndex = 0;
                                
                                expect(el.isTabbable()).toBe(true);
                            });
                            
                            it("is true with tabIndex > 0", function() {
                                dom.tabIndex = 42;
                                
                                expect(el.isTabbable()).toBe(true);
                            });
                            
                            createVisibilitySuites();
                        });
                    
                        if ( disableableTags[ (elConfig.tag || 'div').toUpperCase() ] ) {
                            describe("disabled=true " + name, function() {
                                beforeEach(function() {
                                    dom.setAttribute('disabled', true);
                                });
                                
                                it("is false with no tabIndex", function() {
                                    expect(el.isTabbable()).toBe(false);
                                });
                                
                                it("is false for disabled " + name + " with tabIndex < 0", function() {
                                    dom.tabIndex = -42;
                                    
                                    expect(el.isTabbable()).toBe(false);
                                });
                                
                                it("is false with tabIndex = 0", function() {
                                    dom.setAttribute('tabindex', 0);
                                    
                                    expect(el.isTabbable()).toBe(false);
                                });
                                
                                it("is false with tabIndex > 0", function() {
                                    dom.tabIndex = 42;
                        
                                    expect(el.isTabbable()).toBe(false);
                                });
                                
                                // disabled and invisible should not be tabbable
                                createVisibilitySuites();
                            });
                        }
                        
                        describe("editable " + name, function() {
                            beforeEach(function() {
                                dom.setAttribute('contenteditable', true);
                            });
                            
                            it("is true with no tabIndex", function() {
                                expect(el.isTabbable()).toBeTruthy();
                            });
                        
                            it("is false with tabIndex < 0", function() {
                                dom.tabIndex = -1;
                            
                                expect(el.isTabbable()).toBeFalsy();
                            });
                        
                            it("is true with tabIndex = 0", function() {
                                dom.tabIndex = 0;
                                
                                expect(el.isTabbable()).toBeTruthy();
                            });
                            
                            it("is true with tabIndex > 0", function() {
                                dom.tabIndex = 1;
                                
                                expect(el.isTabbable()).toBeTruthy();
                            });
                            
                            // editable and invisible should not be tabbable
                            createVisibilitySuites();
                        });
                    });
                }
            
                createSuite('anchor with href', { tag: 'a', href: '#' });
                createSuite('button', { tag: 'button' });
                createSuite('iframe', { tag: 'iframe' });
                createSuite('input', { tag: 'input' });
                createSuite('select', { tag: 'select', cn: [{ tag: 'option', value: 'foo' }] });
                createSuite('textarea', { tag: 'textarea' });
                
                // In IE8, <object> is naturally tabbable as well
                if (Ext.isIE8) {
                    createSuite('object', {
                        tag: 'object',
                        style: 'height: 100px; width: 100px',
                        type: 'image/gif',
                        data: 'resources/images/foo.gif'
                    });
                }
            });
            
            describe("non-naturally tabbable elements", function() {
                function createSuite(name, elConfig, selector) {
                    return describe(name, function() {
                        beforeEach(function() {
                            createElement(elConfig, selector);
                        });
                        
                        describe("no special attributes", function() {
                            it("is false with no tabIndex", function() {
                                expect(el.isTabbable()).toBe(false);
                            });
                        
                            it("is false with tabIndex < 0", function() {
                                dom.setAttribute('tabindex', '-1');
                            
                                expect(el.isTabbable()).toBe(false);
                            });
                        
                            it("is true with tabIndex = 0", function() {
                                dom.tabIndex = 0;
                            
                                expect(el.isTabbable()).toBe(true);
                            });
                        
                            it("is true with tabIndex > 0", function() {
                                dom.setAttribute('tabindex', 10);
                            
                                expect(el.isTabbable()).toBe(true);
                            });
                            
                            createVisibilitySuites();
                        });
                        
                        describe("editable " + name, function() {
                            beforeEach(function() {
                                dom.setAttribute('contenteditable', true);
                            });
                            
                            it("is true with no tabIndex", function() {
                                expect(el.isTabbable()).toBeTruthy();
                            });
                        
                            it("is false with tabIndex < 0", function() {
                                dom.tabIndex = -1;
                            
                                expect(el.isTabbable()).toBeFalsy();
                            });
                        
                            it("is true with tabIndex = 0", function() {
                                dom.tabIndex = 0;
                                
                                expect(el.isTabbable()).toBeTruthy();
                            });
                            
                            it("is true with tabIndex > 0", function() {
                                dom.tabIndex = 1;
                                
                                expect(el.isTabbable()).toBeTruthy();
                            });
                            
                            // editable but invisible should not be tabbable
                            createVisibilitySuites();
                        });
                    });
                }
                
                createSuite('anchor w/o href', { tag: 'a' });
                createSuite('div', { tag: 'div' });
                createSuite('span', { tag: 'span' });
                createSuite('p', { tag: 'p' });
                createSuite('ul li', { tag: 'ul', cn: [{ tag: 'li' }] }, 'li');
                createSuite('ol li', { tag: 'ol', cn: [{ tag: 'li' }] }, 'li' );
                createSuite('img', { tag: 'img' });
                createSuite('td', {
                    tag: 'table',
                    cn: [{
                        tag: 'tr',
                        cn: [{
                            tag: 'td',
                            html: '&nbsp;'
                        }]
                    }]
                }, 'td');
                
                if (!Ext.isIE8) {
                    createSuite('object', { tag: 'object' });
                }
            });
        });
        
        describe("selecting", function() {
            beforeEach(function() {
                createElement([
                    '<div>',
                        '<div id="test1">Not tabbable',
                            '<div id="test2" tabindex="-1">Not tabbable',
                                '<div id="test3" tabindex="0">Tabbable',
                                    '<div id="test5" tabindex="1">Tabbable</div>',
                                '</div>',
                            '</div>',
                        '</div>',
                        '<a id="test7" href="#">Tabbable</a>',
                        '<a id="test8" href="#" tabindex="-1">Not tabbable</a>',
                        '<a id="test9" href="#" tabindex="0">Tabbable</a>',
                        '<span id="test11">Not tabbable</span>',
                        '<span id="test12" tabindex="-42">Not tabbable</span>',
                        '<span id="test13" tabindex="0">Tabbable</span>',
                        '<button id="test15">Tabbable</button>',
                        '<button id="test16" tabindex="-100">Not tabbable</button>',
                        '<button id="test17" tabindex="0">Tabbable</button>',
                        '<button id="test18" tabindex="1" disabled="disabled">Not tabbable</button>',
                        '<a id="test19">Not tabbable</a>',
                        '<a id="test20" tabindex="-1">Not tabbable</a>',
                        '<a id="test21" tabindex="0">Tabbable</a>',
                        '<iframe id="test23">Tabbable</iframe>',
                        '<iframe id="test24" tabindex="-1">Not tabbable</iframe>',
                        '<iframe id="test25" tabindex="0">Tabbable</iframe>',
                        '<input id="test27" name="Tabbable" />',
                        '<input id="test28" name="Not tabbable 1" tabindex="-12" />',
                        '<input id="test29" name="Not tabbable 2" disabled="disabled" />',
                        '<select id="test30"><option>Tabbable</option></select>',
                        '<select id="test31" tabindex="-1"><option>Not tabbable</option></select>',
                        '<select id="test32" tabindex="1" disabled="true"><option>Not tabbable</option></select>',
                        '<textarea id="test33">Tabbable</textarea>',
                        '<textarea id="test34" tabindex="-1">Not tabbable</textarea>',
                        '<textarea id="test35" tabindex="0" disabled="1">Not tabbable</textarea>',
                        '<p id="test36">Not tabbable</p>',
                    '<div>'
                ]);
            });
        
            describe("as HTML nodes", function() {
                it("should find all tabbable sub-elements", function() {
                    var els = el.selectTabbableElements();
            
                    expect(els.length).toBe(13);
                });
                
                it("should return correct sub-elements in correct order", function() {
                    var els = el.selectTabbableElements();
                    
                    expect(els[0].id).toBe('test3');
                    expect(els[1].id).toBe('test5');
                    expect(els[2].id).toBe('test7');
                    expect(els[3].id).toBe('test9');
                    expect(els[4].id).toBe('test13');
                    expect(els[5].id).toBe('test15');
                    expect(els[6].id).toBe('test17');
                    expect(els[7].id).toBe('test21');
                    expect(els[8].id).toBe('test23');
                    expect(els[9].id).toBe('test25');
                    expect(els[10].id).toBe('test27');
                    expect(els[11].id).toBe('test30');
                    expect(els[12].id).toBe('test33');
                });
        
                it("should find first tabbable sub-element", function() {
                    var node = el.selectFirstTabbableElement();
            
                    expect(node.tagName).toBe('DIV');
                    expect(node.id).toBe('test3');
                });
        
                it("should find last tabbable sub-element", function() {
                    var node = el.selectLastTabbableElement();
            
                    expect(node.tagName).toBe('TEXTAREA');
                    expect(node.id).toBe('test33');
                });
            });
            
            describe("asDom", function() {
                it("should return DOM node when asDom === true", function() {
                    var node = el.selectFirstTabbableElement(true);
                    
                    expect(node.isElement).toBe(undefined);
                });
                
                it("should return Element when asDom === false", function() {
                    var tEl = el.selectLastTabbableElement(false);
                    
                    expect(tEl.isElement).toBe(true);

                    tEl.destroy();
                });
            });
        });
        
        describe("state attributes", function() {
            function createSuite(name, elConfig, selector, deep) {
                return describe(name, function() {
                    beforeEach(function() {
                        createElement(elConfig, selector);
                    });
                    
                    it("should be tabbable before the test (sanity check)", function() {
                        expect(el.isTabbable()).toBeTruthy();
                    });
                    
                    function createAttrSuite(attrName, attrDesc) {
                        return describe("with " + attrDesc + " attribute", function() {
                            var defaultAttr = 'data-savedtabindex';
                            
                            describe("saving", function() {
                                beforeEach(function() {
                                    el.saveTabbableState(attrName);
                                });
                        
                                it("should have the tabbable state saved", function() {
                                    var attr = el.getAttribute(attrName || defaultAttr);
                        
                                    expect(attr).toBeTruthy();
                                });
                        
                                it("should become non-tabbable", function() {
                                    expect(el.isTabbable()).toBeFalsy();
                                });
                            });
                    
                            describe("restoring", function() {
                                it("should be tabbable before the test (sanity check)", function() {
                                    expect(el.isTabbable()).toBeTruthy();
                                });
                        
                                describe("saved", function() {
                                    beforeEach(function() {
                                        el.restoreTabbableState();
                                    });
                            
                                    it("should have the saved attribute removed", function() {
                                        var hasIt = dom.hasAttribute(attrName || defaultAttr);
                                        
                                        expect(hasIt).toBeFalsy();
                                    });
                                });
                            });
                            
                            // Non-default attributes get additional checks
                            if (attrName) {
                                describe("with both default and " + attrDesc + " attribute", function() {
                                    describe("saving " + attrDesc + " and default attribute", function() {
                                        beforeEach(function() {
                                            el.saveTabbableState(attrName);
                                            el.saveTabbableState();
                                        });
                                        
                                        it("should have the " + attrDesc + " attribute", function() {
                                            var attr = el.getAttribute(attrName);
                                            
                                            expect(attr).toBeTruthy();
                                        });
                                        
                                        it("should not have the default attr", function() {
                                            var attr = el.getAttribute(defaultAttr);
                                            
                                            expect(attr).toBe(null);
                                        });
                                        
                                        it("should be non-tabbable", function() {
                                            expect(el.isTabbable()).toBeFalsy();
                                        });
                                    });
                                    
                                    describe("saving " + attrDesc + " and restoring default", function() {
                                        beforeEach(function() {
                                            el.saveTabbableState(attrName);
                                            el.restoreTabbableState();
                                        });
                                        
                                        it("should still have the " + attrDesc + " attribute", function() {
                                            var attr = el.getAttribute(attrName);
                                            
                                            expect(attr).toBeTruthy();
                                        });
                                        
                                        it("should still be non-tabbable", function() {
                                            expect(el.isTabbable()).toBeFalsy();
                                        });
                                    });
                                    
                                    describe("saving " + attrDesc + " and saving/restoring default", function() {
                                        beforeEach(function() {
                                            el.saveTabbableState(attrName);
                                            el.saveTabbableState();
                                            el.restoreTabbableState();
                                        });
                                        
                                        it("should still have the " + attrDesc + " attribute", function() {
                                            var attr = el.getAttribute(attrName);
                                            
                                            expect(attr).toBeTruthy();
                                        });
                                        
                                        it("should still be non-tabbable when saved", function() {
                                            expect(el.isTabbable()).toBeFalsy();
                                        });
                                        
                                        it("should remove the " + attrDesc + " attribute when restored", function() {
                                            el.restoreTabbableState(attrName);
                                            
                                            var attr = el.getAttribute(attrName);
                                            
                                            expect(attr).toBe(null);
                                        });
                                        
                                        it("should become tabbable after restoring the " + attrDesc + " attribute", function() {
                                            el.restoreTabbableState(attrName);
                                            
                                            expect(el.isTabbable()).toBeTruthy();
                                        });
                                    });
                                });
                                
                                if (deep) {
                                    describe("deep with both default and " + attrDesc + " attribute", function() {
                                        describe("saving children state with " + attrDesc + " attribute", function() {
                                            beforeEach(function() {
                                                el.saveTabbableState(attrName);
                                                el.saveChildrenTabbableState(attrName);
                                                topEl.saveTabbableState();
                                                topEl.saveChildrenTabbableState();
                                            });
                                            
                                            it("should be non-tabbable at topEl", function() {
                                                expect(topEl.isTabbable()).toBeFalsy();
                                            });
                                            
                                            it("should not have tabbable children", function() {
                                                var cn = topEl.selectTabbableElements();
                                                
                                                expect(cn.length).toBe(0);
                                            });
                                            
                                            it("in fact, the document should have no tabbable elements", function() {
                                                var cn = Ext.getBody().selectTabbableElements();
                                                
                                                expect(cn.length).toBe(0);
                                            });
                                        });
                                        
                                        describe("saving children state with " + attrDesc + " and restoring with default", function() {
                                            var elCn, topElCn;
                                            
                                            beforeEach(function() {
                                                elCn = el.selectTabbableElements();
                                                topElCn = topEl.selectTabbableElements();
                                            });
                                            
                                            describe("sanity checks", function() {
                                                it("should be tabbable at el", function() {
                                                    expect(el.isTabbable()).toBeTruthy();
                                                });
                                            
                                                it("should have non-zero tabbable children at el", function() {
                                                    expect(elCn.length).toBeTruthy();
                                                });

                                                it("should be tabbable at topEl", function() {
                                                    expect(topEl.isTabbable()).toBeTruthy();
                                                });
                                                
                                                it("should have non-zero tabbable children at topEl", function() {
                                                    expect(topElCn.length).toBeTruthy();
                                                });
                                            });
                                            
                                            describe("saving", function() {
                                                beforeEach(function() {
                                                    el.saveChildrenTabbableState(attrName);
                                                    el.saveTabbableState(attrName);
                                                    topEl.saveChildrenTabbableState();
                                                    topEl.saveTabbableState();
                                                });
                                                
                                                it("should be non-tabbable at el", function() {
                                                    expect(el.isTabbable()).toBeFalsy();
                                                });
                                                
                                                it("should have zero tabbable children at el", function() {
                                                    var cn = el.selectTabbableElements();
                                                    
                                                    expect(cn.length).toBe(0);
                                                });
                                                
                                                it("should be non-tabbable at topEl", function() {
                                                    expect(topEl.isTabbable()).toBeFalsy();
                                                });
                                                
                                                it("should have zero tabbable children at topEl", function() {
                                                    var cn = topEl.selectTabbableElements();
                                                    
                                                    expect(cn.length).toBe(0);
                                                });
                                                
                                                describe("restoring " + attrDesc + " attribute (at el)", function() {
                                                    beforeEach(function() {
                                                        el.restoreChildrenTabbableState(attrName);
                                                        el.restoreTabbableState(attrName);
                                                    });
                                                    
                                                    it("should be tabbable at el", function() {
                                                        expect(el.isTabbable).toBeTruthy();
                                                    });
                                                    
                                                    it("should have the same tabbable children at el as before saving, in the same order", function() {
                                                        var cn = el.selectTabbableElements();
                                                        
                                                        expect(cn).toEqual(elCn);
                                                    });
                                                    
                                                    it("should still be non-tabbable at topEl", function() {
                                                        expect(topEl.isTabbable()).toBeFalsy();
                                                    });
                                                    
                                                    it("should have the same tabbable cn at topEl as at el, plus el itself", function() {
                                                        var cn = topEl.selectTabbableElements();
                                                        
                                                        // Remove the el itself to normalize
                                                        var child = cn.shift();
                                                        
                                                        expect(child).toBe(dom);
                                                        expect(cn).toEqual(elCn);
                                                    });
                                                    
                                                    describe("restoring default attribute (at topEl)", function() {
                                                        beforeEach(function() {
                                                            topEl.restoreChildrenTabbableState();
                                                            topEl.restoreTabbableState();
                                                        });
                                                        
                                                        it("should still be tabbable at el", function() {
                                                            expect(el.isTabbable()).toBeTruthy();
                                                        });
                                                        
                                                        it("should be tabbable again at topEl", function() {
                                                            expect(topEl.isTabbable()).toBeTruthy();
                                                        });
                                                        
                                                        it("should have the same tabbable children as before at topEl, in the same order", function() {
                                                            var cn = topEl.selectTabbableElements();
                                                            
                                                            expect(cn).toEqual(topElCn);
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                }
                            }
                        });
                    }
                    
                    createAttrSuite(undefined, 'default');
                    createAttrSuite('data-foo', 'foo');
                });
            }
            
            // Standalone elements
            createSuite('a w/ href', { tag: 'a', href: '#' });
            createSuite('button', { tag: 'button' });
            createSuite('input', { tag: 'input', type: 'text' });
            createSuite('div', { tag: 'div', tabIndex: 0 });
                    
            // Hierarchies
            createSuite('div w/ children', {
                tag: 'div',
                tabIndex: 0,
                cn: [{
                    tag: 'div',
                    tabIndex: 1,
                    id: 'foo',
                    cn: [{
                        tag: 'div',
                        tabIndex: 2
                    }]
                }]
            }, '#foo', true);
        });
        
        describe("state", function() {
            function createSuite(name, elConfig, selector, deep) {
                return describe(name, function() {
                    describe(name + " saving", function() {
                        beforeEach(function() {
                            createElement(elConfig, selector);
                        });
                    
                        it("should be tabbable before the test (sanity check)", function() {
                            expect(el.isTabbable()).toBe(true);
                        });
                    
                        describe(name + " element", function() {
                            beforeEach(function() {
                                el.saveTabbableState();
                            });
                        
                            it("should be removed from tab order", function() {
                                expect(el.isTabbable()).toBe(false);
                            });
                        
                            if (deep) {
                                it("should not disable children tabbable state", function() {
                                    var cn = el.selectTabbableElements();
                                
                                    expect(cn.length).toBeTruthy();
                                });
                            }
                        });
                    
                        if (deep) {
                            describe(name + " children", function() {
                                beforeEach(function() {
                                    el.saveChildrenTabbableState();
                                });
                            
                                it("should remove children from tab order", function() {
                                    var cn = el.selectTabbableElements();
                                
                                    expect(cn.length).toBe(0);
                                });
                            });
                        }
                    });
                    
                    describe(name + " restoring", function() {
                        var saved;
                        
                        beforeEach(function() {
                            createElement(elConfig, selector);
                            saved = undefined;
                        });
                        
                        it("should be tabbable before the test (sanity check)", function() {
                            expect(el.isTabbable()).toBe(true);
                        });
                        
                        describe(name + " element saved", function() {
                            beforeEach(function() {
                                saved = dom.getAttribute('tabindex');
                                el.saveTabbableState();
                            });
                            
                            it("should not be tabbable when state is saved", function() {
                                expect(el.isTabbable()).toBe(false);
                            });
                            
                            describe(name + " element restored", function() {
                                beforeEach(function() {
                                    el.restoreTabbableState();
                                });
                                
                                it("should have the tabIndex attribute restored", function() {
                                    var idx = dom.getAttribute('tabindex');
                                    
                                    expect(idx).toBe(saved);
                                });
                                
                                it("should be tabbable again", function() {
                                    expect(el.isTabbable()).toBe(true);
                                });
                            });
                        });
                        
                        if (deep) {
                            describe(name + " children saved", function() {
                                beforeEach(function() {
                                    saved = el.saveChildrenTabbableState() || [];
                                });
                                
                                it("should have no tabbable children when saved", function() {
                                    var cn = el.selectTabbableElements();
                                    
                                    expect(cn.length).toBe(0);
                                });
                                
                                describe(name + " children restored", function() {
                                    beforeEach(function() {
                                        el.restoreChildrenTabbableState();
                                    });
                                    
                                    it("should have the same number of tabbable children", function() {
                                        var cn = el.selectTabbableElements();
                                        
                                        expect(cn.length).toBe(saved.length);
                                    });
                                    
                                    it("should have the same tabbable children", function() {
                                        var cn = el.selectTabbableElements();
                                        
                                        for (var i = 0; i < saved.length; i++) {
                                            var c1 = saved[i],
                                                c2 = cn[i];
                                            
                                            expect(c1.id).toBe(c2.id);
                                        }
                                    });
                                });
                            });
                        }
                    });
                });
            }
            
            createSuite('anchor with href natural', { tag: 'a', href: '#' });
            createSuite('anchor with href w/ tabIndex', { tag: 'a', href: '#', tabIndex: 0 });
            
            createSuite('anchor w/o href', { tag: 'a', tabIndex: 0 });
            createSuite('anchor w/o href w/ children', {
                tag: 'a',
                tabIndex: 0,
                cn: [{
                    tag: 'div',
                    tabIndex: 1
                }]
            }, '', true);
            
            createSuite('button natural', { tag: 'button' });
            createSuite('button w/ tabIndex', { tag: 'button', tabIndex: 0 });
            
            createSuite('iframe natural', { tag: 'iframe' });
            createSuite('iframe w/ tabIndex', { tag: 'iframe', tabIndex: 42 });
            
            createSuite('input natural', { tag: 'input' });
            createSuite('input w/ tabIndex', { tag: 'input', tabIndex: 1 });
            
            createSuite('select natural', {
                tag: 'select',
                cn: [{
                    tag: 'option',
                    value: 'foo'
                }]
            });
            createSuite('select w/ tabIndex', {
                tag: 'select',
                tabIndex: 100,
                cn: [{
                    tag: 'option',
                    value: 'bar'
                }]
            });
            
            createSuite('textarea natural', { tag: 'textarea' });
            createSuite('textarea w/ tabIndex', { tag: 'textarea', tabIndex: 1 });
            
            createSuite('div', { tag: 'div', tabIndex: 0 });
            createSuite('div w/ children', {
                tag: 'div',
                tabIndex: 0,
                cn: [{
                    tag: 'div',
                    tabIndex: 1,
                    cn: [{
                        tag: 'div',
                        tabIndex: 2
                    }]
                }]
            }, '', true);
            
            createSuite('span', { tag: 'span', tabIndex: 0 });
            createSuite('p', { tag: 'p', tabIndex: 0 });
            createSuite('img', { tag: 'img', tabIndex: 0 });
            
            createSuite('ul li', {
                tag: 'ul',
                tabIndex: 0,
                cn: [{
                    tag: 'li',
                    tabIndex: 1
                }, {
                    tag: 'li',
                    tabIndex: 2
                }]
            }, null, true);
            
            createSuite('ol li', {
                tag: 'ol',
                tabIndex: 100,
                cn: [{
                    tag: 'li',
                    tabIndex: 101
                }, {
                    tag: 'li',
                    tabIndex: 102
                }]
            }, null, true);
            
            createSuite('table', {
                tag: 'table',
                tabIndex: 0,
                cn: [{
                    tag: 'tr',
                    cn: [{
                        tag: 'td',
                        tabIndex: 1,
                        html: '&nbsp;'
                    }, {
                        tag: 'td',
                        tabIndex: 2,
                        html: '&nbsp;'
                    }]
                }]
            }, null, true);
        });
    });
    
    describe("masking", function() {
        describe("isMasked", function() {
            beforeEach(function() {
                createElement({
                    tag: 'div',
                    id: 'foo',
                    cn: [{
                        tag: 'div',
                        id: 'bar',
                        cn: [{
                            tag: 'div',
                            id: 'baz'
                        }]
                    }]
                }, '#bar');
            });
            
            afterEach(function() {
                Ext.getBody().unmask();
            });
            
            it("should be false when no elements are masked", function() {
                expect(el.isMasked()).toBe(false);
            });
            
            it("should be false when child element is masked", function() {
                var baz = el.down('#baz');

                baz.mask();

                expect(el.isMasked()).toBe(false);

                baz.destroy();
            });
            
            it("should be true when el is masked", function() {
                el.mask();
                
                expect(el.isMasked()).toBe(true);
            });
            
            it("should be false when !hierarchy and the parent is masked", function() {
                topEl.mask();
                
                expect(el.isMasked()).toBe(false);
            });
            
            it("should be true when hierarchy === true and parent is masked", function() {
                topEl.mask();
                
                expect(el.isMasked(true)).toBe(true);
            });
            
            it("should be true when hierarchy === true and body is masked", function() {
                Ext.getBody().mask();
                
                expect(el.isMasked(true)).toBe(true);
            });
        });
        
        describe("an element", function() {
            beforeEach(function() {
                createElement([
                    '<div id="foo" tabindex="0">',
                        '<input id="bar" />',
                        '<div id="baz">',
                            '<textarea id="qux"></textarea>',
                        '</div>',
                    '</div>'
                ]);
            });
            
            describe("when masked", function() {
                beforeEach(function() {
                    el.mask();
                });
                
                it("should save its tabbable state", function() {
                    expect(el.isTabbable()).toBeFalsy();
                });
            
                it("should save its children tabbable states", function() {
                    var tabbables = el.selectTabbableElements();
                
                    expect(tabbables.length).toBe(0);
                });
            });
            
            describe("when unmasked", function() {
                beforeEach(function() {
                    el.mask();
                    el.unmask();
                });
                
                it("should restore its tabbable state", function() {
                    expect(el.isTabbable()).toBeTruthy();
                });
                
                it("should restore its children tabbable state", function() {
                    var tabbables = el.selectTabbableElements();
                    
                    expect(tabbables.length).toBe(2);
                });
            });
        });
        
        describe("document body", function() {
            var el, saved;
            
            beforeEach(function() {
                createElement([
                    '<div id="foo" tabindex="0">',
                        '<input id="bar" />',
                        '<div id="baz">',
                            '<textarea id="qux"></textarea>',
                        '</div>',
                    '</div>'
                ]);
                
                el = Ext.getBody();
                saved = el.isTabbable();
            });
            
            afterEach(function() {
                saved = undefined;
                el.unmask();
            });
            
            describe("when masked", function() {
                beforeEach(function() {
                    el.mask();
                });
                
                it("should not change its tabbable state", function() {
                    expect(el.isTabbable()).toBe(saved);
                });
                
                it("should save its children tabbable states", function() {
                    var tabbables = el.selectTabbableElements();
                    
                    expect(tabbables.length).toBe(0);
                });
            });
            
            describe("when unmasked", function() {
                beforeEach(function() {
                    el.mask();
                    el.unmask();
                });
                
                it("should not change its tabbable state", function() {
                    expect(el.isTabbable()).toBe(saved);
                });
                
                it("should restore its children tabbable states", function() {
                    var tabbables = el.selectTabbableElements();
                    
                    expect(tabbables.length).toBe(3);
                });
            });
        });
    });
});
