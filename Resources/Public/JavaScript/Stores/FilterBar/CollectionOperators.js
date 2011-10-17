	// Define a store which has all available Operators
Ext.create('Ext.data.Store', {
	storeId: 'TYPO3.Vidi.Stores.FilterBar.CollectionOperators',
	fields: ['display', 'id'],
	data : [
		{ display: "in", id: '=' },
		{ display: "not in", id: '!=' }
	]
});
