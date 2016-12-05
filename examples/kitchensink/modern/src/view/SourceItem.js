Ext.define('KitchenSink.view.SourceItem', {
    extend: 'Ext.Panel',
    xtype: 'sourceitem',

    cls: 'ux-code',
    styleHtmlContent: true,
    scrollable: true,
    padding: 8,

    exampleRe: /^\s*\/\/\s*(\<\/?example\>)\s*$/,

    clearExampleTags: function (text) {
        var lines = text.split('\n'),
            removing = false,
            keepLines = [],
            len = lines.length,
            exampleRe = this.exampleRe,
            i, line;

        for (i = 0; i < len; ++i) {
            line = lines[i];
            if (removing) {
                if (exampleRe.test(line)) {
                    removing = false;
                }
            } else if (exampleRe.test(line)) {
                removing = true;
            } else {
                keepLines.push(line);
            }
        }

        return keepLines.join('\n');
    },

    applyHtml: function(html) {
        html = this.clearExampleTags(html);
        html = html.replace(/</g, '&lt;');
        html = html.replace(/\r/g, '');
        return '<pre style="line-height: 14px; padding-left: 5px" class="prettyprint">' + html + '</pre>';
    }
});
