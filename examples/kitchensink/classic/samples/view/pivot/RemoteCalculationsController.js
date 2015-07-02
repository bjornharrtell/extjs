/**
 * Controls the remote calculations example.
 */
Ext.define('KitchenSink.view.pivot.RemoteCalculationsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.remotecalculations',

    onPivotDone: function(){
        var me = this,
            preview = Ext.ComponentQuery.query('#codePreview')[0],
            viewData = preview.down('#codeRemoteData'),
            viewParams = preview.down('#codeRemoteParams'),
            itemData = {
                xtype:  'codeContent',
                itemId: 'codeRemoteData',
                title:  'JSON response',
                html:   this.getJsonResponse()
            },
            itemParams = {
                xtype:  'codeContent',
                itemId: 'codeRemoteParams',
                title:  'Ajax params',
                html:   this.getAjaxParams()
            };

        if(!viewParams){
            viewParams = preview.add(Ext.clone(itemParams));

            me.getView().codePreviewProcessed.push(itemParams);
        }else{
            viewParams.setHtml(me.getAjaxParams());
        }

        if(!viewData){
            viewData = preview.add(Ext.clone(itemData));

            me.getView().codePreviewProcessed.push(itemData);
        }else{
            viewData.setHtml(me.getJsonResponse());
        }
    },

    getJsonResponse: function(){
        var text;

        // JSON.stringify is supported in most browsers
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
        text = '/**\n';
        text += ' * This is how the response sent back from the server should look like. \n';
        text += ' * The keys can be defined as you want but bear in mind that grid\n';
        text += ' * DOM elements will use them, so sanitize them.\n';
        text += ' */\n\n';
        text += JSON.stringify(Ext.ux.ajax.SimManager.getSimlet(this.getView().getMatrix().url).lastResponse, null, 4);

        return '<pre class="prettyprint">' + text + '</pre>';
    },

    getAjaxParams: function(){
        var text;

        // JSON.stringify is supported in most browsers
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
        text = '/**\n';
        text += ' * This is how the params sent to the Ajax call look like. \n';
        text += ' */\n\n';
        text += JSON.stringify(Ext.ux.ajax.SimManager.getSimlet(this.getView().getMatrix().url).lastPost, null, 4);

        return '<pre class="prettyprint">' + text + '</pre>';
    }
});
