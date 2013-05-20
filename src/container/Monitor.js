/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-03-11 22:33:40 (aed16176e68b5e8aa1433452b12805c0ad913836)
*/
/**
 * This is a utility class for being able to track all items of a particular type
 * inside any level at a container. This can be used in favour of bubbling add/remove events
 * which can add a large perf cost when implemented globally
 * @private
 */
Ext.define('Ext.container.Monitor', {
    target: null,
    selector: '',
    
    scope: null,
    addHandler: null,
    removeHandler: null,
    
    disabled: 0,
    
    constructor: function(config){
        Ext.apply(this, config);
    },
    
    bind: function(target){
        var me = this;
        
        me.target = target;
        target.on('beforedestroy', me.disable, me);
        me.onContainerAdd(target);
    },
    
    unbind: function() {
        var me = this,
            target = me.target;
            
        if (target) {
            target.un('beforedestroy', me.disable, me);
        }
        me.items = null;
    },
    
    disable: function(){
        ++this.disabled;    
    },
    
    enable: function(){
        if (this.disabled > 0) {
            --this.disabled;
        }
    },
    
    handleAdd: function(ct, comp) {
        if (!this.disabled) {
            if (comp.is(this.selector)) {
                this.onItemAdd(comp.ownerCt, comp);
            }
        
            if (comp.isContainer) {
                this.onContainerAdd(comp);
            }
        }
    },
    
    onItemAdd: function(ct, comp){
        var me = this,
            items = me.items,
            handler = me.addHandler;
            
        if (!me.disabled) {
            if (handler) {
                handler.call(me.scope || comp, comp);
            }
            if (items) {
                items.add(comp);
            }
        }
    },
    
    onItemRemove: function(ct, comp){
        var me = this,
            items = me.items,
            handler = me.removeHandler;
            
        if (!me.disabled) {
            if (handler) {
                handler.call(me.scope || comp, comp);
            }
            if (items) {
                items.remove(comp);
            }
        }
    },
    
    onContainerAdd: function(ct, preventChildren) {
        var me = this,
            items, len,
            handleAdd = me.handleAdd,
            handleRemove = me.handleRemove,
            i, comp;
        
        ct.on('add', handleAdd, me);
        ct.on('dockedadd', handleAdd, me);
        ct.on('remove', handleRemove, me);
        ct.on('dockedremove', handleRemove, me);
        
        // Means we've been called by a parent container so the selector
        // matchers have already been processed
        if (preventChildren !== true) {
            items = ct.query(me.selector);
            for (i = 0, len = items.length; i < len; ++i) {
                comp = items[i];
                me.onItemAdd(comp.ownerCt, comp);
            }
        }
         
        items = ct.query('container');
        for (i = 0, len = items.length; i < len; ++i) {
            me.onContainerAdd(items[i], true);
        }
        
    },
    
    handleRemove: function(ct, comp) {
        var me = this;
            
        // During a destroy we don't want to maintain any of this information,
        // so typically we'll be disabled here
        if (!me.disabled) {
            if (comp.is(me.selector)) {
                me.onItemRemove(ct, comp);
            }
        
            if (comp.isContainer) {
                me.onContainerRemove(ct, comp);
            }
        }
    },
    
    onContainerRemove: function(ct, comp){
        var me = this,
            destroying = ct.destroying,
            items, i, len, item;
            
        // only need to unbind the listeners if the ct isn't destroying children
        if (!destroying) {
            me.removeCtListeners(comp);
        }
            
        items = comp.query(me.selector);
        for (i = 0, len = items.length; i < len; ++i) {
            item = items[i];
            me.onItemRemove(item.ownerCt, item);
        }
         
        if (!destroying) {   
            items = comp.query('container');
            for (i = 0, len = items.length; i < len; ++i) {
                me.removeCtListeners(items[i]);
            }
        }
    },
    
    removeCtListeners: function(comp){
        var me = this;
        comp.un('add', me.handleAdd, me);
        comp.un('dockedadd', me.handleAdd, me);
        comp.un('remove', me.handleRemove, me);
        comp.un('dockedremove', me.handleRemove, me);
    },
    
    getItems: function(){
        var me = this,
            items = me.items;
            
        if (!items) {
            items = me.items = new Ext.util.MixedCollection();
            items.addAll(me.target.query(me.selector));
        }
        return items;
    },
    
    invalidateItems: function(){
        this.items = null;
    }
});
