Ext.define('Admin.view.main.dashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboardController',
    listen : {
        controller : {
            '#' : {
                unmatchedroute : 'routeChange'
            }
        }
    },
    routeChange:function(){
        var nextview  = window.location.hash.substring(1);
        var flag = false;
        var title;
        var menuData = Ext.getStore('NavigationTree').data.items;
   		for(i=0;i<menuData.length;i++){
   			if(menuData[i].data.view){
   				if(menuData[i].data.view == nextview){
            title = menuData[i].data.text;
   					flag = true;
   					break;
   				}
   					
   			}else{
   				for(j=0;j<menuData[i].data.children.length;j++){
   					if(menuData[i].data.children[j].view==nextview){
              title = menuData[i].data.children[j].text;
   						flag=true;
   						break;
   					}
   				}
   			}
   		}
   		if(flag){
   			this.setCurrentView(nextview,title);
   		}else{
   			this.setCurrentView('pages.Error404Window','Error 404');
   		}
    },
    setCurrentView: function(currentView,title){
    	var newView = Ext.create('Admin.view.'+ currentView);
    	Ext.Viewport.down('navigationview').push(newView);
      Ext.Viewport.down('MainNavigationView').getNavigationBar().setTitle(title);

    }	

});