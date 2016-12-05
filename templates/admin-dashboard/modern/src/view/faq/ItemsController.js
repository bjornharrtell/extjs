Ext.define('Admin.view.faq.ItemsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.faqitems',

    animateBody: function (body, from, to) {
        var view = this.getView();

        body.animate({
            duration: 200,

            from: {
                height: from
            },
            to: {
                height: to
            }
        });
    },

    collapseBody: function (node) {
        var body = node.down('.faq-body'),
            height = body.getHeight();

        // Removing this class will restore height:0, so we need to pass the measured
        // height as "from" when we animate.
        node.removeCls('faq-expanded');

        this.animateBody(body, height, 0);
    },

    expandBody: function (node) {
        var body = node.down('.faq-body'),
            height;

        // The body has height:0 in CSS, so block that so we can measure it.
        body.setStyle('height', 'auto');
        height = body.getHeight();

        // This class will also block the height:0 so we'll need to pass "from"
        // to animate.
        node.addCls('faq-expanded');

        this.animateBody(body, 0, height);
    },

    onItemTap: function (sender, index, target, record, event) {
        var me = this,
            hit = event.getTarget(),
            cursor = hit && Ext.fly(hit).getStyle('cursor'),
            expanded;

        // Check if the element tapped is styled as a pointer and toggle if so.
        if (cursor === 'pointer') {
            if (target.hasCls('faq-expanded')) {
                me.collapseBody(target);
            } else {
                // If the target is not expanded, we may need to collapse the currently
                // expanded item.

                expanded = sender.element.down('.faq-expanded');
                if (expanded) {
                    me.collapseBody(expanded);
                }

                me.expandBody(target);
            }
        }
    }
});
