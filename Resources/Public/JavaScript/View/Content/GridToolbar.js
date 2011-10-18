

Ext.define('TYPO3.Vidi.View.Content.GridToolbar', {
	extend: 'Ext.toolbar.Paging',
	alias: 'widget.Vidi-GridToolbar',
	prependButtons: true,
	displayInfo: false,
	items: [
		{
			xtype: 'button',
			action: 'edit selected records',
			iconCls: 't3-icon t3-icon-actions t3-icon-actions-document t3-icon-document-open',
			text: 'edit',
			handler: function() {
				var selected = this.up('gridpanel').getSelectionModel().getSelection();
				var linkConfig  ={edit: {}};
				linkConfig.edit[TYPO3.TYPO3.Core.Registry.get('vidi/currentTable')] = {};
				Ext.each(selected, function(record) {
					linkConfig.edit[TYPO3.TYPO3.Core.Registry.get('vidi/currentTable')][record.get('uid')] = 'edit';
				});
				Ext.create(
						'TYPO3.Vidi.Components.Overlay',
						'alt_doc.php?' + Ext.Object.toQueryString(linkConfig, true),
						'editContentRecord'
					);
			}
		},
		{
			xtype: 'button',
			action: 'delete',
			iconCls: 't3-icon t3-icon-actions t3-icon-actions-edit t3-icon-edit-delete',
			text: 'delete selected records',
			handler: function() {
				this.up('gridpanel').getSelectionModel().selectAll();
			}
		},
		{
			xtype: 'button',
			action: 'createCollection',
			iconCls: 't3-icon t3-icon-actions t3-icon-actions-document t3-icon-document-save-new',
			text: 'Save Collection',
			handler: function() {
			}
		},
		{
			xtype: 'button',
			action: 'exportCollection',
			iconCls: 't3-icon t3-icon-actions t3-icon-actions-document t3-icon-document-save-new',
			text: 'Export Collection',
			handler: function() {
			},
			arrowAlign: 'right',
			menu      : [
				{text: 'CSV'}, {text: 'XML'}, {text: 'SQL'}
			]
		},
		'->',
		{xtype: 'thumbnailColumnResizer'}
	]
});