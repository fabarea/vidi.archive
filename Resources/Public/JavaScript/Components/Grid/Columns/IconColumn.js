
Ext.define('TYPO3.Vidi.Components.Grid.Columns.Icon', {
	extend: 'Ext.grid.column.Column',
	alias: ['widget.iconColumn'],

	constructor: function(cfg) {
		this.callParent(arguments);
	},
	renderer: function(value) {
		return value;
	}
});