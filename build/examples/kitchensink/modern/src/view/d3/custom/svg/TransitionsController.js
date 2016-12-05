Ext.define('KitchenSink.view.d3.custom.svg.TransitionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.transitions',

    coefficients: [
        [1, 1, 0, 75],
        [3, 5, 5, 20],
        [2, 2, 2, 40],
        [3, 3, 3, 30],
        [3, 3, 4, 30],
        [3, 7, 2, 18]
    ],

    onSceneResize: function (component, scene, size) {
        var cx = size.width / 2,
            cy = size.height / 2;

        scene.select('g').attr('transform', 'translate(' + cx + ',' + cy + ')');
    },

    onSceneSetup: function (component, scene) {
        var me = this,
            view = me.getView(),
            width = view.el.getWidth(),
            height = view.el.getHeight(),
            cx = width / 2,
            cy = height / 2,
            pi2 = Math.PI * 2,
            steps = 200,
            increment = pi2 / steps,
            coefficients = me.coefficients,
            a, b, k, scale, x, y, i, r, theta, dataset,
            datasetIndex = 0,
            easings = ['linear', 'bounce', 'circle', 'elastic'],
            intervalId;

        me.datasets = [];

        for (i = me.coefficients.length - 1; i >= 0; i--) {
            coefficients = me.coefficients[i];
            a = coefficients[0];
            b = coefficients[1];
            k = coefficients[2];
            scale = coefficients[3];
            dataset = [];

            for (theta = 0; theta < pi2; theta += increment) {
                r = a * scale + b * scale * Math.cos(k * theta);
                x = r * Math.cos(theta);
                y = r * Math.sin(theta);

                dataset.push([x, y]);
            }

            me.datasets.unshift(dataset);
        }

        scene.append('g').attr('transform', 'translate(' + cx + ',' + cy + ')')
            .selectAll('circle')
            .data(me.datasets[datasetIndex])
            .enter()
                .append('circle')
                .attr('r', '5')
                .style('fill', function (d, i) {
                    return d3.hsl(i / steps * 360, 1, 0.5);
                })
                .call(position);

        intervalId = setInterval(function () {
            if (view.isDestroyed) {
                clearInterval(intervalId);
                return;
            }
            if (datasetIndex < me.datasets.length - 1) {
                datasetIndex++;
            } else {
                datasetIndex = 0;
            }
            scene.selectAll('circle').data(me.datasets[datasetIndex])
                .transition()
                .duration(1000)
                .delay(function (d, i) {
                    return i * 10;
                })
                .ease(easings[Math.floor(Math.random() * easings.length)])
                .call(position);

        }, 4000);

        function position() {
            this
                .attr('cx', function (d) {
                    return d[0];
                })
                .attr('cy', function (d) {
                    return d[1];
                });
        }
    }

});
