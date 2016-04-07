/**
 * A mixin for Components that need to interact with the keyboard.
 * @private
 */
Ext.define('Ext.util.KeyboardInteractive', {
    extend: 'Ext.Mixin',
    
    mixinConfig: {
        id: 'keyboardinteractive'
    },
    
    config: {
        /**
         * @cfg {Object} keyHandlers Handlers for keydown events.
         *
         * This object's keys correspond to keyboard key names in
         * {@link Ext.event.Event}, with values defined as method
         * names that should be executed when a keydown event occurs
         * for the specified key name.
         * For example:
         *
         *      Ext.define('MyButton', {
         *          extend: 'Ext.button.Button',
         *          
         *          config: {
         *              keyHandlers: {
         *                  ENTER: 'onEnterKey'
         *              }
         *          },
         *          
         *          onEnterKey: function(event) {
         *              ...
         *          }
         *      });
         *
         * @private
         */
        keyHandlers: {
            $value: null,
            lazy: true
        }
    },
    
    initKeyHandlers: function(focusEl) {
        var me = this,
            handlers = me.getKeyHandlers(),
            handler;
        
        // In the majority of cases, the keyHandlers config will be processed
        // at the component creation time, but the focusEl is only going to be
        // available after rendering. Make sure we attach the keydown listener
        // when that happens.
        // The loop is just to check that the keyHandlers object is not empty.
        for (handler in handlers) {
            focusEl.on('keydown', me.handleKeydown, me);
            me.keydownListenerAttached = true;
            break;
        }
    },
    
    applyKeyHandlers: function(config) {
        var me = this,
            handlers = {},
            focusEl, keyName, keyCode, handlerName, handlerFn;
        
        if (config) {
            // Resolve handler names to function references upfront
            // to avoid incurring dynamic lookup cost every time
            for (keyName in config) {
                handlerName = config[keyName];
                
                //<debug>
                keyCode = Ext.event.Event[keyName];
                
                if (keyCode === undefined) {
                    Ext.raise("Unknown key: " + keyName +
                                    " in keyHandlers config for " +
                                    me.id + ". Key names should be in " +
                                    "UPPER CASE.");
                }
                //</debug>
                
                if (typeof handlerName === 'function') {
                    handlers[keyName] = handlerName;
                }
                else {
                    handlers[keyName] = me[handlerName];
                }
                
                //<debug>
                if (typeof handlers[keyName] !== 'function') {
                    Ext.log.warn("Undefined binding " + handlerName +
                                 " for " + keyName + " key in " +
                                 "keyHandlers config for " + me.id);
                }
                //</debug>
            }
            
            // It is possible that key bindings were configured after
            // the component was rendered (and initKeyHandlers called),
            // so make sure that we have the keydown handler attached.
            if (me.focusable && me.rendered && !me.destroyed && !me.destroying) {
                focusEl = me.getFocusEl();
                
                if (focusEl && !me.keydownListenerAttached) {
                    focusEl.on('keydown', me.handleKeydown, me);
                    me.keydownListenerAttached = true;
                }
            }
        }
        
        return handlers;
    },
    
    handleKeydown: function(e) {
        var me = this,
            keyName, handlerFn;
        
        keyName = e.getKeyName();
        
        if (keyName) {
            handlerFn = me.getKeyHandlers()[keyName];
        
            if (handlerFn) {
                handlerFn.call(me, e);
            }
        }
    }
});
