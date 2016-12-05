Ext.define('KitchenSink.view.d3.WordsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.words',

    requires: [
        'Ext.util.Format'
    ],

    textUrl: 'data/treasure_island.txt',

    onAfterRender: function () {
        var me = this,
            pack = me.lookupReference('pack');

        Ext.Ajax.request({
            url: me.textUrl
        }).then(function (response) {
            var text = response.responseText
                    .replace(/[,|.|:|;|_|!|?|\n|"]/g, ' ') // replace unwanted characters with spaces
                    .replace(/\s\s+/g, ' ')            // replace multiple spaces with a single space
                    .toLowerCase(),
                words = text.split(' '),
                map = me.countWords(words), // count frequency of occurrence of words
                word, entry;

            for (word in map) {
                entry = map[word];
                // count frequency of occurrence of words that follow each word
                entry.nextMap = me.countWords(entry.nextList, map);
            }

            pack.setStore(
                Ext.create('Ext.data.TreeStore', {
                    data: me.getTopWords(map, 200)
                })
            );
        });
    },

    countWords: function (words, previous) {
        var ln = words.length - 1, // last word doesn't count :p
            map = {},
            i, word, entry;

        for (i = 0; i < ln; i++) {
            word = words[i];
            if (map.hasOwnProperty(word)) {
                entry = map[word];
                entry.count++;
                if (!previous) {
                    entry.nextList.push(words[i + 1]);
                }
            } else {
                entry = map[word] = {
                    word: previous && previous.hasOwnProperty(word) ? previous[word] : word,
                    count: 1
                };
                if (!previous) {
                    entry.nextList = [words[i + 1]];
                }
            }
        }

        return map;
    },

    // The data structure produced by the `countWords` method is a map of Entries
    // in the following format: { <word>: Entry }, where the Entry is:
    //
    // Entry {
    //     word: String              // the word
    //     count: Number             // how often the word occurs in the text
    //     topNextWord: Object       // most popular next word (in the same format as in the 'nextMap')
    //     nextList: String[         // array of all words that follow this word (can contain duplicates)
    //         <nextWord>,
    //         <nextWord>,
    //         ...
    //     ]
    //     nextMap: {             // a map of all the next words
    //         <nextWord>: {
    //             word: Entry,   // a next word that follows this word (as another Entry)
    //             count: Number  // how often the next word follows this word
    //         }
    //     }
    // }

    getTopWords: function (map, count) {
        var words = [],
            word, top, i, ln,
            nextMap, nextKey, nextValue,
            topNextWord, max;

        for (word in map) {
            words.push(map[word]);
        }

        words.sort(function (w1, w2) {
            return w2.count - w1.count;
        });

        count = Math.min(words.length, count);
        top = words.slice(0, count);

        for (i = 0, ln = top.length; i < ln; i++) {
            nextMap = top[i].nextMap;
            max = 0;
            for (nextKey in nextMap) {
                nextValue = nextMap[nextKey];
                if (top.indexOf(nextValue.word) === -1) {
                    delete nextMap[nextKey];
                } else {
                    if (nextValue.count > max) {
                        max = nextValue.count;
                        topNextWord = nextValue;
                    }
                }
            }
            top[i].topNextWord = topNextWord;
        }

        return top;
    },

    onTooltip: function (component, tooltip, node, element, event) {
        var me = this,
            word = node.get('word'),
            count = node.get('count'),
            pack = me.lookupReference('pack'),
            nodes = me.nodes || (me.nodes = pack.getRenderedNodes()),
            nextMap = node.data.nextMap,
            topNextWord = node.data.topNextWord,
            tip = 'The word <strong>' + word + '</strong> is used ' + count + ' times.'
                + '<br>It is most often followed by the <strong>' + topNextWord.word.word + '</strong> word'
                + '<br>for a total of ' + topNextWord.count + ' times.',
            nextKey, nextValue, entry;

        // Create a color scale that will give us a shade of pink depending on how
        // often a given word follows the howevered word.
        me.scale = me.scale || d3.scale.linear().range(['white', '#bd3163']);
        me.scale.domain([0, topNextWord.count]);
        // Reset the color of all nodes back to white...
        nodes.select('circle')
            .style('fill', 'white')
            .style('stroke-width', 1);
        // ... except for the color of the selected node - we want that to come from the CSS.
        pack.selectNode(pack.getSelection()).select('circle').style('fill', null);

        for (nextKey in nextMap) {
            nextValue = nextMap[nextKey];
            entry = nextValue.word;
            if (entry.word !== node.data.word) {
                // Highlight the words that most frequently follow the hovered word.
                pack.selectNode(entry).select('circle')
                    .style('fill', me.scale(nextValue.count))
                    .style('stroke-width', 3);
            }
        }

        tooltip.setHtml(tip);
    }

});
