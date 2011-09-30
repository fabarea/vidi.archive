	// Define a store which has all available fields
Ext.create('Ext.data.Store', {
	fields: [{name: 'display', mapping: 'title'}, {name: 'id', mapping: 'name'}, 'type', 'relationTable', 'relationTitle'],
	storeId: 'TYPO3.Vidi.Stores.AvailableFieldsOfCurrentTable',
	idProperty: 'name',
	autoLoad: false,
	proxy: {
		type: 'direct',
		directFn: TYPO3.Vidi.Service.ExtDirect.GridData.getTableFields,
		extraParams: {
			'moduleCode': ''
		},
		reader: {
			type: 'json',
			root: 'data',
			totalProperty: 'total'
		}
	},
	listeners: {
		beforeLoad: function() {
			this.proxy.extraParams.moduleCode = TYPO3.TYPO3.Core.Registry.get('vidi/moduleCode');
		}
	},
	remoteFilter: false,
	remoteSort: false
});