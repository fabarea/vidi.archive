	// Define a store which has all available Operators
Ext.create('Ext.data.Store', {
	storeId: 'TYPO3.Vidi.Stores.FilterBar.RelationOperators',
	fields: ['display', 'id'],
	data : [
		{display: "is", id: '=' },
		{display: "is not", id: '!='}
	]
});