Ext.define('States.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.layout.VBox'],
    //compositePanel
    config: {
        refs: {
            compPanelV: "#compositePanelV",
            compPanelH: "#compositePanelH",
            genderPanel: "#genderPanel",
            racePanel: "#racePanel"
        },
        control: {
            viewport: {
                orientationchange: 'onOrientationChange'
            }
        }
    },

    // TODO: remove this after control for 'viewport' is enabled.
    launch: function () {
        Ext.Viewport.onBefore('orientationchange', 'onOrientationChange', this);
        this.onOrientationChange(Ext.Viewport, Ext.Viewport.getOrientation());
    },

    onOrientationChange: function (viewport, orientation) {
        var cmpPanelV = this.getCompPanelV(),
            cmpPanelH = this.getCompPanelH();
        if (orientation === 'landscape') {
            cmpPanelH.setHeight(0);
            cmpPanelV.setWidth(350);
            cmpPanelV.add(this.getGenderPanel());
            cmpPanelV.add(this.getRacePanel());
        } else {
            cmpPanelV.setWidth(0);
            cmpPanelH.setHeight(250);
            cmpPanelH.add(this.getGenderPanel());
            cmpPanelH.add(this.getRacePanel());
        }
    }
});