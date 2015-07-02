Ext.define('TouchTomatoes.view.WelcomeOverlay', {
    extend: 'Ext.Panel',
    xtype: "main",

    config: {
        cls: "welcomeOverlay",
        html: [
            "<div class='message'>",
                "<h2>Welcome to <em>Touch Tomatoes</em></h2>",
                "<p>Browse any of our lists by selecting a tab at the bottom, or swiping across the app. <br/>You can find a movie in our search section.</p>",
                "<div class='tap'>Tap anywhere to begin</div>",
            "</div>"
        ].join(""),
        hidden:true,
        showAnimation:  Ext.browser.is.ie || Ext.browser.is.AndroidStock ? null : {
            type: "fadeIn",
            duration: 250
        },
        hideAnimation: Ext.browser.is.ie || Ext.browser.is.AndroidStock ? null : {
            type: "fadeOut",
            duration: 250
        }
    },

    initialize: function() {
        this.element.on({
            tap: {
                fn: function() {
                    this.hide();
                },
                single:true,
                scope:this
            }
        })
    }
});