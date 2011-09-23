	// Define a store which has all available Operators
Ext.create('Ext.data.Store', {
	storeId: 'TYPO3.Vidi.Stores.FilterBar.FieldOperators',
	fields: ['display', 'id', 'types'],
	data : [
		{ display: "contains", id: 'l', types: ['string'] },
		{ display: "contains not", id: '!l', types: ['string'] },
		{ display: "equals" , id: '=', types: ['string', 'int', 'float', 'boolean'] },
		{ display: "equals not" , id: '!=', types: ['string', 'int','float',  'boolean'] },
		{ display: "greater then or equals" , id: '>=', types: ['int', 'float'] },
		{ display: "greater then" , id: '>', types: ['int', 'float'] },
		{ display: "less then or equals" , id: '<=', types: ['int', 'float'] },
		{ display: "less then" , id: '<', types: ['int', 'float'] }
	],
	remoteFilter: false
});
