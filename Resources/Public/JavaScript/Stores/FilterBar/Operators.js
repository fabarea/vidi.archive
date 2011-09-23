// Defining a store with all Operator Types
Ext.create('Ext.data.Store', {
	storeId: 'TYPO3.Vidi.Stores.FilterBar.Operators',
	fields: ['display', 'id'],
	data : [
		{ display: "AND", id: '&&' },
		{ display: "OR" , id: '||' }
	]
});