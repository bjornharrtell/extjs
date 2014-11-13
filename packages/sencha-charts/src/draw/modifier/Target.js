/**
 * @class Ext.draw.modifier.Target
 * @extends Ext.draw.modifier.Modifier
 *
 * This is the destination (top) modifier that has to be put at
 * the top of the modifier stack.
 *
 * The Target modifier figures out which updaters have to be called
 * for the changed set of attributes and makes the sprite and its instances (if any)
 * call them.
 *
 */
Ext.define('Ext.draw.modifier.Target', {
    requires: ['Ext.draw.Matrix'],
    extend: 'Ext.draw.modifier.Modifier',
    alias: 'modifier.target',
    statics: {
        uniqueId: 0
    },

    /**
     * @inheritdoc
     */
    prepareAttributes: function (attr) {
        if (this._previous) {
            this._previous.prepareAttributes(attr);
        }
        attr.attributeId = 'attribute-' + Ext.draw.modifier.Target.uniqueId++;
        if (!attr.hasOwnProperty('canvasAttributes')) {
            attr.bbox = {
                plain: {dirty: true},
                transform: {dirty: true}
            };
            attr.dirty = true;
            // Maps updaters that have to be called to the attributes that triggered the update.
            // It is basically a reversed dirtyTriggers map (see Ext.draw.sprite.AttributeDefinition),
            // but only for those attributes that have changed.
            // dirtyFlags updaters are called by the sprite.updateDirtyFlags method.
            attr.dirtyFlags = {};
            // Holds the attributes (dirty flags) that triggered the canvas update.
            // Canvas attributes are applied directly to a canvas context
            // by the sprite.useAttributes method.
            attr.canvasAttributes = {};
            attr.matrix = new Ext.draw.Matrix();
            attr.inverseMatrix = new Ext.draw.Matrix();
        }
    },

    /**
     * @private
     * Applies the appropriate dirty flags from the modifier changes.
     * @param {Object} attr The source attributes.
     * @param {Object} changes The modifier changes.
     */
    setDirtyFlags: function (attr, changes) {
        Ext.apply(attr, changes);
        var sprite = this._sprite,
            dirtyTriggers = sprite.self.def._dirtyTriggers,
            name, dirtyFlags = attr.dirtyFlags, flags, any,
            triggers, trigger, i, ln, canvasNames;

        // TODO: Potential for optimization here?
        // TODO: Do we really need to build the dirtyFlags map every time?
        for (name in changes) {
            if ((triggers = dirtyTriggers[name])) {
                i = 0;
                while ((trigger = triggers[i++])) {
                    if (!(flags = dirtyFlags[trigger])) {
                        flags = dirtyFlags[trigger] = [];
                    }
                    flags.push(name);
                }
            }
        }

        for (name in changes) {
            any = true;
            break;
        }

        if (!any) {
            return;
        }

        // This can prevent sub objects to set duplicated attributes to context.
        if (dirtyFlags.canvas) {
            canvasNames = dirtyFlags.canvas;
            delete dirtyFlags.canvas;
            for (i = 0, ln = canvasNames.length; i < ln; i++) {
                name = canvasNames[i];
                attr.canvasAttributes[name] = attr[name];
            }
        }

        // If the attributes of an instancing sprite template are being modified here,
        // then spread the dirty flags to the instances (children).
        if (attr.hasOwnProperty('children')) {
            for (i = 0, ln = attr.children.length; i < ln; i++) {
                Ext.apply(attr.children[i].dirtyFlags, dirtyFlags);
                sprite.updateDirtyFlags(attr.children[i]);
            }
        }

        sprite.setDirty(true);
    },

    /**
     * @inheritdoc
     */
    popUp: function (attributes, changes) {
        this.setDirtyFlags(attributes, changes);
        this._sprite.updateDirtyFlags(attributes);
    },

    /**
     * @inheritdoc
     */
    pushDown: function (attr, changes) {
        if (this._previous) {
            changes = this._previous.pushDown(attr, changes);
        }
        this.setDirtyFlags(attr, changes);
        this._sprite.updateDirtyFlags(attr);
        return changes;
    }
});
