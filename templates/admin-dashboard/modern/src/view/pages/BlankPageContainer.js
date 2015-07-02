Ext.define('Admin.view.pages.BlankPageContainer', {
    extend: 'Ext.Container',
    xtype:'BlankPageContainer',
    layout:'vbox',
    items:[
    	{
    		xtype:'panel',
    		flex:1,
    		 layout: {
		        type: 'vbox',
		        pack:'center',
        		align: 'center'
		    },
		    items:[
		    	{
		    		xtype:'panel',
		    		style:'background:#ccc',
		    		height:100,
		    		width:100
		    	},
		    	{
		    		xtype:'panel',
		    		html:'<div>Comming soon!</div><div>Stay tuned for updates</div>'

		    	}
		    ]

    	}
    ]
});