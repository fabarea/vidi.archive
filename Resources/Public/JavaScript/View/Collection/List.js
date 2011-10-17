
var TYPO3VidiViewCollectionListrowTemplate = new Ext.XTemplate(
	'<div class="t3-vidi-filterManager"><ul><tpl for=".">',
		'<li><strong>{title}</strong>',
			'<tpl if="description !== \'\'><br />{description}</tpl>',
		'</li>',
	'</tpl></ul></div>'
);

Ext.define('TYPO3.Vidi.View.Collection.List', {
	extend: 'Ext.view.View',
	alias: 'widget.TYPO3-Vidi-View-Collection-List',
	id: 'TYPO3-Vidi-View-Collection-List',
	tpl: TYPO3VidiViewCollectionListrowTemplate,
	itemSelector: 'li',
	disableSelection: false,
	multiSelect: true,
	singleSelect: true,
	emptyText: 'no Collection available',
	constructor: function() {
		this.store = Ext.create('Ext.data.Store', {
			model: 'TYPO3.Vidi.Model.Collection',
			storeId: 'TYPO3.Vidi.Stores.Collection',
			groupField: 'public',
			groupDir: 'ASC',
			autoLoad: false,
			listeners: {
				beforeLoad: function()  {
					this.proxy.extraParams.moduleCode = TYPO3.TYPO3.Core.Registry.get('vidi/moduleCode');
					this.proxy.extraParams.currentTable = TYPO3.TYPO3.Core.Registry.get('vidi/currentTable');
				}
			}
		});
		this.callParent();
	},
	listeners: {
		itemClick: function(view, filter, element, index, event) {
			if(event.ctrlKey == false) {
				//Ext.ComponentManager.get('TYPO3-VIDI-FilterBar').add()
			}
		},
		selectionchange: function(selectionModel, elements, event) {
			var listInstance = selectionModel.view;
			var parentPanel = listInstance.up('TYPO3-Vidi-View-Collection-ListPanel');

			if (elements.length == 1) {
				parentPanel.down('button[action=edit]').setDisabled(false);
			} else {
				parentPanel.down('button[action=edit]').setDisabled(true);
			}
			
			if (elements.length >= 1) {
				parentPanel.down('button[action=delete]').setDisabled(false);
			} else {
				parentPanel.down('button[action=delete]').setDisabled(true);
			}
		}
	}
});

