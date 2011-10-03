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
                        name : 'name',
						allowBlank: false,
						minLength: 4,
                        fieldLabel: 'Title'
				    },
                    {
                        xtype: 'textarea',
						grow      : false,
                        name: 'description',
                        fieldLabel: 'Beschreibung'
                    },
					{
                        xtype: 'checkboxfield',
                        name : 'public',
						fieldLabel: 'share the filter',
                        boxLabel: 'public',
						inputValue: '1'
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
						Ext.getStoreManager('TYPO3.Vidi.Stores.Filter').sync();
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