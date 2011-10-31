
Ext.define('TYPO3.Vidi.Model.Filter', {
	extend: 'TYPO3.Vidi.Model.Collection',
	proxy: {
		type: 'direct',
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
	},
	statics :{
		getProxy: function() {
			this.proxy.api = {
				create: eval(TYPO3.TYPO3.Core.Registry.get('vidi/mainModule/collectionManagement/ExtDirectEndPoints/Filter') + '.create'),
				read: eval(TYPO3.TYPO3.Core.Registry.get('vidi/mainModule/collectionManagement/ExtDirectEndPoints/Filter') + '.read'),
				update: eval(TYPO3.TYPO3.Core.Registry.get('vidi/mainModule/collectionManagement/ExtDirectEndPoints/Filter') + '.update'),
				destroy: eval(TYPO3.TYPO3.Core.Registry.get('vidi/mainModule/collectionManagement/ExtDirectEndPoints/Filter') + '.destroy')
			};
			return this.proxy;
		}
	}
});