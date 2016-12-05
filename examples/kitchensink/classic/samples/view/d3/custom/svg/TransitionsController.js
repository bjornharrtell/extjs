Ext.define('KitchenSink.view.d3.custom.svg.TransitionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.transitions',

    coefficients: [
        [1, 1, 0, 100],
        [3, 5, 5, 30],
        [2, 2, 2, 100],
        [3, 3, 3, 40],
        [3, 3, 4, 40],
        [3, 7, 2, 40]
    ],

    onSceneSetup: function (component, scene) {
        var me = this,
            view = me.getView(),
            width = view.getWidth(),
            height = view.getHeight(),
            cx = width / 2,
            cy = height / 2,
            pi2 = Math.PI * 2,
            steps = 300,
            increment = pi2 / steps,
            coefficients = me.coefficients,
            a, b, k, scale, x, y, i, r, theta, dataset,
            datasetIndex = 0,
            easings = ['linear', 'bounce', 'circle', 'elastic'],
            intervalId, progressBar;

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

        progressBar = scene.append('rect').attr('height', 2).attr('fill', 'red');

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

        resetProgress();

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

            resetProgress();

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

        function resetProgress() {
            progressBar.datum(0).call(progress);
            progressBar.datum(width).transition().ease('linear').duration(3900).call(progress);
        }

        function progress() {
            this.attr('width', function (d) {
                return d;
            });
        }
    }

});