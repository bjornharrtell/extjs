Ext.define('Oreilly.view.Location', {

	extend: 'Ext.Container',
	requires: 'Ext.BingMap',

	xtype: 'location',

	config: {

		title: 'Location',
		iconCls: 'x-fa fa-map-marker',

		layout: 'fit',

		items: [
			{
				docked: 'top',
				xtype: 'toolbar',
				title: 'Location'
			}
		]
	},

	initialize: function() {
		var position = new Microsoft.Maps.Location(Oreilly.app.mapCenter[0], Oreilly.app.mapCenter[1]),
			map;

		this.callParent();

        var mapCallback = function(){
            var bingMap = map.getMap();
            var infobox = new Microsoft.Maps.Infobox(position, {
                description: Oreilly.app.mapText, visible: true, offset: new Microsoft.Maps.Point(0, 10), height: 100,width:180
            });
            bingMap.entities.clear();
            var pushpin= new Microsoft.Maps.Pushpin(bingMap.getCenter(), null);
            pushpinClick= Microsoft.Maps.Events.addHandler(pushpin, 'click', function() {
                bingMap.entities.push(infobox);
                infobox.setOptions({visible:true});
            });
            bingMap.entities.push(pushpin);
        };

		map = this.add({
			xtype: 'bingmap',
			mapOptions: {
				center: position,
		        mapTypeId: Microsoft.Maps.MapTypeId.ROADMAP,
                callback: mapCallback
			}
	    });
	}
});