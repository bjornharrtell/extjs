/**
 * This example shows various options for constraining draggable items.
 */
Ext.define('KitchenSink.view.drag.Constraint', {
    extend: 'Ext.Component',
    xtype: 'drag-constraint',

    // <example>
    requires: ['KitchenSink.view.drag.ConstraintController'],
    otherContent: [{
        type: 'Controller',
        path: 'modern/src/view/drag/ConstraintController.js'
    }],
    // </example>

    controller: 'drag-constraint',
    cls: 'stretch-html',
    padding: 5,
    html: '<div class="constrain-drag-ct">' + 
              '<div class="constrain-parent constrain-source">To parent</div>' + 
          '</div>' + 
          '<div class="constrain-vertical constrain-source">Vertical</div>' + 
          '<div class="constrain-horizontal constrain-source">Horizontal</div>' + 
          '<div class="constrain-snap constrain-source">snap: 60,50</div>'
});
