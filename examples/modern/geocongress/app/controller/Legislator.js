Ext.define('GeoCon.controller.Legislator', {
    extend: 'Ext.app.Controller',

    requires: ['GeoCon.view.legislator.TabPanel', 'GeoCon.view.bill.Show'],

    config: {
        control: {
            '#legislatorTabPanel': {
                activate: 'onLegislatorShow'
            },
            '#legislatorList': {
                itemtap: 'onLegislatorTap'
            },
            '#billList': {
                activate: 'onBillListActivate',
                itemtap: 'onBillTap'
            },
            '#voteList': {
                activate: 'onVoteListActivate'
            },
            '#legislatorBackButton': {
                tap: function() {
                    Ext.getCmp('splashScreen').animateTo('right');
                    Ext.getCmp('viewport').setActiveItem(Ext.getCmp('splashScreen'));
                }
            },
            '#billSummaryBackButton': {
                tap: function() {
                    Ext.getCmp('splashScreen').animateTo('right');
                    Ext.getCmp('viewport').setActiveItem(Ext.getCmp('legislatorTabPanel'));
                }
            }
        }
    },

    onLegislatorShow: function() {
        Ext.getCmp('viewport').getLayout().getAnimation().setReverse(false);
    },

    onBillListActivate: function() {

        if (this.currentBills != this.currentLegislator.bioguide_id) {
            Ext.getStore('Bills').load({
                params: {
                    sponsor_id: this.currentLegislator.bioguide_id
                }
            });
            this.currentBills = this.currentLegislator.bioguide_id;
        }
    },

    onBillTap: function(dataview, index, target, record) {

        var billSummary = Ext.getCmp('billSummary');
        Ext.getCmp('splashScreen').animateTo('left');

        if (billSummary) {
            billSummary.setData(record.data);
            Ext.getCmp('viewport').setActiveItem(billSummary);
        } else {
            Ext.getCmp('viewport').setActiveItem({
                xclass: 'GeoCon.view.bill.Show',
                data: record.data
            });
        }

        Ext.getCmp('billSummaryToolbar').setTitle(record.data.bill_id);
    },

    onVoteListActivate: function() {

        if (this.currentVotes != this.currentLegislator.bioguide_id) {

            var storeParams = {};
            storeParams['voter_ids.' + this.currentLegislator.bioguide_id + '__exists'] = true;

            Ext.getStore('Votes').load({
                params: storeParams
            });

            this.currentVotes = this.currentLegislator.bioguide_id;
        }
    },

    onLegislatorTap: function(dataview, index, target, record) {

        if (this.currentLegislator == record.data) {
            Ext.getCmp('viewport').setActiveItem(1);
            return;
        }

        this.currentLegislator = record.data;

        this.currentLegislator.committees = Ext.getStore('Committees').load({
            params: {
                member_ids: this.currentLegislator.bioguide_id
            }
        });

        var legislator = Ext.getCmp('legislatorTabPanel');
        Ext.getCmp('splashScreen').animateTo('left');

        if (legislator) {
            legislator.setData(this.currentLegislator);
            Ext.getCmp('viewport').setActiveItem(1);
        } else {
            Ext.getCmp('viewport').setActiveItem({
                xclass: 'GeoCon.view.legislator.TabPanel'
            });
        }

        Ext.getCmp('legislatorBio').setData(this.currentLegislator);
        Ext.getCmp('legislatorToolbar').setTitle(this.currentLegislator.title + " " + this.currentLegislator.last_name);
        Ext.getCmp('legislatorTabPanel').setActiveItem(0);
    }

});
