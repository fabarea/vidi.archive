
Ext.define('TYPO3.Vidi.Components.Grid.Columns.ThumbnailColumn', {
	extend: 'Ext.grid.column.Column',
	alias: ['widget.thumbnailColumn'],
	align: 'center',
	constructor: function(cfg) {
		this.callParent(arguments);
	},
	renderer: function(value) {
		if (Ext.isArray(value)) {
			var content = '';
			Ext.Array.each(value, function(item) {
				content += '<img src="' + item + '" style="width:' + TYPO3.Vidi.Components.Grid.Columns.ThumbnailColumn.thumbnailWidth + 'px;height:auto;" alt="thumb" />';
			});
			return content;
		} else {
			return '';
		}
	},
	statics: {
		thumbnailWidth: 50
	}
});