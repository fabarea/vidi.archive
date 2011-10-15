Ext.define('TYPO3.Vidi.View.Filter.Form', {
	extend: 'Ext.window.Window',
	alias : 'widget.filterEdit',

	title : 'Filter',
	layout: 'fit',
	modal: true,
	autoShow: true,

	initComponent: function() {
		this.items = [
			{
				xtype: 'form',
				pollForChanges: true,
				items: [
					{
						xtype: 'textfield',
						name : 'title',
						allowBlank: false,
						minLength: 4,
						fieldLabel: 'Title'
					},
					{
						xtype: 'textarea',
						grow      : false,
						name: 'description',
						fieldLabel: 'Beschreibung'
					}
				]
			}
		];

		this.buttons = [
			{
				text: 'Save',
				handler: function() {
					var window = this.up('window');
					var form = window.down('form');

					var invalid = false;
					Ext.each(form.items.items, function(field) {
						if (!field.validate()) {
							invalid = true;
						}
					});
					if (!invalid) {
						form.getRecord().set(form.getValues());
						form.getRecord().save();

						var ftCmp = Ext.ComponentManager.get('TYPO3-Vidi-View-Filter-List');
						if (ftCmp.store.indexOf(form.getRecord()) == -1) {
							Ext.ComponentManager.get('TYPO3-Vidi-View-Filter-List').store.add(form.getRecord());
						}
						Ext.ComponentManager.get('TYPO3-Vidi-View-Filter-List').refresh();
						window.close();
						window.destroy();

					}
				}
			},
			{
				text: 'Cancel',
				scope: this,
				handler: this.close
			}
		];

		this.callParent(arguments);
	}
});