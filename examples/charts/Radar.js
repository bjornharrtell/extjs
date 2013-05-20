Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit', 'Ext.window.MessageBox']);

Ext.onReady(function () {
    
    var seriesConfig = function(field) {
        return {
            type: 'radar',
            xField: 'name',
            yField: field,
            showInLegend: true,
            showMarkers: true,
            markerConfig: {
                radius: 5,
                size: 5
            },
            tips: {
                trackMouse: true,
                width: 100,
                height: 28,
                renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get(field));
                }
            },
            style: {
                'stroke-width': 2,
                fill: 'none'
            }
        }
    },

    chart = Ext.create('Ext.chart.Chart', {
            style: 'background:#fff',
            theme: 'Category2',
            animate: true,
            store: store1,
            insetPadding: 20,
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Radial',
                position: 'radial',
                label: {
                    display: true
                }
            }],
            series: [
                seriesConfig('data1'),
                seriesConfig('data2'),
                seriesConfig('data3')
            ]
        });

    var win = Ext.create('Ext.Window', {
        width: 800,
        height: 600,
        minHeight: 400,
        minWidth: 550,
        hidden: false,
        shadow: false,
        maximizable: true,
        style: 'overflow: hidden;',
        title: 'Radar Chart',
        renderTo: Ext.getBody(),
        layout: 'fit',
        tbar: [{
            text: 'Save Chart',
            handler: function() {
                Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
                    if(choice == 'yes'){
                        chart.save({
                            type: 'image/png'
                        });
                    }
                });
            }
        }, {
            text: 'Reload Data',
            handler: function() {
                // Add a short delay to prevent fast sequential clicks
                window.loadTask.delay(100, function() {
                    store1.loadData(generateData());
                });
            }
        }, {
            enableToggle: true,
            pressed: true,
            text: 'Animate',
            toggleHandler: function(btn, pressed) {
                chart.animate = pressed ? { easing: 'ease', duration: 500 } : false;
            }
        }],
        items: chart
    }); 
});
