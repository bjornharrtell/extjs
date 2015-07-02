/**
 * This mixin implements focus trap for widgets that do not want to allow the user
 * to tab out, circling focus among the child items instead. The widget should be
 * derived from Panel since it relies on the tab guards feature of the Panel.
 *
 * The best example of such widget is a Window, or a dialog as per WAI-ARIA 1.0:
 * http://www.w3.org/TR/wai-aria-practices/#dialog_modal
 * http://www.w3.org/TR/wai-aria-practices/#dialog_nonmodal
 *
 * @private
 */
Ext.define('Ext.util.FocusTrap', {
    extend: 'Ext.Mixin',
    
    mixinConfig: {
        id: 'focustrap',
        
        after: {
            afterRender: 'initTabGuards',
            addTool: 'initTabGuards',
            add: 'initTabGuards',
            remove: 'initTabGuards',
            addDocked: 'initTabGuards',
            removeDocked: 'initTabGuards',
            onShow: 'initTabGuards',
            afterHide: 'initTabGuards'
        }
    },
    
    config: {
        tabGuard: true,
    
        tabGuardTpl:
            '<div id="{id}-{tabGuardEl}" data-ref="{tabGuardEl}" role="button" ' +
                'data-tabguardposition="{tabGuard}" aria-busy="true" style="height:0"' +
                'class="' + Ext.baseCSSPrefix + 'hidden-clip">' +
            '</div>',
    
        tabGuardIndex: 0
    },
    
    tabGuardPositionAttribute: 'data-tabguardposition',
    
    privates: {
        initTabGuards: function() {
            var me = this,
                posAttr = me.tabGuardPositionAttribute,
                beforeGuard = me.tabGuardBeforeEl,
                afterGuard = me.tabGuardAfterEl,
                tabIndex = me.tabGuardIndex,
                nodes;
            
            if (!me.rendered || !me.tabGuard) {
                return;
            }
            
            nodes = me.el.findTabbableElements({
                skipSelf: true
            });
            
            // Both tab guards may be in the list, disregard them
            if (nodes[0] && nodes[0].hasAttribute(posAttr)) {
                nodes.shift();
            }
            
            if (nodes.length && nodes[nodes.length - 1].hasAttribute(posAttr)) {
                nodes.pop();
            }
            
            if (nodes.length) {
                beforeGuard.dom.setAttribute('tabIndex', tabIndex);
                beforeGuard.on('focusenter', me.onTabGuardFocusEnter, me);
                
                afterGuard.dom.setAttribute('tabIndex', tabIndex);
                afterGuard.on('focusenter',  me.onTabGuardFocusEnter, me);
            }
            else {
                beforeGuard.dom.removeAttribute('tabIndex');
                beforeGuard.un('focusenter', me.onTabGuardFocusEnter, me);
                
                afterGuard.dom.removeAttribute('tabIndex');
                afterGuard.un('focusenter',  me.onTabGuardFocusEnter, me);
            }
        },
        
        onTabGuardFocusEnter: function(e, target) {
            var me = this,
                el = me.el,
                posAttr = me.tabGuardPositionAttribute,
                position = target.getAttribute(posAttr),
                from = e.relatedTarget,
                nodes, forward, nextFocus;
            
            // Focus was within the parent widget and is trying to escape;
            // for topmost guard we need to bounce focus back to the last tabbable
            // element in the parent widget, and vice versa for the bottom trap.
            if (!from.hasAttribute(posAttr) && from !== el.dom && el.contains(from)) {
                forward = position === 'before' ? false : true;
            }
            
            // It is entirely possible that focus was outside the widget and
            // the user tabbed into the widget, or widget main el was focused
            // and the user pressed the Tab key. In that case we forward the focus
            // to the next available element in the natural tab order, i.e. the element
            // after the topmost guard, or the element before the bottom guard.
            else {
                forward = position === 'before' ? true : false;
            }
            
            nodes = el.findTabbableElements({
                skipSelf: true
            });
            
            // Tabbables will include two tab guards, so remove them
            nodes.shift();
            nodes.pop();
            
            nextFocus = forward ? nodes[0] : nodes[nodes.length - 1];
            
            if (nextFocus) {
                nextFocus.focus();
            }
        }
    }
});
