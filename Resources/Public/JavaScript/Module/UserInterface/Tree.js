Ext.ns('TYPO3.Vidi.Module.UserInterface.Tree');

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
				directFn: eval(config.directFn),
				extraParams: {
					tree: config.treeIndex,
					moduleCode: TYPO3.TYPO3.Core.Registry.get('vidi/moduleCode')
				}
			}
		});
		this.callParent([config]);
	},
	listeners: {
		itemclick: function(tree, record) {
			tree.up('TYPO3-Vidi-Module-ContentBrowser-TreeRegion').addFilterToQuery(tree.ownerCt.treeIndex, record);
		},
		viewready: function() {
			var
				me = this,
				treeView = me.view;
			Ext.create('TYPO3.Vidi.View.Tree.GridDataDropZone', {view: treeView, ddGroup: 'GridData'});
		}
	}
});