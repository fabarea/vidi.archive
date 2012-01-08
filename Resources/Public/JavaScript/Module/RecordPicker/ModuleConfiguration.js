
TYPO3.TYPO3.Core.Registry.set('vidi/mainModule/collectionManagement/enabled', false, 99);
TYPO3.TYPO3.Core.Registry.set('vidi/mainModule/filterBar/hidden', true, 99);
TYPO3.TYPO3.Core.Registry.set('vidi/docheader/enabled', false, 99);

TYPO3.Vidi.Application.on('TYPO3.Vidi.Application.run', function() {
	var grid = Ext.ComponentManager.get('TYPO3-Vidi-Module-Grid');
	grid.down('gridview').on('itemclick', function(gridview, item, row, rowId, event) {
		if (event.target.attributes.class.nodeValue.indexOf('row-checker') == -1) {
			gridview.up('gridpanel').getSelectionModel().select(item);
			Ext.ComponentManager.get('TYPO3-Vidi-RecordPicker-useSelectionButton').handler();
		}
	});
});