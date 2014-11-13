/**
 * This type of association is similar to {@link Ext.data.schema.ManyToOne many-to-one},
 * except that the {@link Ext.data.field.Field#cfg-reference reference} field also has set
 * {@link Ext.data.field.Field#cfg-unique unique} to `true`.
 *
 * While this type of association helps handle both sides of the association properly, it
 * is problematic to enforce the uniqueness aspect. If the database were to enforce this
 * uniqueness constraint, it would limit the field to be non-nullable. Even if this were
 * acceptable, this also creates challenges for a "soft-delete" strategy where records are
 * kept in the table, but only marked as "deleted" in a field.
 * 
 * Ensuring uniqueness on the client-side is also difficult. So, at the present time, this
 * is not enforced.
 */
Ext.define('Ext.data.schema.OneToOne', {
    extend: 'Ext.data.schema.Association',

    isOneToOne: true,

    isToOne: true,

    kind: 'one-to-one',

    Left: Ext.define(null, {
        extend: 'Ext.data.schema.Role',

        onDrop: function(rightRecord, session) {
            rightRecord[this.role] = null;
        },

        createGetter: function() {
            var me = this;
            return function () {
                // 'this' refers to the Model instance inside this function
                return me.doGet(this);
            };
        },

        createSetter: function () {
            var me = this;
            return function (value) {
                // 'this' refers to the Model instance inside this function
                return me.doSet(this, value);
            };
        },

        doGet: function (rightRecord) {
            // Consider the Department entity with a managerId to a User entity. The
            // Department is on the left (the FK holder's side) so we are implementing the
            // guts of the getManagerDepartment method we place on the User entity. Since
            // we represent the "managerDepartment" role and as such our goal is to get a
            // Department instance, we start that from the User (rightRecord). Sadly that
            // record has no FK back to us.

            var propertyName = this.role, // ex "managerDepartment"
                ret = rightRecord[propertyName],
                session = rightRecord.session;

            if (!ret && session) {
                // @TODO: session - we'll cache the result on the record as always
                // but to get it we must ask the session
            }

            return ret || null;
        },

        doSet: function (rightRecord, leftRecord) {
            // We are the guts of the setManagerDepartment method we place on the User
            // entity. Our goal here is to establish the relationship between the new
            // Department (leftRecord) and the User (rightRecord).

            var propertyName = this.role, // ex "managerDepartment"
                ret = rightRecord[propertyName],
                inverseSetter = this.inverse.setterName;  // setManager for Department

            if (ret !== leftRecord) {
                rightRecord[propertyName] = leftRecord;

                if (inverseSetter) {
                    // Because the FK is owned by the inverse record, we delegate the
                    // majority of work to its setter. We've already locked in the only
                    // thing we keep on this side so we won't recurse back-and-forth.
                    leftRecord[inverseSetter](rightRecord);
                }
            }

            return ret;
        },

        read: function(rightRecord, node, fromReader, readOptions) {
            var me = this,
                result = me.callParent([ rightRecord, node, fromReader, readOptions ]),
                leftRecord = result.getRecords()[0],
                name = me.role;

            if (leftRecord) {
                leftRecord[me.inverse.role] = rightRecord;

                rightRecord[name] = leftRecord;
                // Inline associations should *not* arrive on the "data" object:
                delete rightRecord.data[name];
            }
        }
    }),

    Right: Ext.define(null, {
        extend: 'Ext.data.schema.Role',

        left: false,
        side: 'right',
        
        createGetter: function() {
            // As the target of the FK (say "manager" for the Department entity) this
            // getter is responsible for getting the entity referenced by the FK value.
            var me = this;

            return function (options, scope) {
                // 'this' refers to the Model instance inside this function
                return me.doGetFK(this, options, scope);
            };
        },
        
        createSetter: function() {
            var me = this;

            return function(value, options, scope) {
                // 'this' refers to the Model instance inside this function
                return me.doSetFK(this, value, options, scope);
            };
        },

        onDrop: function(leftRecord, session) {
            var me = this,
                field = me.association.field,
                rightRecord, id;

            if (me.inverse.owner) {
                if (session) {
                    id = leftRecord.get(field.name);
                    if (id || id === 0) {
                        rightRecord = session.getEntry(me.cls, id).record;
                        if (rightRecord) {
                            rightRecord.drop();
                        }
                    }
                } else {
                    rightRecord = me.getAssociatedItem(leftRecord);
                    if (rightRecord) {
                        rightRecord.drop();
                    }
                }
            }
             
            if (field) {
                leftRecord.set(field.name, null);
            }
            leftRecord[me.role] = null;
        },

        onValueChange: function(leftRecord, session, newValue) {
            // Important to get the record before changing the key.
            var me = this,
                rightRecord = me.getAssociatedItem(leftRecord);

            leftRecord.changingKey = true;
            me.doSetFK(leftRecord, newValue);
            if (me.inverse.owner && rightRecord) {
                me.association.schema.queueKeyCheck(rightRecord, me);
            }
            leftRecord.changingKey = false;
        },

        checkKeyForDrop: function(rightRecord) {
            var leftRecord = this.inverse.getAssociatedItem(rightRecord);
            if (!leftRecord) {
                // Not reassigned to another parent
                rightRecord.drop();
            }
        },
        
        read: function(leftRecord, node, fromReader, readOptions) {
            var me = this,
                result = me.callParent([ leftRecord, node, fromReader, readOptions ]),
                rightRecord = result.getRecords()[0],
                name = me.role,
                field = this.association.field,
                session = leftRecord.session,
                oldId;

            if (rightRecord) {
                rightRecord[me.inverse.role] = leftRecord;

                leftRecord[name] = rightRecord;
                // Inline associations should *not* arrive on the "data" object:
                delete leftRecord.data[name];

                // We want to poke the inferred key onto record if it exists, but we don't
                // want to mess with the dirty or modified state of the record.
                if (field) {
                    oldId = leftRecord.data[field.name];
                    if (oldId !== rightRecord.id) {
                        leftRecord.data[field.name] = rightRecord.id;
                        if (session) {
                            session.updateReference(leftRecord, field, rightRecord.id, oldId);
                        }
                    }
                }
            }
        }
    })
});
