
Ext.define('TYPO3.Vidi.Components.Grid.Columns.IconColumn', {
	extend: 'Ext.grid.column.Column',
	alias: ['widget.iconColumn'],
	menuDisabled: true,
	sortable: false,
	hideable: false,
	resizable: false,
	flex: false,
	defaultWidth: '24',
	maxWidth: '30',

	
	constructor: function(cfg) {
		this.callParent(arguments);
	},
	renderer: function(value) {
		return value;
	}

});