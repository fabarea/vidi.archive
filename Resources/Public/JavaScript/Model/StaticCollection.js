
Ext.define('TYPO3.Vidi.Model.StaticCollection', {
	extend: 'TYPO3.Vidi.Model.Collection',
	proxy: {
		type: 'direct',
		api: {
			create: TYPO3.Vidi.Service.ExtDirect.Filter.create,
			read: TYPO3.Vidi.Service.ExtDirect.Filter.read,
			update: TYPO3.Vidi.Service.ExtDirect.Filter.update,
			destroy: TYPO3.Vidi.Service.ExtDirect.Filter.destroy
		},
		directFn: Ext.emptyFn,
		extraParams: {
			currentTable: '',
			moduleCode: ''
		},
		reader: {
			type: 'json',
			root: 'data',
			totalProperty: 'total'
		}
	}
});