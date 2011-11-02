
Ext.define('TYPO3.Vidi.Components.ClickableIcon', {
	extend: 'Ext.toolbar.Item',
	alias: 'widget.clickableIcon',
	tpl: '<span id="{id}" class="{iconCls}">&#160;</span>',
	initComponent: function() {
		this.data = {
			id: this.id,
			iconCls: this.iconCls
		};
		this.handler = this.handler || Ext.emptyFn;
		this.callParent(arguments);
	},
	listeners: {
		afterRender: function(ct, position) {
			this.el.on('click', this.handler, this);
		}
	}
});