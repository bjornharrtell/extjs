/**
 * @private
 */
Ext.define('Ext.event.publisher.Focus', {
    extend: 'Ext.event.publisher.Dom',

    handledEvents: ['focusin', 'focusout'],

    syntheticEvents: {
        focusenter: true,
        focusleave: true
    },

    eventMap: {
        focus: 'focusenter',
        focusin: 'focusenter',
        blur: 'focusleave',
        focusout: 'focusleave'
    },

    handles: function(eventName) {
        return this.syntheticEvents[eventName];
    },

    doDelegatedEvent: function(e, invokeAfter) {
        var me = this;

        e = me.callParent([e, false]);

        if (e) {
            me.processSyntheticEvent(me.eventMap[e.type], e);
    
            if (invokeAfter) {
                me.afterEvent(e);
            }
        }
    },

    createSyntheticEvent: function(eventName, origEvent, realTarget) {
        var event = new Ext.event.Event(origEvent.browserEvent);
    
        event.type = eventName;

        if (realTarget) {
            event.relatedTarget = event.target;
            event.target = realTarget;
        }
        else {
            event.target = origEvent.target;
            event.relatedTarget = origEvent.relatedTarget || null;
        }
    
        return event;
    },

    processSyntheticEvent: function(eventName, e, eventTarget) {
        var me = this,
            subscribers, nodes, node, i, len, targets;
    
        subscribers = me.getSubscribers(eventName);

        if (subscribers.$length) {
            nodes   = me.gatherSubscriberNodes(eventName, subscribers);
            targets = [];

            for (i = 0, len = nodes.length; i < len; i++) {
                node = nodes[i];
    
                if (me.isEventTarget(node, eventName, e, eventTarget)) {
                    targets.push(node);
                }
            }

            for (i = 0, len = targets.length; i < len; i++) {
                node = targets[i];
    
                if (node) {
                    me.fireNodeEvent(node, eventName, e, eventTarget);
                }
            }
        }
    },

    gatherSubscriberNodes: function(eventName, subscribers) {
        var idSubscribers = subscribers.id,
            classNameSubscribers = subscribers.className,
            selectorSubscribers = subscribers.selector,
            hasIdSubscribers = idSubscribers.$length > 0,
            hasClassNameSubscribers = classNameSubscribers.$length > 0,
            hasSelectorSubscribers = selectorSubscribers.$length > 0,
            result = [],
            subscriber, item;
    
        if (hasIdSubscribers) {
            for (item in idSubscribers) {
                if (item === '$length') {
                    continue;
                }
            
                subscriber = document.getElementById(item);
            
                if (subscriber) {
                    result.push(subscriber);
                }
            }
        }
    
        // Blow up for now
        if (hasClassNameSubscribers) {
            Ext.Error.raise('Class name subscribers in Focus publisher');
        }
    
        // Same thing
        if (hasSelectorSubscribers) {
            Ext.Error.raise('Selector subscribers in Focus publisher');
        }
    
        return result;
    },

    isEventTarget: function(node, eventName, e, realTarget) {
        return eventName === 'focusenter' ? this.isFocusEnterTarget(node, e, realTarget)
             : eventName === 'focusleave' ? this.isFocusLeaveTarget(node, e, realTarget)
             :                              null
        ;
    },

    isFocusEnterTarget: function(node, e, eventTarget) {
        var event = e.browserEvent,
            from = eventTarget || event.relatedTarget,
            to = event.target,
            fly;
    
        if (to === window) {
            return false;
        }
    
        fly = Ext.fly(node);
    
        // If the focusin event happened outside of the node, it's definitely
        // not going to be a focusenter.
        if (!fly.isAncestor(to)) {
            return false;
        }
    
        // For focusin events originated from the "outside" of the document,
        // IE will report as if they came from the document body, and WebKit
        // will set relatedTarget to null. That's an easy catch.
        if (!from) {
            return true;
        }
    
        // If the node is not a parent of the "from" element, then we have a
        // legit focusenter
        if (!fly.isAncestor(from)) {
            return true;
        }
    
        return false;
    },

    isFocusLeaveTarget: function(node, e, eventTarget) {
        var event = e.browserEvent,
            from = eventTarget !== undefined ? eventTarget : event.target,
            to = eventTarget !== undefined ? event.target : event.relatedTarget,
            fly;
    
        // In Firefox we have to do really strange things :/
        if (from === window || to === window) {
            return false;
        }
    
        fly = Ext.fly(node);
    
        if (!fly.isAncestor(from)) {
            return false;
        }
    
        if (!to) {
            return true;
        }
    
        if (!fly.isAncestor(to)) {
            return true;
        }
    
        return false;
    },

    fireNodeEvent: function(subscriber, eventName, origEvent, realTarget) {
        var e = this.createSyntheticEvent(eventName, origEvent, realTarget);
    
        e.setCurrentTarget(subscriber);
    
        this.dispatch('#' + subscriber.id, eventName, [e, subscriber]);
    }
},

function() {
    // At this point only Firefox does not support focusin/focusout, see this bug:
    // https://bugzilla.mozilla.org/show_bug.cgi?id=687787
    if (!Ext.supports.FocusinFocusoutEvents) {
        // We need to track previously focused element to detect when
        // a target lost focus
        document.addEventListener('blur', function(e) {
            if (e.target === window || e.target === document) {
                delete document.previousActiveElement;
            }
            else {
                document.previousActiveElement = e.target;
            }
        }, true);
        
        // When focusin/focusout are not available we capture focus event instead,
        // and fire both focusenter *and* focusleave in the focus handler.
        this.override({
            handledEvents: ['focus'],
            
            doDelegatedEvent: function(e, invokeAfter) {
                var me = this,
                    el;

                e = me.callSuper([e, false]);

                if (e) {
                    el = document.previousActiveElement;
    
                    if (el !== undefined) {
                        me.processSyntheticEvent('focusleave', e, el);
                    }
    
                    me.processSyntheticEvent(me.eventMap[e.type], e, el || null);

                    if (invokeAfter) {
                        me.afterEvent(e);
                    }
                }
            }
        });
    }
});
