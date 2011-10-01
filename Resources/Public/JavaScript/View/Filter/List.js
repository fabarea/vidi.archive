
var rowTemplate = new Ext.XTemplate(
	'<tpl for=".">',
		'<div style="margin-bottom: 10px;" class="thumb-wrap">',
			'<h3>{name}</h3>',
			'<p>{description}</p>',
		'</div>',
	'</tpl>'
);

Ext.define('TYPO3.Vidi.View.Filter.List', {
	extend: 'Ext.view.View',
	alias: 'widget.TYPO3-Vidi-View-Filter-List',
	tpl: rowTemplate,
	itemSelector: 'div.thumb-wrap',
	emptyText: 'no filters available',
	constructor: function() {
		this.store = Ext.create('Ext.data.Store', {
			model: 'TYPO3.Vidi.Model.Filter',
			autoLoad:true,
			listeners: {
				beforeLoad: function()  { console.log('filter before load');
					this.proxy.extraParams.moduleCode = TYPO3.TYPO3.Core.Registry.get('vidi/moduleCode');
					this.proxy.extraParams.currentTable = TYPO3.TYPO3.Core.Registry.get('vidi/currentTable');
				}
			}
		});
		this.callParent();
	},
	listeners: {
		itemClick: function(view, filter, element, index, event) {
			Ext.ComponentManager.get('TYPO3-VIDI-FilterBar').load(filter.get('criteria'));
		},
		itemDblClick: function(view, filter, element, index, event) {

		}
	}
});

