Ext.define('Ticket.view.dashboard.DashboardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dashboard',
    
    formulas: {
        theProject: function(get) {
            return get('projects.selection');
        },
        projectId: function(get) {
            return get('theProject.id');
        },
        hasProject: function(get) {
            return !!get('theProject');
        }
    },
    
    stores: {
        ticketStatusSummary: {
            model: 'TicketStatusSummary',
            autoLoad: true,
            remoteFilter: true,
            filters: [{
                property: 'projectId',
                value: '{projectId}'    
            }]
        },
        ticketOpenSummary: {
            model: 'TicketOpenSummary',
            autoLoad: true,
            remoteFilter: true,
            filters: [{
                property: 'projectId',
                value: '{projectId}'    
            }]
        },
        myActiveTickets: {
            model: 'Ticket',
            autoLoad: true,
            remoteFilter: true,
            filters: [{
                property: 'assigneeId',
                value: '{currentUser.id}'
            }, {
                property: 'projectId',
                value: '{projectId}'
            }, {
                property: 'status',
                value: 2
            }]
        },
        sortedUsers: {
            source: '{projects.selection.users}',
            sorters: [{
                property: 'name',
                direction: 'DESC'
            }]
        }
    }
});
