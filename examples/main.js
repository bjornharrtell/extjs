function toggleExpandedState(el) {
    var cls = el.className || 'collapsed';
    el.className = cls.indexOf('collapsed') !== -1?
        cls.replace('collapsed', 'expanded') :
        cls.replace('expanded', 'collapsed');
}

function toggleMenu() {
    toggleExpandedState(document.getElementById('title-menu'));
}

window.onload = function() {
    var html = '',
        groups = Ext.samples.samplesCatalog,
        ln = groups.length,
        i = 0,
        groupIndex = 0,
        bodyEl = document.getElementById('body'),
        group, example, j, examples, expanded, exampleLn;

    function addListener(element, eventName, handler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, handler, false);
        } else {
            element.attachEvent('on' + eventName, handler);
        }
    }

    for (; i < ln; i++) {
        group = groups[i];
        expanded = (groupIndex < 2);
        html +=
            '<div class="group-header ' + (expanded ? 'expanded' : 'collapsed') + '">' +
                '<div class="wrap">' +
                    '<a class="group-title" href="javascript:void(0);">' + group.title + '</a>' +
                '</div>' +
            '</div>' +
            '<div class="group">' +
                '<div class="wrap">';
                    examples = group.items;
                    exampleLn = examples.length;

                    for (j = 0; j < exampleLn; j++) {
                        example = examples[j];
                        html +=
                            '<a class="example" target="_blank" href="' + example.url + '">' +
                                '<div class="example-icon icon-' + example.icon + '"></div>' +
                                '<div class="example-text-wrap">' +
                                    '<div class="example-text-wrap-inner">' +
                                        '<div class="example-title">' + example.text + '</div>' +
                                        '<div class="example-description">' + example.desc + '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</a>';
                    }

        html +=
                '</div>' + // end wrap
            '</div>'; // end group

        ++groupIndex;
    }

    bodyEl.innerHTML = html;

    addListener(document.body, 'click', function(e) {
        var target = e.target || e.srcElement,
            groupHeaderClicked = false,
            className;

        while (target) {
            if (target.className && target.className.indexOf('group-header') !== -1) {
                groupHeaderClicked = true;
                break;
            }
            target = target.parentNode;
        }

        if (groupHeaderClicked) {
            // Prevent click handling when fired from <a>
            if (e.preventDefault) {
                e.preventDefault();
            }

            toggleExpandedState(target);

            // IE8 needs a repaint of the body el to trigger the stylesheet rules that hide
            // and show the group
            bodyEl.className = bodyEl.className;

            return false;
        }
    });
};
