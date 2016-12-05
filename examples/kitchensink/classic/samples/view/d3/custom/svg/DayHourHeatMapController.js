Ext.define('KitchenSink.view.d3.DayHourHeatMapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.day-hour-heatmap',

    datasets: [
        'data/heatmap/heatmap1.tsv',
        'data/heatmap/heatmap2.tsv'
    ],

    onSceneResize: function (component, scene, size) {
        var width = size.width,
            height = size.height,
            gridSize = Math.floor(width / 24),
            legendElementWidth = gridSize * 2,
            buckets = 9,
            colors = ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'],
            days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
            times = ['1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12a', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p', '12p'];

        scene.classed('d3-heatmap', true);

        var dayLabels = scene.selectAll('.dayLabel')
            .data(days)
            .enter().append('text')
            .text(function (d) { return d; })
            .attr('x', 0)
            .attr('y', function (d, i) { return i * gridSize; })
            .style('text-anchor', 'end')
            .attr('transform', 'translate(-6,' + gridSize / 1.5 + ')')
            .attr('class', function (d, i) { return ((i >= 0 && i <= 4) ? 'dayLabel mono axis axis-workweek' : 'dayLabel mono axis'); });

        var timeLabels = scene.selectAll('.timeLabel')
            .data(times)
            .enter().append('text')
            .text(function (d) { return d; })
            .attr('x', function (d, i) { return i * gridSize; })
            .attr('y', 0)
            .style('text-anchor', 'middle')
            .attr('transform', 'translate(' + gridSize / 2 + ', -6)')
            .attr('class', function (d, i) { return ((i >= 7 && i <= 16) ? 'timeLabel mono axis axis-worktime' : 'timeLabel mono axis'); });

        this.heatmapChart = function (tsvFile) {
            d3.tsv(tsvFile,
                function (d) {
                    return {
                        day: +d.day,
                        hour: +d.hour,
                        value: +d.value
                    };
                },
                function (error, data) {
                    var colorScale = d3.scale.quantile()
                        .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
                        .range(colors);

                    var cards = scene.selectAll('.hour')
                        .data(data, function (d) {return d.day+':'+d.hour;});

                    cards.append('title');

                    cards.enter().append('rect')
                        .attr('x', function (d) { return (d.hour - 1) * gridSize; })
                        .attr('y', function (d) { return (d.day - 1) * gridSize; })
                        .attr('rx', 4)
                        .attr('ry', 4)
                        .attr('class', 'hour bordered')
                        .attr('width', gridSize)
                        .attr('height', gridSize)
                        .style('fill', colors[0]);

                    cards.transition().duration(1000)
                        .style('fill', function (d) { return colorScale(d.value); });

                    cards.select('title').text(function (d) { return d.value; });

                    cards.exit().remove();

                    var legend = scene.selectAll('.legend')
                        .data([0].concat(colorScale.quantiles()), function (d) { return d; });

                    legend.enter().append('g')
                        .attr('class', 'legend');

                    legend.append('rect')
                        .attr('x', function (d, i) { return legendElementWidth * i; })
                        .attr('y', height)
                        .attr('width', legendElementWidth)
                        .attr('height', gridSize / 2)
                        .style('fill', function (d, i) { return colors[i]; });

                    legend.append('text')
                        .attr('class', 'mono')
                        .text(function (d) { return '≥ ' + Math.round(d); })
                        .attr('x', function (d, i) { return legendElementWidth * i; })
                        .attr('y', height + gridSize);

                    legend.exit().remove();

                });
        };

        this.heatmapChart(this.datasets[0]);
    },

    onDataset1: function () {
        this.heatmapChart(this.datasets[0]);
    },

    onDataset2: function () {
        this.heatmapChart(this.datasets[1]);
    }

});