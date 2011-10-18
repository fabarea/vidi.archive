
Ext.define('TYPO3.Vidi.View.Collection.ListPanel', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.TYPO3-Vidi-View-Collection-ListPanel',
	id: 'TYPO3-Vidi-View-Collection-ListPanel',
	autoDestroy: false,
	deferredRender: false,
	collapsible: true,
	collapsed: false,
	title: 'Collection-Management',
	width: 250,
	items: [
		{
			xtype: 'TYPO3-Vidi-View-Filter-List',
			width: 250,
			tabConfig: {
				text: 'Filter',
				iconCls: 't3-icon t3-icon-actions t3-icon-actions-system t3-icon-system-tree-search-open'
			}
		},
		{
			xtype: 'TYPO3-Vidi-View-Collection-List',
			width: 250,
			title: 'Bar',
			tabConfig: {
				title: 'Bar',
				tooltip: 'test',
				text: 'Static',
				iconCls: 't3-icon t3-icon-apps t3-icon-apps-clipboard t3-icon-clipboard-list'
			}
		}
	],
	bbar: [
		{
			xtype: 'button',
			scale: 'small',
			text: 'create',
			iconCls: 't3-icon t3-icon-actions t3-icon-actions-edit t3-icon-edit-add',
			handler: function() {
				if (this.up('TYPO3-Vidi-View-Collection-ListPanel').getActiveTab().id == 'TYPO3-Vidi-View-Filter-List') {
					var newCollection = TYPO3.Vidi.Model.FilterCollection.create();
					newCollection.set('criteria', Ext.ComponentManager.get('TYPO3-VIDI-FilterBar').serialize());
				} else {
					var newCollection = TYPO3.Vidi.Model.StaticCollection.create();
					var selectedRecords = Ext.ComponentManager.get('TYPO3-Vidi-Module-Grid').getSelectionModel().getSelection();
					var selectedIds = [];
					Ext.each(selectedRecords, function(record) {
						selectedIds.push(record.get('uid'));
					});
					newCollection.set('items', selectedIds);
				}

				newCollection.set('tableName', TYPO3.TYPO3.Core.Registry.get('vidi/currentTable'));
				var view = Ext.widget('collectionEdit');
				view.down('form').loadRecord(newCollection);
			}
		},
			'->',
		{
			xtype: 'button',
			scale: 'small',
			disabled:true,
			action: 'edit',
			iconCls: 't3-icon t3-icon-actions t3-icon-actions-document t3-icon-document-open',
			text: 'edit',
			handler: function() {
				var list = this.up('TYPO3-Vidi-View-Collection-ListPanel').getActiveTab();
				var selected = list.getSelectionModel().getSelection()[0];
				if (list.id == 'TYPO3-Vidi-View-Filter-List') {
					var view = Ext.widget('collectionEdit');
        			view.down('form').loadRecord(selected);
				} else {
					var linkConfig ={
								edit: {
									sys_collection: {
									}
								}
						};
					linkConfig.edit.sys_collection[selected.get('uid')] = 'edit';
					Ext.create(
						'TYPO3.Vidi.Components.Overlay',
						'alt_doc.php?' + Ext.Object.toQueryString(linkConfig, true),
						'collectionEdit' + selected.get('uid')
					);
				}

			}
		},
		{
			xtype: 'button',
			disabled:true,
			scale: 'small',
			action: 'delete',
			iconCls: 't3-icon t3-icon-actions t3-icon-actions-edit t3-icon-edit-delete',
			text: 'delete',
			handler: function() {
				var list = this.up('TYPO3-Vidi-View-Collection-ListPanel').getActiveTab();
				var selected = list.getSelectionModel().getSelection();
				Ext.each(selected, function(item) {
					list.store.remove(item);
					item.destroy();
				});
				list.refresh();
			}
		}
	]
});