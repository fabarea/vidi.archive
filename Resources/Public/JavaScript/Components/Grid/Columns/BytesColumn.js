
Ext.define('TYPO3.Vidi.Components.Grid.Columns.BytesColumn', {
	extend: 'Ext.grid.column.Column',
	alias: ['widget.byteColumn'],
	requires: ['Ext.util.Format'],
	constructor: function(cfg) {
		this.callParent(arguments);
	},
	renderer: function(value) {
		var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
		var unitIndex = 0;
		while (value > 1024) {
			value /= 1024;
			unitIndex++;
		}

		return Ext.util.Format.number(value, '0.00/i') + " " + units[unitIndex];
	}

});