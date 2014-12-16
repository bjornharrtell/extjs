/**
 * A small abstract class that contains the shared behaviour for any summary
 * calculations to be used in the grid.
 */
Ext.define('Ext.grid.feature.AbstractSummary', {

    extend: 'Ext.grid.feature.Feature',

    alias: 'feature.abstractsummary',

    summaryRowCls: Ext.baseCSSPrefix + 'grid-row-summary',
    summaryRowSelector: '.' + Ext.baseCSSPrefix + 'grid-row-summary',

    readDataOptions: {
        recordCreator: Ext.identityFn
    },

    // High priority rowTpl interceptor which sees summary rows early, and renders them correctly and then aborts the row rendering chain.
    // This will only see action when summary rows are being updated and Table.onUpdate->Table.bufferRender renders the individual updated sumary row.
    summaryRowTpl: {
        fn: function(out, values, parent) {
            // If a summary record comes through the rendering pipeline, render it simply instead of proceeding through the tplchain
            if (values.record.isSummary && this.summaryFeature.showSummaryRow) {
                this.summaryFeature.outputSummaryRecord(values.record, values, out, parent);
            } else {
                this.nextTpl.applyOut(values, out, parent);
            }
        },
        priority: 1000
    },

   /**
    * @cfg {Boolean}
    * True to show the summary row.
    */
    showSummaryRow: true,

    // Listen for store updates. Eg, from an Editor.
    init: function() {
        var me = this;
        me.view.summaryFeature = me;
        me.rowTpl = me.view.self.prototype.rowTpl;

        // Add a high priority interceptor which renders summary records simply
        // This will only see action ona bufferedRender situation where summary records are updated.
        me.view.addRowTpl(me.summaryRowTpl).summaryFeature = me;
        
        // Define on the instance to store info needed by summary renderers.
        me.summaryData = {};
        me.groupInfo = {};

        // Cell widths in the summary table are set directly into the cells. There's no <colgroup><col>
        // Some browsers use content box and some use border box when applying the style width of a TD
        if (!me.summaryTableCls) {
            me.summaryTableCls = Ext.baseCSSPrefix + 'grid-item';
        }
    },

    /**
     * Toggle whether or not to show the summary row.
     * @param {Boolean} visible True to show the summary row
     */
    toggleSummaryRow: function(visible /* private */, fromLockingPartner) {
        var me = this,
            prev = me.showSummaryRow,
            doRefresh;

        visible = visible != null ? !!visible : !me.showSummaryRow;
        me.showSummaryRow = visible;
        if (visible && visible !== prev) {
            // If being shown, something may have changed while not visible, so
            // force the summary records to recalculate
            me.updateNext = true;
        }

        // If there is another side to be toggled, then toggle it (as long as we are not already being commanded from that other side);
        // Then refresh the whole arrangement.
        if (me.lockingPartner) {
            if (!fromLockingPartner) {
                me.lockingPartner.toggleSummaryRow(visible, true);
                doRefresh = true;
            }
        } else {
            doRefresh = true;
        }
        if (doRefresh) {
            me.grid.ownerGrid.getView().refresh();
        }
    },

    createRenderer: function (column, record) {
        var me = this,
            ownerGroup = record.ownerGroup,
            summaryData = ownerGroup ? me.summaryData[ownerGroup] : me.summaryData,
            // Use the column.getItemId() for columns without a dataIndex. The populateRecord method does the same.
            dataIndex = column.dataIndex || column.getItemId();

        return function (value, metaData) {
             return column.summaryRenderer ?
                column.summaryRenderer(record.data[dataIndex], summaryData, dataIndex, metaData) :
                // For no summaryRenderer, return the field value in the Feature record.
                record.data[dataIndex];
        };
    },

    outputSummaryRecord: function(summaryRecord, contextValues, out) {
        var view = contextValues.view,
            savedRowValues = view.rowValues,
            columns = contextValues.columns || view.headerCt.getVisibleGridColumns(),
            colCount = columns.length, i, column,
            // Set up a row rendering values object so that we can call the rowTpl directly to inject
            // the markup of a grid row into the output stream.
            values = {
                view: view,
                record: summaryRecord,
                rowStyle: '',
                rowClasses: [ this.summaryRowCls ],
                itemClasses: [],
                recordIndex: -1,
                rowId: view.getRowId(summaryRecord),
                columns: columns
            };

        // Because we are using the regular row rendering pathway, temporarily swap out the renderer for the summaryRenderer
        for (i = 0; i < colCount; i++) {
            column = columns[i];
            column.savedRenderer = column.renderer;

            if (column.summaryType || column.summaryRenderer) {
                column.renderer = this.createRenderer(column, summaryRecord);
            } else {
                column.renderer = Ext.emptyFn;
            }
        }

        // Use the base template to render a summary row
        view.rowValues = values;
        view.self.prototype.rowTpl.applyOut(values, out, parent);
        view.rowValues = savedRowValues;

        // Restore regular column renderers
        for (i = 0; i < colCount; i++) {
            column = columns[i];
            column.renderer = column.savedRenderer;
            column.savedRenderer = null;
        }
    },

    /**
     * Get the summary data for a field.
     * @private
     * @param {Ext.data.Store} store The store to get the data from
     * @param {String/Function} type The type of aggregation. If a function is specified it will
     * be passed to the stores aggregate function.
     * @param {String} field The field to aggregate on
     * @param {Boolean} group True to aggregate in grouped mode
     * @return {Number/String/Object} See the return type for the store functions.
     * if the group parameter is `true` An object is returned with a property named for each group who's
     * value is the summary value.
     */
    getSummary: function (store, type, field, group) {
        var isGrouped = !!group,
            item = isGrouped ? group : store;
        
        if (type) {
            if (Ext.isFunction(type)) {
                if (isGrouped) {
                    return item.aggregate(field, type);
                } else {
                    return item.aggregate(type, null, false, [field]);
                }
            }

            switch (type) {
                case 'count':
                    return item.count(field);
                case 'min':
                    return item.min(field);
                case 'max':
                    return item.max(field);
                case 'sum':
                    return item.sum(field);
                case 'average':
                    return item.average(field);
                default:
                    return '';

            }
        }
    },

    generateSummaryData: function (groupField) {
        var me = this,
            reader = me.view.store.getProxy().getReader(),
            convertedSummaryRow = {},
            remoteData = {},
            i, len, root, summaryRows;

        // reset reader root and rebuild extractors to extract summaries data
        root = reader.getRootProperty();
        reader.setRootProperty(me.remoteRoot);
        reader.buildExtractors(true);
        summaryRows = reader.getRoot(reader.rawData);

        if (summaryRows) {
            if (!Ext.isArray(summaryRows)) {
                summaryRows = [summaryRows];
            }

            len = summaryRows.length;

            for (i = 0; i < len; ++i) {
                // Convert a raw data row into a Record's hash object using the Reader.
                convertedSummaryRow = reader.extractRecordData(summaryRows[i], me.readDataOptions);
                if (groupField) {
                    remoteData[convertedSummaryRow[groupField]] = convertedSummaryRow;
                }
            }
        }

        // Restore initial reader configuration.
        reader.setRootProperty(root);
        reader.buildExtractors(true);

        return groupField ? remoteData : convertedSummaryRow;
    },

    setSummaryData: function (record, colId, summaryValue, groupName) {
        var summaryData = this.summaryData;

        if (groupName) {
            if (!summaryData[groupName]) {
                summaryData[groupName] = {};
            }
            summaryData[groupName][colId] = summaryValue;
        } else {
            summaryData[colId] = summaryValue;
        }
    },

    populateRecord: function (group, groupInfo, remoteData) {
        var me = this,
            view = me.grid.ownerLockable ? me.grid.ownerLockable.view : me.view,
            store = me.view.getStore(),
            record = me.getAggregateRecord(group),
            // Use the full column set, regardless of locking
            columns = view.headerCt.getGridColumns(),
            len = columns.length,
            groupName = group.getGroupKey(),
            groupData, field, i, column, fieldName, summaryValue;

        record.beginEdit();

        if (remoteData) {
            // Remote summary grouping provides the grouping totals so there's no need to
            // iterate throught the columns to map the column's dataIndex to the field name.
            // Instead, enumerate the grouping record and set the field in the aggregate
            // record for each one.
            groupData = remoteData[groupName];
            for (field in groupData) {
                if (groupData.hasOwnProperty(field)) {
                    if (field !== record.idProperty) {
                        record.set(field, groupData[field]);
                    }
                }
            }
        }

        // Here we iterate through the columns with two objectives:
        //    1. For local grouping, get the summary for each column and update the record.
        //    2. For both local and remote grouping, set the summary data object
        //       which is passed to the summaryRenderer (if defined).
        for (i = 0; i < len; ++i) {
            column = columns[i];
            // Use the column id if there's no mapping, could be a calculated field
            fieldName = column.dataIndex || column.getItemId();

            // We need to capture the summary value because it could get overwritten when
            // setting on the model if there is a convert() method on the model.
            if (!remoteData) {
                summaryValue = me.getSummary(store, column.summaryType, fieldName, group);
                record.set(fieldName, summaryValue);
            } else {
                // For remote groupings, just get the value from the model.
                summaryValue = record.get(column.dataIndex);
            }

            // Capture the columnId:value for the summaryRenderer in the summaryData object.
            me.setSummaryData(record, column.getItemId(), summaryValue, groupName);
        }

        // Poke on the owner group for easy lookup in this.createRenderer().
        record.ownerGroup = groupName;

        record.endEdit(true);
        record.commit();

        return record;
    },
    
    getGroupInfo: function(group) {
        var groupInfo = this.groupInfo,
            key = group.getGroupKey(),
            item = groupInfo[key];
        
        if (!item) {
            item = groupInfo[key] = {
                lastGeneration: null,
                aggregateRecord: new Ext.data.Model()
            };
        }
        return item;
    },

    getAggregateRecord: function(group, forceNew) {
        var rec;

        if (forceNew === true || group.dirty || !group.aggregateRecord) {
            rec = new Ext.data.Model();
            group.aggregateRecord = rec;
            rec.isNonData = rec.isSummary = true;
        }
        return group.aggregateRecord;
    }
});
