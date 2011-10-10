
Ext.define('TYPO3.Vidi.Components.Grid.Columns.IconColumn', {
	extend: 'Ext.grid.column.Column',
	alias: ['widget.iconColumn'],
	menuDisabled: true,
	hideable: false,
	resizable: false,
	flex: false,
	minWidth: '16px',
	width: '20px',
	
	constructor: function(cfg) {
		this.callParent(arguments);
	},
	renderer: function(value) {
		return value;
	}

});