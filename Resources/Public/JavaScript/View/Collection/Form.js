Ext.define('TYPO3.Vidi.View.Collection.Form', {
	extend: 'Ext.window.Window',
	alias : 'widget.collectionEdit',

	title : 'Collection',
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

						/** @TODO rewrite to activeTab **/
						var ftCmp = Ext.ComponentManager.get('TYPO3-Vidi-View-Collection-ListPanel').getActiveTab();
						if (ftCmp.store.indexOf(form.getRecord()) == -1) {
							ftCmp.store.add(form.getRecord());
						}
						ftCmp.refresh();
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