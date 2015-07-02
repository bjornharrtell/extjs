Ext.define('KitchenSink.model.Person', {
    extend: 'KitchenSink.model.Base',
    fields: ['firstName', 'lastName', 'age', 'favoriteColor'],
    statics: {
        generateData: (function() {
            var lasts = ['Jones', 'Smith', 'Lee', 'Wilson', 'Black', 'Williams', 'Lewis', 'Johnson', 'Foot', 'Little', 'Vee', 'Train', 'Hot', 'Mutt'],
                firsts = ['Fred', 'Julie', 'Bill', 'Ted', 'Jack', 'John', 'Mark', 'Mike', 'Chris', 'Bob', 'Travis', 'Kelly', 'Sara'],
                colors = ['Red', 'Green', 'Blue'],
                currentYear = (new Date()).getFullYear();

            function getRandom(array) {
                var index = Ext.Number.randomInt(0, array.length - 1);
                return array[index];
            }

            function getName(seen) {
                var name = {
                    first: getRandom(firsts),
                    last: getRandom(lasts)
                };

                if (seen[name.first + name.last]) {
                    return getName(seen);
                } else {
                    return name;
                }
            }

            function getDate() {
                var y = Ext.Number.randomInt(currentYear - 5, currentYear),
                    m = Ext.Number.randomInt(0, 11),
                    maxDays = Ext.Date.getDaysInMonth(new Date(y, m, 1));
                    d = Ext.Number.randomInt(1, maxDays);

                return new Date(y, m, d);
            }

            function getKey() {
                var chars = '',
                    i;

                for (i = 0; i < 5; ++i) {
                    chars += String.fromCharCode(Ext.Number.randomInt(97, 122));
                }

                return chars;
            }

            return function(options) {
                options = options || {};
                var out = [],

                    adults = options.adults,
                    children = options.children,
                    total = options.total,
                    includeAccounts = options.includeAccounts,
                    seenNames = {},
                    adultsUndef = adults === undefined,
                    childrenUndef = children === undefined,
                    accountIdCounter = 0,
                    name, o, accounts, j, len;

                if (!adultsUndef && !childrenUndef) {
                    total = adults + children;
                } else {
                    // We rely on total now
                    total = total || 15;
                    if (adultsUndef && childrenUndef) {
                        adults = Ext.Number.randomInt(Math.floor(total * 0.25), Math.floor(total * 0.75));
                        children = total - adults;
                    } else if (adultsUndef) {
                        adults = total - children;
                    } else {
                        children = total - adults;
                    }
                }

                for (i = 0; i < total; ++i) {
                    name = getName(seenNames);
                    o = {
                        id: i + 1,
                        firstName: name.first,
                        lastName: name.last,
                        age: i >= adults ? Ext.Number.randomInt(0, 17) : Ext.Number.randomInt(18, 100),
                        favoriteColor: getRandom(colors)
                    };

                    if (includeAccounts) {
                        accounts = [];
                        len = Ext.Number.randomInt(1, 5);
                        for (j = 0; j < len; ++j) {
                            accounts.push({
                                id: ++accountIdCounter,
                                created: getDate(),
                                accountKey: getKey(),
                                personId: o.id
                            });
                        }
                        o.accounts = accounts;
                    }

                    out.push(o);
                }

                return out;
            };
            })()
    }
});