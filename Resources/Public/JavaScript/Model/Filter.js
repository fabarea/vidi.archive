
Ext.define('TYPO3.Vidi.Model.Filter', {
	extend: 'Ext.data.Model',
	idProperty: 'uid',
	fields: [
		{name: 'uid',			type: 'int'},
		{name: 'title',			type: 'string'},
		{name: 'description',	type: 'string'},
		{name: 'tableName', 	type: 'string', mapping: 'table_name'},
		{name: 'criteria',		type: 'string'}
	],
	validations: [
		{type: 'length',	field: 'name',	min:1}
	],
	proxy: {
		type: 'direct',
		api: {
			create: TYPO3.Vidi.Service.ExtDirect.Filter.create,
			read: TYPO3.Vidi.Service.ExtDirect.Filter.read,
			update: TYPO3.Vidi.Service.ExtDirect.Filter.update,
			destroy: TYPO3.Vidi.Service.ExtDirect.Filter.destroy
		},
		directFn: Ext.emptyFn,
		extraParams: {
			currentTable: '',
			moduleCode: ''
		},
		reader: {
			type: 'json',
			root: 'data',
			totalProperty: 'total'
		}
	}
});