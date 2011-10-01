Ext.create('Ext.data.Store', {
	fields: [{name: 'display', mapping: 'title'}, {name: 'id', mapping: 'column'}, 'relationTable', 'relationTitle'],
	storeId: 'TYPO3.Vidi.Stores.AvailableRelations',
	idProperty: 'column',
	autoLoad: false,
	proxy: {
		type: 'direct',
		directFn: TYPO3.Vidi.Service.ExtDirect.GridData.getTableRelationFields,
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
