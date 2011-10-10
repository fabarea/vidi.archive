
Ext.define('TYPO3.Vidi.Components.Grid.ThumbnailResizer', {
	extend: 'Ext.container.Container',
	alias: 'widget.thumbnailColumnResizer',
	//layout: 'hbox',
	items: [
		{
			xtype: 'slider',
			width: 60,
			increment: 5,
			minValue: 50,
			maxValue: 300,
			value: 50,
			listeners: {
				change: function(slider, newValue) {
					TYPO3.Vidi.Components.Grid.Columns.ThumbnailColumn.thumbnailWidth = newValue;
					this.up('gridpanel').down('gridview').refresh();
				}
			}
		}
	]
});