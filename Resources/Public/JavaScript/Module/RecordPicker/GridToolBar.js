
Ext.define('TYPO3.Vidi.Module.RecordPicker.SelectFilesToolbar', {
	extend: 'Ext.toolbar.Paging',
	alias: 'widget.TYPO3-Vidi-RecordPicker-SelectFilesToolbar',
	prependButtons: true,
	displayInfo: false,
	constructor: function(cfg) {
		this.items = [
			"->"
		];
		this.callParent([cfg]);
	},
	afterRender: function() {
		this.callParent(arguments);
	},

});

TYPO3.TYPO3.Core.Registry.set('vidi/mainModule/gridToolbar', 'TYPO3-Vidi-RecordPicker-SelectFilesToolbar', 99);