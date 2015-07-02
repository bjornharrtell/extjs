Ext.define('States.view.Main', {
    extend: 'Ext.Panel',
    config: {
        layout: 'fit',
        style: 'background: white',
        items: [
            {
                xtype: 'titlebar',
                id: 'titlebar',
                ui: 'light',
                title: '2010 Census Data - USA',
                docked: 'top'
            },
            {
                xclass: 'Ext.Carousel',
                direction: 'horizontal',
                defaults: {
                    layout: 'fit',
                    style: 'background: white;  padding-bottom: 30px'
                },
                items: [
                    {
                        title: 'Map',
                        items: [
                            {
                                xclass: "States.view.USMap",
                                store: "GeoStore"
                            }
                        ]
                    },
                    {
                        title: 'Population',
                        items: [
                            {
                                xclass: "States.view.Population"
                            }
                        ]
                    }
                ]
            },
            {
                layout: 'vbox',
                width : 350,
                docked: 'right',
                id: 'compositePanelV',
                items: [
                    {
                        flex: 1,
                        layout: 'fit',
                        id: 'genderPanel',
                        items: {
                            xclass: "States.view.Gender",
                            innerPadding: {
                                left: 10
                            }
                        }
                    },
                    {
                        flex: 1,
                        layout: 'fit',
                        id: 'racePanel',
                        items: {
                            xclass: "States.view.Race"
                        }
                    }
                ]
            },
            {
                layout: 'hbox',
                height: 0,
                docked: 'bottom',
                id: 'compositePanelH'
            }
        ]
    }
});