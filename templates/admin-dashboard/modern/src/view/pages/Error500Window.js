Ext.define('Admin.view.pages.Error500Window', {
    extend: 'Ext.Container',
    xtype:'Error500Window',
    items:[
    	{
    		xtype:'panel',
    		flex:1,
    		html:'<h1>Error 500</h1>'
    	}
    ]
});