
Ext.define('TYPO3.Vidi.Module.RecordPicker.SelectFilesToolbar', {
	extend: 'Ext.toolbar.Paging',
	alias: 'widget.TYPO3-Vidi-RecordPicker-SelectFilesToolbar',
	prependButtons: true,
	displayInfo: false,
	constructor: function(cfg) {
		this.items = [
			{
				xtype: 'button',
				action :'use',
				text: 'Auswahl übernehmen',
				handler: this.useSelection
			},
			"->"
		];
		this.callParent([cfg]);
	},
	afterRender: function() {
		this.callParent(arguments);
		this.down('button[action=use]').setHandler(this.useSelection);
	},
	useSelection: function() {
		var selected = this.up('gridpanel').getSelectionModel().getSelection();
		Ext.each(selected, function(file) {
			console.log(file.data.uid);
			if (file.raw.uid) {
				callback('sys_file', file.raw.uid, file.raw.name);
			} else {
				// TODO create ExtDirect call for indexing file, and returning uid
			}
		});
	}
});

TYPO3.TYPO3.Core.Registry.set('vidi/mainModule/gridToolbar', 'TYPO3-Vidi-RecordPicker-SelectFilesToolbar', 99);