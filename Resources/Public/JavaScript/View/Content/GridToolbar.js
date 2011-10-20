

Ext.define('TYPO3.Vidi.View.Content.GridToolbar', {
	extend: 'Ext.toolbar.Paging',
	alias: 'widget.Vidi-GridToolbar',
	prependButtons: true,
	displayInfo: false,
	items: [
		{
			xtype: 'button',
			iconCls: 't3-icon t3-icon-actions t3-icon-actions-document t3-icon-document-open',
			text: 'edit',
			action: 'edit'
		},
		{
			xtype: 'button',
			action: 'delete',
			iconCls: 't3-icon t3-icon-actions t3-icon-actions-edit t3-icon-edit-delete',
			text: 'delete selected records'
		},
		'->',
		{xtype: 'thumbnailColumnResizer'}
	],
	afterRender: function() {
		this.callParent(arguments);
		this.down('button[action=edit]').setHandler(this.editRecord);
		this.down('button[action=delete]').setHandler(this.deleteRecord);
	},
	editRecord: function() {
		var me = this;
		var selected = me.up('gridpanel').getSelectionModel().getSelection();
			var linkConfig  ={edit: {}};
			linkConfig.edit[TYPO3.TYPO3.Core.Registry.get('vidi/currentTable')] = {};
			Ext.each(selected, function(record) {
				linkConfig.edit[TYPO3.TYPO3.Core.Registry.get('vidi/currentTable')][record.get('uid')] = 'edit';
			});
			Ext.create(
				'TYPO3.Vidi.Components.Overlay',
				'alt_doc.php?' + Ext.Object.toQueryString(linkConfig, true),
				'editContentRecord',
				function() {me.refreshGrid();}
			);
	},
	deleteRecord: function() {
		
	},
	refreshGrid: function() {
		var store = Ext.ComponentManager.get('TYPO3-Vidi-Module-Grid').store;
		store.loadPage(store.currentPage);
	}
});