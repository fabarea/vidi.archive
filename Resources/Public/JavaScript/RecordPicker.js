
// register in outer frame "top"
top.Ext.ns('TYPO3.Vidi');

top.TYPO3.Vidi.RecordPicker = {
	show: function(type, mode, allowed, objectId) {
		this.openContainerWindow(
				'recordpicker',
				'RecordPicker',
				{
					width: 600,
					height: 400
				},
				'mod.php?M=recordPicker' +
					'&tx_vidi_recordpicker%5Bconfig%5D=' + allowed +
					'&tx_vidi_recordpicker%5BcallbackMethod%5D=top.TYPO3.Vidi.RecordPicker.' + (type === 'inline' ? 'callbackTypeInline' : 'callbackTypeGroup') +
					'&tx_vidi_recordpicker%5BobjectId%5D=' + objectId
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
		var dialog = Ext.create('Ext.window.Window', {
			id: 'tx_vidi_recordpicker_' + buttonId,
			title: /*this.localize(title) || */title,
			cls: 'htmlarea-window',
			width: dimensions.width,
			height: dimensions.height,
			autoShow: true,
			layout: 'fit',
			//iconCls: '',
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
	}
};

