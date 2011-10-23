
Ext.define('TYPO3.Vidi.View.Tree.GridDataDropZone', {
	extend: 'Ext.tree.ViewDropZone',
	appendOnly: true,
	handleNodeDrop : function(data, targetNode, position) {
		var me = this,
			view = me.view,
			parentNode = targetNode.parentNode,
			store = view.getStore(),
			recordDomNodes = [],
			records, i, len,
			insertionMethod, argList,
			needTargetExpand,
			transferData,
			processDrop;

		// Cancel any pending expand operation
		me.cancelExpand();

		Ext.each(data.records, function(record) {
			TYPO3.Vidi.Service.ExtDirect.DragAndDrop.DropGridRecordOnTree(
					TYPO3.TYPO3.Core.Registry.get('vidi/moduleCode'),
					TYPO3.TYPO3.Core.Registry.get('vidi/currentTable'),
					record.data,
					view.ownerCt.treeIndex,
					targetNode.data,
					false
			);
			data.view.store.load();
		});
	}
});