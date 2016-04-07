/**
 * @private
 */
Ext.define('Ext.event.publisher.Focus', {
    extend: 'Ext.event.publisher.Dom',
    requires: [
        'Ext.dom.Element',
        'Ext.GlobalEvents'
    ],

    type: 'focus',

    handledEvents: ['focusenter', 'focusleave', 'focusmove'],

    // At this point only Firefox does not support focusin/focusout, see this bug:
    // https://bugzilla.mozilla.org/show_bug.cgi?id=687787
    handledDomEvents: ['focusin', 'focusout'],

    doDelegatedEvent: function(e, invokeAfter) {
        var me = this,
            relatedTarget;

        e = me.callParent([e, false]);

        if (e) {
            if (e.type === 'focusout') {
                // If focus is departing to the document, there will be no forthcoming focusin event
                // to trigger a focusleave, to fire a focusleave now.
                if (e.relatedTarget == null) {
                    me.processFocusIn(e, e.target, document.body, invokeAfter);
                }
            }
            else {
                relatedTarget = e.relatedTarget;

                // IE reports relatedTarget as either an inaccessible object which coercively equates to null, or just a blank object in the case of focusing from nowhere.
                // So we can't use a truth test ternary expression to substitute in document.body.
                me.processFocusIn(e, (relatedTarget == null || !relatedTarget.tagName) ? document.body : relatedTarget, e.target, invokeAfter);
            }
        }
    },

    processFocusIn: function(e, fromElement, toElement, invokeAfter) {
        var me = this,
            commonAncestor,
            node, targets = [],
            event, focusEnterEvent, fromFly, toFly;

        // In IE9- it can happen that either fromElement or toElement is not falsy value
        // but is not a HTMLElement either, but some mysterious empty object which is
        // truthy itself but Ext.fly() for which returns null. :(
        fromFly = Ext.fly(fromElement);
        toFly   = Ext.fly(toElement);

        // If we have suspended focus/blur processing due to framework needing to silently manipulate
        // focus position, then return early.
        if ((fromFly && fromFly.isFocusSuspended()) || (toFly && toFly.isFocusSuspended())) {
            return;
        }

        // Gather targets for focusleave event from the fromElement to the parentNode (not inclusive)
        for (node = fromElement, commonAncestor = Ext.dom.Element.getCommonAncestor(toElement, fromElement, true);
             node && node !== commonAncestor; node = node.parentNode) {
                targets.push(node);
        }

        // Publish the focusleave event for the bubble hierarchy
        if (targets.length) {
            event = me.createSyntheticEvent('focusleave', e, fromElement, toElement);
            me.publish('focusleave', targets, event);
            if (event.isStopped) {
                return;
            }
        }

        // Gather targets for focusenter event from the focus targetElement to the parentNode (not inclusive)
        targets.length = 0;
        for (node = toElement; node !== commonAncestor; node = node.parentNode) {
            targets.push(node);
        }

        // We always need this event; this is what we pass to the global focus event
        focusEnterEvent = me.createSyntheticEvent('focusenter', e, toElement, fromElement);

        // Publish the focusleave event for the bubble hierarchy
        if (targets.length) {
            me.publish('focusenter', targets, focusEnterEvent);
            if (focusEnterEvent.isStopped) {
                return;
            }
        }

        // When focus moves within an element, fire a bubbling focusmove event
        targets = me.getPropagatingTargets(commonAncestor);

        // Publish the focusleave event for the bubble hierarchy
        if (targets.length) {
            event = me.createSyntheticEvent('focusmove', e, toElement, fromElement);
            me.publish('focusmove', targets, event);
            if (event.isStopped) {
                return;
            }
        }

        if (invokeAfter) {
            me.afterEvent(e);
        }

        Ext.GlobalEvents.fireEvent('focus', {
            event: focusEnterEvent,
            toElement: toElement,
            fromElement: fromElement
        });
    },

    createSyntheticEvent: function(eventName, browserEvent, target, relatedTarget) {
        var event = new Ext.event.Event(browserEvent);

        event.type = eventName;

        event.relatedTarget = relatedTarget;
        event.target = target;

        return event;
    }
},

function(Focus) {
    var focusTimeout;

        Focus.instance = new Focus();

    // At this point only Firefox does not support focusin/focusout, see this bug:
    // https://bugzilla.mozilla.org/show_bug.cgi?id=687787
    if (!Ext.supports.FocusinFocusoutEvents) {
        // When focusin/focusout are not available we capture focus event instead,
        // and fire both focusenter *and* focusleave in the focus handler.
        this.override({
            handledDomEvents: ['focus', 'blur'],
            
            doDelegatedEvent: function(e, invokeAfter) {
                var me = this;

                e = me.callSuper([e, false]);

                if (e) {
                    clearTimeout(focusTimeout);
                    focusTimeout = 0;
                    if (e.type === 'blur') {
                        var blurredEl = e.target === window ? document.body : e.target;

                        // There might be an upcoming focus event, but if none happens
                        // within 1ms, then we treat this as a focus of the body
                        focusTimeout = setTimeout(function() {
                            focusTimeout = 0;
                            me.processFocusIn(e, blurredEl, document.body, invokeAfter);
                            Focus.previousActiveElement = null;
                        }, 0);
                        if (e.target === window || e.target === document) {
                            Focus.previousActiveElement = null;
                        }
                        else {
                            Focus.previousActiveElement = e.target;
                        }
                    } else {
                        me.processFocusIn(e, Focus.previousActiveElement || document.body, e.target === window ? document.body : e.target, invokeAfter);
                    }
                }
            }
        });
    }
});
