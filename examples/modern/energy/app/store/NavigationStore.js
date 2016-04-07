(function () {
    var StateItems = [
        {key: 'ALL', label: 'All States', leaf: true},
        {key: 'AL', label: 'Alabama', leaf: true},
        {key: 'AK', label: 'Alaska', leaf: true},
        {key: 'AZ', label: 'Arizona', leaf: true},
        {key: 'AR', label: 'Arkansas', leaf: true},
        {key: 'CA', label: 'California', leaf: true},
        {key: 'CO', label: 'Colorado', leaf: true},
        {key: 'CT', label: 'Connecticut', leaf: true},
        {key: 'DE', label: 'Delaware', leaf: true},
        {key: 'DC', label: 'District of Columbia', leaf: true},
        {key: 'FL', label: 'Florida', leaf: true},
        {key: 'GA', label: 'Georgia', leaf: true},
        {key: 'HI', label: 'Hawaii', leaf: true},
        {key: 'ID', label: 'Idaho', leaf: true},
        {key: 'IL', label: 'Illinois', leaf: true},
        {key: 'IN', label: 'Indiana', leaf: true},
        {key: 'IA', label: 'Iowa', leaf: true},
        {key: 'KS', label: 'Kansas', leaf: true},
        {key: 'KY', label: 'Kentucky', leaf: true},
        {key: 'LA', label: 'Louisiana', leaf: true},
        {key: 'ME', label: 'Maine', leaf: true},
        {key: 'MD', label: 'Maryland', leaf: true},
        {key: 'MA', label: 'Massachusetts', leaf: true},
        {key: 'MI', label: 'Michigan', leaf: true},
        {key: 'MN', label: 'Minnesota', leaf: true},
        {key: 'MS', label: 'Mississippi', leaf: true},
        {key: 'MO', label: 'Missouri', leaf: true},
        {key: 'MT', label: 'Montana', leaf: true},
        {key: 'NE', label: 'Nebraska', leaf: true},
        {key: 'NV', label: 'Nevada', leaf: true},
        {key: 'NH', label: 'New Hampshire', leaf: true},
        {key: 'NJ', label: 'New Jersey', leaf: true},
        {key: 'NM', label: 'New Mexico', leaf: true},
        {key: 'NY', label: 'New York', leaf: true},
        {key: 'NC', label: 'North Carolina', leaf: true},
        {key: 'ND', label: 'North Dakota', leaf: true},
        {key: 'OH', label: 'Ohio', leaf: true},
        {key: 'OK', label: 'Oklahoma', leaf: true},
        {key: 'OR', label: 'Oregon', leaf: true},
        {key: 'PA', label: 'Pennsylvania', leaf: true},
        {key: 'RI', label: 'Rhode Island', leaf: true},
        {key: 'SC', label: 'South Carolina', leaf: true},
        {key: 'SD', label: 'South Dakota', leaf: true},
        {key: 'TN', label: 'Tennessee', leaf: true},
        {key: 'TX', label: 'Texas', leaf: true},
        {key: 'UT', label: 'Utah', leaf: true},
        {key: 'VT', label: 'Vermont', leaf: true},
        {key: 'VA', label: 'Virginia', leaf: true},
        {key: 'WA', label: 'Washington', leaf: true},
        {key: 'WV', label: 'West Virginia', leaf: true},
        {key: 'WI', label: 'Wisconsin', leaf: true},
        {key: 'WY', label: 'Wyoming', leaf: true}
    ];

    var NavigationStructure = [
        {
            key: 'CONS',
            label: 'Consumption',
            items: StateItems
        },
        {
            key: 'PROD',
            label: 'Production',
            items: StateItems
        }
    ];

    Ext.define("EnergyApp.store.NavigationStore", {
        alias: 'store.NavigationStore',
        extend: "Ext.data.TreeStore",
        config: {
            model: 'EnergyApp.model.NavigationModel',
            root: {
                items: NavigationStructure
            },
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json',
                    rootProperty: 'items'
                }
            }
        }
    });
})();