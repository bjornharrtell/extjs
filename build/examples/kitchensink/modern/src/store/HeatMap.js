Ext.define('KitchenSink.store.HeatMap', {
    extend: 'Ext.data.Store',
    alias: 'store.heatmap',

    fields: [
        {name: 'date', type: 'date', dateFormat: 'Y-m-d'},
        'bucket',
        'count'
    ],
    data: [
        {
            "date": "2012-07-20",
            "bucket": 800,
            "count": 119
        },
        {
            "date": "2012-07-20",
            "bucket": 900,
            "count": 123
        },
        {
            "date": "2012-07-20",
            "bucket": 1000,
            "count": 173
        },
        {
            "date": "2012-07-20",
            "bucket": 1100,
            "count": 226
        },
        {
            "date": "2012-07-20",
            "bucket": 1200,
            "count": 284
        },
        {
            "date": "2012-07-20",
            "bucket": 1300,
            "count": 257
        },
        {
            "date": "2012-07-20",
            "bucket": 1400,
            "count": 268
        },
        {
            "date": "2012-07-20",
            "bucket": 1500,
            "count": 244
        },
        {
            "date": "2012-07-20",
            "bucket": 1600,
            "count": 191
        },
        {
            "date": "2012-07-20",
            "bucket": 1700,
            "count": 204
        },
        {
            "date": "2012-07-20",
            "bucket": 1800,
            "count": 187
        },
        {
            "date": "2012-07-20",
            "bucket": 1900,
            "count": 177
        },
        {
            "date": "2012-07-20",
            "bucket": 2000,
            "count": 164
        },
        {
            "date": "2012-07-20",
            "bucket": 2100,
            "count": 125
        },
        {
            "date": "2012-07-20",
            "bucket": 2200,
            "count": 140
        },
        {
            "date": "2012-07-20",
            "bucket": 2300,
            "count": 109
        },
        {
            "date": "2012-07-20",
            "bucket": 2400,
            "count": 103
        },
        {
            "date": "2012-07-21",
            "bucket": 800,
            "count": 123
        },
        {
            "date": "2012-07-21",
            "bucket": 900,
            "count": 165
        },
        {
            "date": "2012-07-21",
            "bucket": 1000,
            "count": 237
        },
        {
            "date": "2012-07-21",
            "bucket": 1100,
            "count": 278
        },
        {
            "date": "2012-07-21",
            "bucket": 1200,
            "count": 338
        },
        {
            "date": "2012-07-21",
            "bucket": 1300,
            "count": 306
        },
        {
            "date": "2012-07-21",
            "bucket": 1400,
            "count": 316
        },
        {
            "date": "2012-07-21",
            "bucket": 1500,
            "count": 269
        },
        {
            "date": "2012-07-21",
            "bucket": 1600,
            "count": 271
        },
        {
            "date": "2012-07-21",
            "bucket": 1700,
            "count": 241
        },
        {
            "date": "2012-07-21",
            "bucket": 1800,
            "count": 188
        },
        {
            "date": "2012-07-21",
            "bucket": 1900,
            "count": 174
        },
        {
            "date": "2012-07-21",
            "bucket": 2000,
            "count": 158
        },
        {
            "date": "2012-07-21",
            "bucket": 2100,
            "count": 153
        },
        {
            "date": "2012-07-21",
            "bucket": 2200,
            "count": 132
        },
        {
            "date": "2012-07-22",
            "bucket": 900,
            "count": 154
        },
        {
            "date": "2012-07-22",
            "bucket": 1000,
            "count": 241
        },
        {
            "date": "2012-07-22",
            "bucket": 1100,
            "count": 246
        },
        {
            "date": "2012-07-22",
            "bucket": 1200,
            "count": 300
        },
        {
            "date": "2012-07-22",
            "bucket": 1300,
            "count": 305
        },
        {
            "date": "2012-07-22",
            "bucket": 1400,
            "count": 301
        },
        {
            "date": "2012-07-22",
            "bucket": 1500,
            "count": 292
        },
        {
            "date": "2012-07-22",
            "bucket": 1600,
            "count": 253
        },
        {
            "date": "2012-07-22",
            "bucket": 1700,
            "count": 251
        },
        {
            "date": "2012-07-22",
            "bucket": 1800,
            "count": 214
        },
        {
            "date": "2012-07-22",
            "bucket": 1900,
            "count": 189
        },
        {
            "date": "2012-07-22",
            "bucket": 2000,
            "count": 179
        },
        {
            "date": "2012-07-22",
            "bucket": 2100,
            "count": 159
        },
        {
            "date": "2012-07-22",
            "bucket": 2200,
            "count": 161
        },
        {
            "date": "2012-07-22",
            "bucket": 2300,
            "count": 144
        },
        {
            "date": "2012-07-22",
            "bucket": 2400,
            "count": 139
        },
        {
            "date": "2012-07-22",
            "bucket": 2500,
            "count": 132
        },
        {
            "date": "2012-07-22",
            "bucket": 2600,
            "count": 136
        },
        {
            "date": "2012-07-22",
            "bucket": 2800,
            "count": 105
        },
        {
            "date": "2012-07-23",
            "bucket": 800,
            "count": 120
        },
        {
            "date": "2012-07-23",
            "bucket": 900,
            "count": 156
        },
        {
            "date": "2012-07-23",
            "bucket": 1000,
            "count": 209
        },
        {
            "date": "2012-07-23",
            "bucket": 1100,
            "count": 267
        },
        {
            "date": "2012-07-23",
            "bucket": 1200,
            "count": 299
        },
        {
            "date": "2012-07-23",
            "bucket": 1300,
            "count": 316
        },
        {
            "date": "2012-07-23",
            "bucket": 1400,
            "count": 318
        },
        {
            "date": "2012-07-23",
            "bucket": 1500,
            "count": 307
        },
        {
            "date": "2012-07-23",
            "bucket": 1600,
            "count": 295
        },
        {
            "date": "2012-07-23",
            "bucket": 1700,
            "count": 273
        },
        {
            "date": "2012-07-23",
            "bucket": 1800,
            "count": 283
        },
        {
            "date": "2012-07-23",
            "bucket": 1900,
            "count": 229
        },
        {
            "date": "2012-07-23",
            "bucket": 2000,
            "count": 192
        },
        {
            "date": "2012-07-23",
            "bucket": 2100,
            "count": 193
        },
        {
            "date": "2012-07-23",
            "bucket": 2200,
            "count": 170
        },
        {
            "date": "2012-07-23",
            "bucket": 2300,
            "count": 164
        },
        {
            "date": "2012-07-23",
            "bucket": 2400,
            "count": 154
        },
        {
            "date": "2012-07-23",
            "bucket": 2500,
            "count": 138
        },
        {
            "date": "2012-07-23",
            "bucket": 2600,
            "count": 101
        },
        {
            "date": "2012-07-23",
            "bucket": 2700,
            "count": 115
        },
        {
            "date": "2012-07-23",
            "bucket": 2800,
            "count": 103
        },
        {
            "date": "2012-07-24",
            "bucket": 800,
            "count": 105
        },
        {
            "date": "2012-07-24",
            "bucket": 900,
            "count": 156
        },
        {
            "date": "2012-07-24",
            "bucket": 1000,
            "count": 220
        },
        {
            "date": "2012-07-24",
            "bucket": 1100,
            "count": 255
        },
        {
            "date": "2012-07-24",
            "bucket": 1200,
            "count": 308
        },
        {
            "date": "2012-07-24",
            "bucket": 1300,
            "count": 338
        },
        {
            "date": "2012-07-24",
            "bucket": 1400,
            "count": 318
        },
        {
            "date": "2012-07-24",
            "bucket": 1500,
            "count": 255
        },
        {
            "date": "2012-07-24",
            "bucket": 1600,
            "count": 278
        },
        {
            "date": "2012-07-24",
            "bucket": 1700,
            "count": 260
        },
        {
            "date": "2012-07-24",
            "bucket": 1800,
            "count": 235
        },
        {
            "date": "2012-07-24",
            "bucket": 1900,
            "count": 230
        },
        {
            "date": "2012-07-24",
            "bucket": 2000,
            "count": 185
        },
        {
            "date": "2012-07-24",
            "bucket": 2100,
            "count": 145
        },
        {
            "date": "2012-07-24",
            "bucket": 2200,
            "count": 147
        },
        {
            "date": "2012-07-24",
            "bucket": 2300,
            "count": 157
        },
        {
            "date": "2012-07-24",
            "bucket": 2400,
            "count": 109
        },
        {
            "date": "2012-07-25",
            "bucket": 800,
            "count": 104
        },
        {
            "date": "2012-07-25",
            "bucket": 900,
            "count": 191
        },
        {
            "date": "2012-07-25",
            "bucket": 1000,
            "count": 201
        },
        {
            "date": "2012-07-25",
            "bucket": 1100,
            "count": 238
        },
        {
            "date": "2012-07-25",
            "bucket": 1200,
            "count": 223
        },
        {
            "date": "2012-07-25",
            "bucket": 1300,
            "count": 229
        },
        {
            "date": "2012-07-25",
            "bucket": 1400,
            "count": 286
        },
        {
            "date": "2012-07-25",
            "bucket": 1500,
            "count": 256
        },
        {
            "date": "2012-07-25",
            "bucket": 1600,
            "count": 240
        },
        {
            "date": "2012-07-25",
            "bucket": 1700,
            "count": 233
        },
        {
            "date": "2012-07-25",
            "bucket": 1800,
            "count": 202
        },
        {
            "date": "2012-07-25",
            "bucket": 1900,
            "count": 180
        },
        {
            "date": "2012-07-25",
            "bucket": 2000,
            "count": 184
        },
        {
            "date": "2012-07-25",
            "bucket": 2100,
            "count": 161
        },
        {
            "date": "2012-07-25",
            "bucket": 2200,
            "count": 125
        },
        {
            "date": "2012-07-25",
            "bucket": 2300,
            "count": 110
        },
        {
            "date": "2012-07-25",
            "bucket": 2400,
            "count": 101
        },
        {
            "date": "2012-07-26",
            "bucket": 1300,
            "count": 132
        },
        {
            "date": "2012-07-26",
            "bucket": 1400,
            "count": 117
        },
        {
            "date": "2012-07-26",
            "bucket": 1500,
            "count": 124
        },
        {
            "date": "2012-07-26",
            "bucket": 1600,
            "count": 154
        },
        {
            "date": "2012-07-26",
            "bucket": 1700,
            "count": 167
        },
        {
            "date": "2012-07-26",
            "bucket": 1800,
            "count": 137
        },
        {
            "date": "2012-07-26",
            "bucket": 1900,
            "count": 169
        },
        {
            "date": "2012-07-26",
            "bucket": 2000,
            "count": 175
        },
        {
            "date": "2012-07-26",
            "bucket": 2100,
            "count": 168
        },
        {
            "date": "2012-07-26",
            "bucket": 2200,
            "count": 188
        },
        {
            "date": "2012-07-26",
            "bucket": 2300,
            "count": 137
        },
        {
            "date": "2012-07-26",
            "bucket": 2400,
            "count": 173
        },
        {
            "date": "2012-07-26",
            "bucket": 2500,
            "count": 164
        },
        {
            "date": "2012-07-26",
            "bucket": 2600,
            "count": 167
        },
        {
            "date": "2012-07-26",
            "bucket": 2700,
            "count": 115
        },
        {
            "date": "2012-07-26",
            "bucket": 2800,
            "count": 116
        },
        {
            "date": "2012-07-26",
            "bucket": 2900,
            "count": 118
        },
        {
            "date": "2012-07-26",
            "bucket": 3000,
            "count": 125
        },
        {
            "date": "2012-07-26",
            "bucket": 3200,
            "count": 104
        }
    ]

});