/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Admin.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Admin',

    // requires: [
    //     'Ext.Widget',
    // ],
    models: [
        'PersonalInfo',
        'PanelSetting',
        'YearwiseData',
        'DataXY',
        'MultiDataXY',
        'email.Friend',
        'email.Email',
        'Subscription',
        'FriendsList',
        'ChatMessages'
    ],
    stores: [
        'NavigationTree'
    ],
    views: [
        'main.Viewport',
        'dashboard.MainContainer',
        'main.MainNavigationView',
        'email.MainContainer',
        'pages.BlankPageContainer',
        'pages.Error404Window',
        'pages.Error500Window',
        'pages.FAQ',
        'pages.LockScreenWindow',
        'pages.Login',
        'pages.PasswordReminder',
        'pages.Register',
        'search.Results',
        'pages.UserProfileContainer',

        'widgets.WidgetsContainer',
        'charts.MainContainer'
    ],
    launch: function () {
        // TODO - Launch the application
    }
});
