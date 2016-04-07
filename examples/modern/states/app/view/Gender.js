Ext.define("States.view.Gender", {
    extend: 'Ext.chart.CartesianChart',
    
    requires: [
        'States.view.Pyramid'
    ],
    
    config: {
        animation: false,
        store: "PyramidStore",
        title: 'Gender Distribution',
        legend: {
            position: 'bottom',
            verticalWidth: 80
        },
        flipXY: true,
        insetPadding: {
            left: 15,
            top: 10,
            bottom: 10
        },
        series: [
            {
                type: 'pyramid',
                xField: 'name',
                y1Field: 'female',
                y2Field: 'male',
                style: {
                    stroke: '#333',
                    minGapWidth: 1
                }
            }
        ],
        axes: [
            {
                type: 'numeric',
                position: 'bottom',
                title: {
                    text: 'Age Distribution',
                    fontSize: 18
                },
                label: {
                    font: '12px Helvetica'
                },
                renderer: function (axis, v) {
                    return Math.abs(v / 1000).toFixed(0) + 'K';
                }
            },
            {
                type: 'category',
                position: 'right',
                style: {
                    estStepSize: 1,
                    stroke: 'none'
                },
                labelInSpan: true,
                label: {
                    fontSize: 9
                }
            }
        ]
    }
});