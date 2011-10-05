
Ext.namespace('TYPO3.Vidi');

TYPO3.Vidi.RecordPicker = {
	show: function(type, mode, allowed, objectId) {
		this.openContainerWindow(
				'recordpicker',
				'RecordPicker',
				{
					width: 600,
					height: 400
				},
				'mod.php?M=user_VidiVidiM1' +
					'&tx_vidi_user_vidividim1%5Baction%5D=browse' +
					'&tx_vidi_user_vidividim1%5Ballowed%5D=' + allowed +
					'&tx_vidi_user_vidividim1%5BcallbackMethod%5D=TYPO3.Vidi.RecordPicker.' + (type === 'inline' ? 'callbackTypeInline' : 'callbackTypeGroup') +
					'&tx_vidi_user_vidividim1%5BobjectId%5D=' + objectId
		)
	},

	callbackTypeInline: function(objectId, table, uid, label) {
		inline.importElement(objectId, table, uid, 'db');
	},

	callbackTypeGroup: function(objectId, table, uid, label) {
		setFormValueFromBrowseWin(objectId, uid, label, false);
	},

	/*
	 * Open a window with container iframe
	 * code taken from EXT:rtehtmlarea htmlarea.js
	 *
	 * @param	string		buttonId: the id of the button
	 * @param	string		title: the window title (will be localized here)
	 * @param	object		dimensions: the opening dimensions od the window
	 * @param	string		url: the url to load ino the iframe
	 *
	 * @ return	void
	 */
	openContainerWindow: function (buttonId, title, dimensions, url) {
		var dialog = new Ext.Window({
			id: 'tx_vidi_recordpicker_' + buttonId,
			title: /*this.localize(title) || */title,
			cls: 'htmlarea-window',
			width: dimensions.width,
			border: false,
			// resizable: true,
			// iconCls: this.getButton(buttonId).iconCls,
			listeners: {
				afterrender: {
					fn: this.onContainerResize
				},
				resize: {
					fn: this.onContainerResize
				}/*,
				close: {
					fn: this.onClose,
					scope: this
				}*/
			},
			items: {
					// The content iframe
				xtype: 'box',
				height: dimensions.height-20,
				itemId: 'content-iframe',
				autoEl: {
					tag: 'iframe',
					cls: 'content-iframe',
					src: url
				}
			}
		});
		dialog.show();
	},
	/*
	 * Handler invoked when the container window is rendered or resized in order to resize the content iframe to maximum size
	 * code taken from EXT:rtehtmlarea htmlarea.js
	 */
	onContainerResize: function (panel) {
		var iframe = panel.getComponent('content-iframe');
		if (iframe.rendered) {
			iframe.getEl().setSize(panel.getInnerWidth(), panel.getInnerHeight());
		}
	}
};

