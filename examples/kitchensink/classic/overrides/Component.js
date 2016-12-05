// @override Ext

Ext.define('KitchenSink.Component', {
    override: 'Ext.Component'
},
function (C) {
    var classRe = /^KitchenSink/,
        propRe = /^\$\{(\w+)\}$/,
        propsRe = /\$\{(\w+)\}/g,
        inherited = {
            'gray': 'classic',
            'crisp-touch': 'neptune-touch',
            'neptune-touch': 'neptune',
            'crisp': 'neptune',
            'triton': 'neptune'
        };

    //<debug>
    function alas (msg, className, prop) {
        msg = msg.replace('XX', className);
        if (prop) {
            msg = msg.replace('YY', prop);
        }
        msg = msg.replace('ZZ', KitchenSink.profileName);

        Ext.log.warn(msg);
    }

    function noProp (className, prop) {
        alas('Example XX has no value for property "YY" in profile ZZ.', className, prop);
    }
    //</debug>

    function replace (className, profileData, target) {
        var ret = target,
            i, m, name, val;

        if (target) {
            if (typeof target === 'string') {
                m = propRe.exec(target);
                if (m) {
                    ret = profileData[m[1]];
                    //<debug>
                    if (ret === undefined) {
                        noProp(className, m[1]);
                    }
                    //</debug>
                }
                else if (target.indexOf('${') > -1) {
                    ret = target.replace(propsRe, function (m, group1) {
                        //<debug>
                        if (profileData[group1] === undefined) {
                            noProp(className, group1);
                        }
                        //</debug>
                        return profileData[group1];
                    });
                }
            }
            else if (target.constructor === Object) {
                for (name in target) {
                    val = target[name];
                    if (val) {
                        target[name] = replace(className, profileData, val);
                    }
                }
            }
            else if (Ext.isArray(target)) {
                for (i = target.length; i-- > 0; ) {
                    val = target[i];
                    if (val) {
                        target[i] = replace(className, profileData, val);
                    }
                }
            }
        }

        return ret;
    }

    C.onExtended(function (D, classBody) {
        var className = classBody.$className,
            profiles = classRe.test(className) && classBody.profiles,
            name = window.KitchenSink && KitchenSink.profileName,
            data, profile;

        if (profiles) {
            for (; name; name = inherited[name]) {
                profile = profiles[name];
                if (profile) {
                    Ext.applyIf(data || (data = {}), profile);
                }
            }

            if (data) {
                replace(className, data, classBody);
                D.prototype.profileInfo = data;
            }
            //<debug>
            else {
                alas('Example XX does not have a spec for profile ZZ.', className);
            }
            //</debug>
        }
    });
});
