Ext.define('KitchenSink.store.Unemployment', {
    extend: 'Ext.data.Store',
    alias: 'store.unemployment',

    fields: ['label', 'span', 'y2007', 'y2008', 'y2009', 'y2010', 'y2011', 'y2012', 'state'],

    data: [
        {label: 'year', span: 100}, // Corresponds to the sectors of the chart that display a year.

        // Note that most of the records have the span of '100', so that the pie chart sectors that represent them
        // have equal angular span.
        // There are also records with the span of '20' that are represented by the smaller blank sectors
        // that separate one country region from another.

        // The 'label' field stores a short state name that is displayed inside the sectors of the outer ring of the chart.
        // The 'state' field stores a full state name that is displayed by the 'stateName' text sprite
        // on top of the cartesian chart when the user hovers/taps a pie chart sector.

        // Finally, the 'y2007' - 'y2012' fields store the percentage change in unemployment from year to year.
        // These are used to determine the color of the pie chart sectors, and also the color and the length
        // of the cartesian chart bars.

        // Northeast region
        {label: 'CT', span: 100, y2007: 0.2,  y2008: 1.0, y2009: 2.6, y2010: 1.1,  y2011: -0.4, y2012: -0.6, state: 'Connecticut'},
        {label: 'DE', span: 100, y2007: 0.0,  y2008: 1.4, y2009: 3.0, y2010: 0.1,  y2011: -0.6, y2012: -0.3, state: 'Delaware'},
        {label: 'ME', span: 100, y2007: 0.0,  y2008: 0.7, y2009: 2.7, y2010: 0.1,  y2011: -0.5, y2012: -0.5, state: 'Maine'},
        {label: 'MD', span: 100, y2007: -0.4, y2008: 0.9, y2009: 3.1, y2010: 0.5,  y2011: -0.6, y2012: -0.4, state: 'Maryland'},
        {label: 'MA', span: 100, y2007: -0.3, y2008: 0.8, y2009: 2.9, y2010: 0.1,  y2011: -1.0, y2012: -0.5, state: 'Massachusetts'},
        {label: 'NH', span: 100, y2007: 0.0,  y2008: 0.4, y2009: 2.3, y2010: 0.0,  y2011: -0.7, y2012: 0.0,  state: 'New Hampshire'},
        {label: 'NJ', span: 100, y2007: -0.3, y2008: 1.2, y2009: 3.5, y2010: 0.6,  y2011: -0.3, y2012: 0.0,  state: 'New Jersey'},
        {label: 'NY', span: 100, y2007: 0.0,  y2008: 0.8, y2009: 2.9, y2010: 0.3,  y2011: -0.4, y2012: 0.3,  state: 'New York'},
        {label: 'PA', span: 100, y2007: -0.1, y2008: 0.9, y2009: 2.6, y2010: 0.6,  y2011: -0.5, y2012: -0.1, state: 'Pennsylvania'},
        {label: 'RI', span: 100, y2007: 0.1,  y2008: 2.5, y2009: 3.2, y2010: 0.8,  y2011: -0.5, y2012: -0.9, state: 'Rhode Island'},
        {label: 'VT', span: 100, y2007: 0.2,  y2008: 0.6, y2009: 2.4, y2010: -0.5, y2011: -0.8, y2012: -0.7, state: 'Vermont'},

        {label: '', span: 20}, // Corresponds to the empty sectors that divide the chart into regions.

        // Southeast region
        {label: 'AL', span: 100, y2007: -0.1, y2008: 1.6, y2009: 4.7, y2010: -0.5, y2011: -0.7, y2012: -1.4, state: 'Alabama'},
        {label: 'DC', span: 100, y2007: -0.2, y2008: 1.1, y2009: 3.1, y2010: 0.4,  y2011: 0.1,  y2012: -1.1, state: 'District of Columbia'},
        {label: 'FL', span: 100, y2007: 0.7,  y2008: 2.3, y2009: 4.1, y2010: 0.9,  y2011: -1.0, y2012: -1.5, state: 'Florida'},
        {label: 'GA', span: 100, y2007: -0.1, y2008: 1.7, y2009: 3.4, y2010: 0.5,  y2011: -0.3, y2012: -0.9, state: 'Georgia'},
        {label: 'LA', span: 100, y2007: -0.1, y2008: 0.6, y2009: 2.2, y2010: 0.8,  y2011: -0.2, y2012: -0.7, state: 'Louisiana'},
        {label: 'MS', span: 100, y2007: -0.5, y2008: 0.5, y2009: 2.7, y2010: 1.1,  y2011: 0.0,  y2012: -0.9, state: 'Mississippi'},
        {label: 'NC', span: 100, y2007: 0.0,  y2008: 1.5, y2009: 4.1, y2010: 0.4,  y2011: -0.6, y2012: -1.0, state: 'North Carolina'},
        {label: 'SC', span: 100, y2007: -0.8, y2008: 1.2, y2009: 4.6, y2010: -0.3, y2011: -0.8, y2012: -1.3, state: 'South Carolina'},
        {label: 'TN', span: 100, y2007: -0.4, y2008: 1.8, y2009: 4.0, y2010: -0.7, y2011: -0.6, y2012: -1.1, state: 'Tennessee'},
        {label: 'VA', span: 100, y2007: 0.1,  y2008: 0.9, y2009: 3.0, y2010: 0.1,  y2011: -0.7, y2012: -0.5, state: 'Virginia'},

        {label: '', span: 20},

        // Midwest region
        {label: 'WI', span: 100, y2007: 0.1,  y2008: 0.0, y2009: 3.9, y2010: -0.2, y2011: -1.0, y2012: -0.6, state: 'Wisconsin'},
        {label: 'WV', span: 100, y2007: -0.3, y2008: 0.0, y2009: 3.4, y2010: 0.9,  y2011: -0.7, y2012: -0.6, state: 'West Virginia'},
        {label: 'SD', span: 100, y2007: -0.2, y2008: 0.1, y2009: 2.2, y2010: -0.1, y2011: -0.4, y2012: -0.5, state: 'South Dakota'},
        {label: 'OH', span: 100, y2007: 0.2,  y2008: 1.0, y2009: 3.6, y2010: -0.2, y2011: -1.3, y2012: -1.3, state: 'Ohio'},
        {label: 'ND', span: 100, y2007: -0.1, y2008: 0.0, y2009: 1.0, y2010: -0.3, y2011: -0.4, y2012: -0.4, state: 'North Dakota'},
        {label: 'NE', span: 100, y2007: 0.0,  y2008: 0.3, y2009: 1.4, y2010: 0.0,  y2011: -0.2, y2012: -0.5, state: 'Nebraska'},
        {label: 'MO', span: 100, y2007: 0.2,  y2008: 0.9, y2009: 3.5, y2010: -0.1, y2011: -0.8, y2012: -1.5, state: 'Missouri'},
        {label: 'MN', span: 100, y2007: 0.6,  y2008: 0.7, y2009: 2.6, y2010: -0.6, y2011: -0.9, y2012: -0.9, state: 'Minnesota'},
        {label: 'MI', span: 100, y2007: 0.2,  y2008: 1.2, y2009: 5.2, y2010: -0.8, y2011: -2.3, y2012: -1.3, state: 'Michigan'},
        {label: 'KY', span: 100, y2007: -0.3, y2008: 1.0, y2009: 3.7, y2010: -0.1, y2011: -0.7, y2012: -1.2, state: 'Kentucky'},
        {label: 'KS', span: 100, y2007: -0.3, y2008: 0.3, y2009: 2.7, y2010: 0.0,  y2011: -0.6, y2012: -0.7, state: 'Kansas'},
        {label: 'IA', span: 100, y2007: 0.1,  y2008: 0.2, y2009: 2.3, y2010: 0.0,  y2011: -0.5, y2012: -0.6, state: 'Iowa'},
        {label: 'IN', span: 100, y2007: -0.4, y2008: 1.2, y2009: 4.5, y2010: -0.3, y2011: -1.2, y2012: -0.7, state: 'Indiana'},
        {label: 'IL', span: 100, y2007: 0.5,  y2008: 1.3, y2009: 3.6, y2010: 0.5,  y2011: -0.8, y2012: -0.8, state: 'Illinois'},
        {label: 'AR', span: 100, y2007: 0.0,  y2008: 0.1, y2009: 2.1, y2010: 0.4,  y2011: 0.1,  y2012: -0.5, state: 'Arkansas'},

        {label: '', span: 20},

        // Southwest region
        {label: 'AZ', span: 100, y2007: -0.4, y2008: 2.3,  y2009: 3.8, y2010: 0.6,  y2011: -1.0, y2012: -1.1, state: 'Arizona'},
        {label: 'CA', span: 100, y2007: 0.5,  y2008: 1.8,  y2009: 4.1, y2010: 1.1,  y2011: -0.6, y2012: -1.4, state: 'California'},
        {label: 'CO', span: 100, y2007: -0.5, y2008: 1.0,  y2009: 3.3, y2010: 0.9,  y2011: -0.5, y2012: -0.7, state: 'Colorado'},
        {label: 'HI', span: 100, y2007: 0.2,  y2008: 1.4,  y2009: 2.7, y2010: -0.1, y2011: -0.2, y2012: -0.8, state: 'Hawaii'},
        {label: 'NV', span: 100, y2007: 0.5,  y2008: 2.4,  y2009: 4.6, y2010: 2.1,  y2011: -0.6, y2012: -1.7, state: 'Nevada'},
        {label: 'NM', span: 100, y2007: -0.6, y2008: 1.0,  y2009: 2.4, y2010: 1.1,  y2011: -0.4, y2012: -0.5, state: 'New Mexico'},
        {label: 'OK', span: 100, y2007: 0.0,  y2008: -0.4, y2009: 3.0, y2010: 0.2,  y2011: -1.0, y2012: -0.5, state: 'Oklahoma'},
        {label: 'TX', span: 100, y2007: -0.5, y2008: 0.5,  y2009: 2.6, y2010: 0.7,  y2011: -0.3, y2012: -1.1, state: 'Texas'},
        {label: 'UT', span: 100, y2007: -0.3, y2008: 0.7,  y2009: 4.5, y2010: 0.3,  y2011: -1.3, y2012: -1.4, state: 'Utah'},

        {label: '', span: 20},

        // Northwest region
        {label: 'AK', span: 100, y2007: -0.4, y2008: 0.3, y2009: 1.3, y2010: 0.3,  y2011: -0.4, y2012: -0.7, state: 'Alaska'},
        {label: 'ID', span: 100, y2007: 0.0,  y2008: 1.8, y2009: 2.6, y2010: 1.3,  y2011: -0.3, y2012: -1.1, state: 'Idaho'},
        {label: 'MT', span: 100, y2007: 0.2,  y2008: 1.1, y2009: 1.5, y2010: 0.7,  y2011: -0.2, y2012: -0.5, state: 'Montana'},
        {label: 'OR', span: 100, y2007: -0.1, y2008: 1.3, y2009: 4.6, y2010: -0.3, y2011: -1.1, y2012: -0.9, state: 'Oregon'},
        {label: 'WA', span: 100, y2007: -0.3, y2008: 0.8, y2009: 3.9, y2010: 0.6,  y2011: -0.7, y2012: -1.1, state: 'Washington'},
        {label: 'WY', span: 100, y2007: -0.4, y2008: 0.3, y2009: 3.2, y2010: 0.7,  y2011: -0.9, y2012: -0.7, state: 'Wyoming'}
    ]

});