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
		},
		itemcontextmenu : function(view, record, item, index, e, eOpts) {
			var
				me = this;

			if (TYPO3.Vidi.contextMenu == undefined) {
				TYPO3.Vidi.contextMenu = Ext.create('TYPO3.Vidi.Components.ContextMenu');
			}
			TYPO3.Vidi.Service.ExtDirect.ContextMenu.getActionsForNodeArray(
				TYPO3.TYPO3.Core.Registry.get('vidi/moduleCode'),
				TYPO3.TYPO3.Core.Registry.get('vidi/treeConfig')[me.treeIndex]['table'],
				record.data,
				function(configuration) {
					TYPO3.Vidi.contextMenu.removeAll();
					TYPO3.Vidi.contextMenu.fill(record, this, configuration);

					if (TYPO3.Vidi.contextMenu.items.length) {
						TYPO3.Vidi.contextMenu.showAt(e.getXY());
					}
				},
				this
			);
			e.stopEvent();
		}
	}
});