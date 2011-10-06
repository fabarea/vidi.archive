
var rowTemplate = new Ext.XTemplate(
	'<tpl for=".">',
		'<div style="height:50%;" class="t3-vidi-filterManager">',
			'<tpl if="name == true"><h3>Public filters</h3></tpl>',
			'<tpl if="name == false"><h3>Private filters</h3></tpl>',
			'<ul>',
				'<tpl for="children">',
					'<li><strong>{name}</strong>',
						'<tpl if="description !== \'\'><br />{description}</tpl>',
					'</li>',
				'</tpl>',
			'</ul>',
		'</div>',
	'</tpl>'
);

Ext.define('TYPO3.Vidi.View.Filter.List', {
	extend: 'Ext.view.View',
	alias: 'widget.TYPO3-Vidi-View-Filter-List',
	id: 'TYPO3-Vidi-View-Filter-List',
	tpl: rowTemplate,
	itemSelector: 'li',
	disableSelection: false,
	multiSelect: true,
	singleSelect: true,
	emptyText: 'no filters available',
	constructor: function() {
		this.store = Ext.create('Ext.data.Store', {
			model: 'TYPO3.Vidi.Model.Filter',
			storeId: 'TYPO3.Vidi.Stores.Filters',
			groupField: 'public',
			groupDir: 'ASC',
			autoLoad:false,
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
		itemDblClick: function(view, filter, element, index, event) {
			Ext.ComponentManager.get('TYPO3-VIDI-FilterBar').load(filter.get('criteria'));
		},
		selectionchange: function(selectionModel, elements, event) {
			var listInstance = selectionModel.view;
			var parentPanel = listInstance.up('TYPO3-Vidi-View-Filter-ListPanel');

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
	},
	collectData : function(records, startIndex){
		var store = this.store;
		var groups =  store.getGroups();
		var r = [],
		i = 0,
		len = groups.length,
		record, group;

		for(; i < len; i++){
			group = groups[i];
			r[i] = {
				name: group.name,
				children: []
			};
			for (var j = 0; j < group.children.length; j++ ) {
				record = group.children[j];
				r[i].children[j] = this.prepareData(record[record.persistenceProperty], startIndex + i, record);
			}

		}
		return r;
	}
});

