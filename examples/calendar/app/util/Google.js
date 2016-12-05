Ext.define('Calendar.util.Google', {
    singleton: true,

    mixins: ['Ext.google.ux.Client'],

    googleApis: { 'people': { version: 'v1' } },

    checkAuth: function() {
        return this.performAuth(true)
            .then(function(auth) {
                return auth.status.signed_in;
            });
    },

    signIn: function() {
        return this.performAuth(false)
            .then(function(auth) {
                if (auth.status.signed_in) {
                    return true;
                } else {
                    throw false;
                }
            });
    },

    signOut: function() {
        return Ext.Deferred.resolved(gapi.auth.signOut());
    },

    getProfile: function() {
        return Ext.Deferred.resolved(
                gapi.client.people.people.get({
                    resourceName: 'people/me'
                }))
            .then(function(data) {
                return data.result;
            });
    },

    privates: {
        performAuth: function(immediate) {
            var manifest = Ext.manifest,
                scopes = [
                    "https://www.googleapis.com/auth/userinfo.profile",
                    "https://www.googleapis.com/auth/calendar" ]
                options = {
                    'client_id': manifest.google.client_id,
                    'cookie_policy': 'single_host_origin',
                    'scope': scopes.join(' ')
                };

            if (immediate) {
                options['immediate'] = true;
            } else {
                options['prompt'] = 'login';
            }

            return Ext.Deferred.resolved(gapi.auth.authorize(options));
        }
    }
});
