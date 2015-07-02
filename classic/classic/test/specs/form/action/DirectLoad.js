describe("Ext.form.action.DirectLoad", function() {

    var action;

    function createAction(config, loadConfig, submitConfig) {
        config = config || {};
        if (!config.form) {
            config.form = {};
        }
        
        var loadFn = function(){
            
        }, submitFn = function(){
            
        }, cfg;
        
        loadConfig = Ext.apply({}, loadConfig);
        submitConfig = Ext.apply({}, submitConfig);
        
        cfg = Ext.applyIf(loadConfig, {
            ordered: true,
            len: 0
        });
        
        loadFn.directCfg = {
            method: new Ext.direct.RemotingMethod(cfg)
        };
        
        cfg = Ext.applyIf(submitConfig, {
            ordered: true,
            len: 0
        });
        
        submitFn.directCfg = {
            method: new Ext.direct.RemotingMethod(cfg)
        };
        
        TestDirect = {
            load: loadFn,
            submit: submitFn
        };
        
        Ext.applyIf(config.form, {
            clearInvalid: Ext.emptyFn,
            setValues: Ext.emptyFn,
            afterAction: Ext.emptyFn,
            api: {
                load: config.stringMethods ? 'TestDirect.load' : loadFn,
                submit: config.stringMethods ? 'TestDirect.submit' : submitFn
            }
        });
        action = new Ext.form.action.DirectLoad(config);
        return action;
    }

    function createActionWithCallbackArgs(config, result, trans) {
        createAction(config);
        var load = action.form.api.load;
        spyOn(action.form.api, 'load').andCallFake(function() {
            var cb = arguments[arguments.length - 2],
                scope = arguments[arguments.length - 1];
            cb.call(scope, result, trans);
        });
        action.form.api.load.directCfg = load.directCfg;
    }

    afterEach(function() {
        Ext.direct.Manager.clearAllMethods();
        
        try {
            delete window.TestDirect;
        } catch(e) {
            window.TestDirect = undefined;
        }
        
        if (action) {
            Ext.destroy(action);
        }
    });

    it("should be registered in the action manager under the alias 'formaction.directload'", function() {
        var inst = Ext.ClassManager.instantiateByAlias('formaction.directload', {});
        expect(inst instanceof Ext.form.action.DirectLoad).toBeTruthy();
    });

    describe("run", function() {
        it("should not resolve 'load' method before first invocation", function() {
            createAction({ stringMethods: true });
            
            expect(action.form.api.load).toBe('TestDirect.load');
        });
        
        it("should resolve 'load' method on first invocation", function() {
            createAction({ stringMethods: true });
            action.run();
            
            expect(Ext.isFunction(action.form.api.load)).toBeTruthy();
        });
        
        it("should raise an error if it cannot resolve 'load' method", function() {
            createAction({ stringMethods: true });
            TestDirect = null;
            
            var ex = 'Cannot resolve Ext.Direct API method TestDirect.load';
            
            expect(function() { action.run(); }).toThrow(ex);
        });
        
        it("should invoke the 'load' function in the BasicForm's 'api' config", function() {
            createAction();
            var load = action.form.api.load;
            spyOn(action.form.api, 'load');
            action.form.api.load.directCfg = load.directCfg;
            action.run();
            expect(action.form.api.load).toHaveBeenCalled();
        });

        it("should pass the params as a single object argument if 'paramsAsHash' is true", function() {
            createAction({form: {paramsAsHash: true}, params: {foo: 'bar'}}, {
                len: 1
            });
            var load = action.form.api.load;
            spyOn(action.form.api, 'load');
            action.form.api.load.directCfg = load.directCfg;
            action.run();
            expect(action.form.api.load.mostRecentCall.args[0]).toEqual({foo: 'bar'});
        });

        it("should pass the param values as separate arguments in the 'paramOrder' order if specified", function() {
            createAction({form: {paramOrder: ['one', 'two']}, params: {one: 'foo', two: 'bar'}}, {
                len: 2
            });
            var load = action.form.api.load;
            spyOn(action.form.api, 'load');
            action.form.api.load.directCfg = load.directCfg;
            action.run();
            var args = action.form.api.load.mostRecentCall.args;
            expect(args[0]).toEqual('foo');
            expect(args[1]).toEqual('bar');
        });

        it("should grab params from the action's 'params' config and the BasicForm's 'baseParams' config", function() {
            createAction({form: {paramsAsHash: true, baseParams: {baseOne: '1', baseTwo: '2'}}, params: {one: '1', two: '2'}}, {
                len: 1
            });
            var load = action.form.api.load;
            spyOn(action.form.api, 'load');
            action.form.api.load.directCfg = load.directCfg;
            action.run();
            expect(action.form.api.load.mostRecentCall.args[0]).toEqual({baseOne: '1', baseTwo: '2', one: '1', two: '2'});
        });

        it("should pass the onSuccess callback function and the callback scope as the final 2 arguments", function() {
            createAction({form: {paramsAsHash: true}, params: {foo: 'bar'}}, {
                len: 1
            });
            var load = action.form.api.load;
            spyOn(action.form.api, 'load');
            action.form.api.load.directCfg = load.directCfg;
            action.run();
            var args = action.form.api.load.mostRecentCall.args;
            expect(typeof args[args.length - 2]).toEqual('function');
            expect(args[args.length - 1]).toBe(action);
        });
        
        describe("metadata", function() {
            var loadSpy;
            
            beforeEach(function() {
                createAction(
                    // action
                    {
                        form: {
                            metadata: { foo: 42, bar: false }
                        }
                    },
                    // load fn direct config
                    {
                        metadata: {
                            params: ['foo', 'bar']
                        }
                    }
                );
                
                // TODO Replace this cruft with makeSpy a la Direct proxy tests
                var load = action.form.api.load;
                
                loadSpy = spyOn(action.form.api, 'load');
                loadSpy.directCfg = load.directCfg;
            });
            
            it("should override form metadata with options values", function() {
                // Form.load(options) will apply options via Action constructor
                Ext.apply(action, { metadata: { foo: -1, bar: true } });
                
                action.run();
                
                expect(loadSpy.mostRecentCall.args[2]).toEqual({
                    metadata: { foo: -1, bar: true }
                });
            });
            
            it("should default to form metadata", function() {
                action.run();
        
                expect(loadSpy.mostRecentCall.args[2]).toEqual({
                    metadata: { foo: 42, bar: false }
                });
            });
        });
    });


    describe("load failure", function() {
        // effects
        it("should set the Action's failureType property to LOAD_FAILURE", function() {
            createActionWithCallbackArgs({}, {}, {});
            action.run();
            expect(action.failureType).toEqual(Ext.form.action.Action.LOAD_FAILURE);
        });

        it("should call the BasicForm's afterAction method with a false success param", function() {
            createActionWithCallbackArgs({}, {}, {});
            spyOn(action.form, 'afterAction');
            action.run();
            expect(action.form.afterAction).toHaveBeenCalledWith(action, false);
        });

        //causes
        it("should fail if the callback is passed an exception with type=Ext.direct.Manager.exceptions.SERVER", function() {
            createActionWithCallbackArgs({}, {}, {type: Ext.direct.Manager.exceptions.SERVER});
            action.run();
            expect(action.failureType).toEqual(Ext.form.action.Action.LOAD_FAILURE);
        });

        it("should fail if the result object does not have success=true", function() {
            createActionWithCallbackArgs({}, {success: false, data: {}}, {});
            action.run();
            expect(action.failureType).toEqual(Ext.form.action.Action.LOAD_FAILURE);
        });

        it("should fail if the result object does not have a data member", function() {
            createActionWithCallbackArgs({}, {success: true}, {});
            action.run();
            expect(action.failureType).toEqual(Ext.form.action.Action.LOAD_FAILURE);
        });
    });


    describe("load success", function() {
        beforeEach(function() {
            createActionWithCallbackArgs({}, {success: true, data: {foo: 'bar'}}, {});
        });

        it("should call the BasicForm's clearInvalid method", function() {
            spyOn(action.form, 'clearInvalid');
            action.run();
            expect(action.form.clearInvalid).toHaveBeenCalled();
        });

        it("should call the BasicForm's setValues method with the result data object", function() {
            spyOn(action.form, 'setValues');
            action.run();
            expect(action.form.setValues).toHaveBeenCalledWith({foo: 'bar'});
        });

        it("should invoke the BasicForm's afterAction method with a true success param", function() {
            spyOn(action.form, 'afterAction');
            action.run();
            expect(action.form.afterAction).toHaveBeenCalledWith(action, true);
        });
    });

});
