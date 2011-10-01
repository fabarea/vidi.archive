
Ext.define('TYPO3.Vidi.View.Filter.ListPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.TYPO3-Vidi-View-Filter-ListPanel',
	title: 'Stored-Filters',
	layout: 'fit',
	width: 250,
	items: [
		{xtype: 'TYPO3-Vidi-View-Filter-List'}
	],
	bbar: [
		{xtype: 'button', scale: 'small', text: 'Create From Current Filter'}
	]
});