Ext.define('Calendar.view.profile.SideViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.app-side',

    formulas: {
        icon: function(get) {
            var user = get('user');
            if (user && user.icon) {
                return user.icon;
            } else {
                return './resources/images/guest.png';
            }
        }
    }
});
