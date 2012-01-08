
Ext.define('TYPO3.Vidi.Components.Grid.Columns.ThumbnailColumn', {
	extend: 'Ext.grid.column.Column',
	alias: ['widget.thumbnailColumn'],
	align: 'center',
	minWidth: 70,
	constructor: function(cfg) {
		this.callParent(arguments);
	},
	renderer: function(value, container, record, row, column) {
		if (record.data.type !== undefined && record.data.type !== 2 || value == '') {
			return '';
		}
		if (this.columns[column].isVisible() == false) {
			return '';
		}
		if (!Ext.isArray(value)) {
			value = [value];
		}
		var content = '';
		Ext.Array.each(value, function(item) {
			content += '<img src="thumbs.php?file=' + item + '&md5sum=' + record.data.checksum + '&size=' + TYPO3.Vidi.Components.Grid.Columns.ThumbnailColumn.thumbnailWidth + '" style="width:' + TYPO3.Vidi.Components.Grid.Columns.ThumbnailColumn.thumbnailWidth + 'px;height:auto;" alt="Loading Thumbnail ..." />';
		});
		container.style = {padding: 0};
		return content;
	},
	statics: {
		thumbnailWidth: 50
	}
});