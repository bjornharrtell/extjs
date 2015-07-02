/**
 * Displays a list of Votes
 */
Ext.define('GeoCon.view.vote.List', {
    extend: 'Ext.dataview.List',

    id: 'voteList',

    config: {
        store: 'Votes',
        grouped: true,
        variableHeights: true,
        useSimpleItems: true,
        disableSelection: true,

        itemTpl: Ext.create('Ext.XTemplate',
            '<div class="vote">',
                '{question}',
                '<div class="results">',
                    '{result} {[this.voteBreakdown(values.vote_breakdown)]} {[this.required(values.required)]}',
                '<div>',
            '</div>',
            {
                voteBreakdown: function(voteBreakdown) {
                    var str = '';

                    if (voteBreakdown.total) {
                        str = voteBreakdown.total.Yea + '-' + voteBreakdown.total.Nay;

                        if (voteBreakdown.total['Not Voting']) {
                            str += ", " + voteBreakdown.total['Not Voting'] + " not voting";
                        }
                    }

                    return str;
                },

                required: function(required) {
                    return required ? '(' + required + ' required)' : '';
                }
            }
        )
    }
});
