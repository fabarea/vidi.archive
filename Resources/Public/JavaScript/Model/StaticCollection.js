
Ext.define('TYPO3.Vidi.Model.StaticCollection', {
	extend: 'TYPO3.Vidi.Model.Collection',
	statics :{
		getProxy: function() {
			this.proxy.api = {
				create: eval(TYPO3.TYPO3.Core.Registry.get('vidi/mainModule/collectionManagement/ExtDirectEndPoints/Static') + '.create'),
				read: eval(TYPO3.TYPO3.Core.Registry.get('vidi/mainModule/collectionManagement/ExtDirectEndPoints/Static') + '.read'),
				update: eval(TYPO3.TYPO3.Core.Registry.get('vidi/mainModule/collectionManagement/ExtDirectEndPoints/Static') + '.update'),
				destroy: eval(TYPO3.TYPO3.Core.Registry.get('vidi/mainModule/collectionManagement/ExtDirectEndPoints/Static') + '.destroy')
			};
			return this.proxy;
		}
	}
});