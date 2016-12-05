/**
 * This example shows various options for constraining draggable items.
 */
Ext.define('KitchenSink.view.drag.Constraint', {
    extend: 'Ext.panel.Panel',
    xtype: 'drag-constraint',
    controller: 'drag-constraint',

    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'classic/samples/view/drag/ConstraintController.js'
    }],
    //</example>

    title: 'Drag Constraints',
    width: 800,
    height: 500,
    bodyPadding: 5,

    html:
        '<div class="constrain-drag-ct">' +
            '<div class="constrain-parent constrain-source">To parent</div>' +
        '</div>' +
        '<div class="constrain-vertical constrain-source">Vertical</div>' +
        '<div class="constrain-horizontal constrain-source">Horizontal</div>' +
        '<div class="constrain-snap constrain-source">snap: 60,50</div>'
});
