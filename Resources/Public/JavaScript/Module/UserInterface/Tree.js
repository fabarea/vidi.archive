
Ext.define('TYPO3.Vidi.Module.UserInterface.Tree', {
	alias: 'widget.TYPO3.Vidi.Module.UserInterface.Tree',
	extend: 'Ext.tree.Panel',
	rootVisible: false,
	useArrows: true,
	root: {
		id: '0',
		text: '--root--',
		expanded: true
	},
	constructor: function(config) {
		this.root.id = config.rootUid;
		this.store = Ext.create('Ext.data.TreeStore', {
			proxy: {
				type: 'direct',
				directFn: eval(config.directFn)
			}
		});
		this.callParent([config]);
	}
});