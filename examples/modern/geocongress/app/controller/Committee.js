/**
 * Controls the list of committees for a Legislator
 */
Ext.define('GeoCon.controller.Committee', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.MessageBox'],

    config: {
        control: {
            '#committeeList': {
                itemtap: 'onCommitteeTap'
            }
        }
    },

    onCommitteeTap: function(dataview, index, target, record) {
        Ext.Msg.confirm("Confirmation", "This link will open in a new window. Are you sure?", function(result) {
            if (result == 'yes') {
                window.location = 'http://www.govtrack.us/congress/committee.xpd?id=' + record.getId();
            }
        });
    }
});
