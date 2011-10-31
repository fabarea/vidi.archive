
Ext.define('TYPO3.Vidi.Model.Collection', {
	extend: 'Ext.data.Model',
	idProperty: 'uid',
	fields: [
		{name: 'uid',			type: 'int'},
		{name: 'title',			type: 'string'},
		{name: 'description',	type: 'string'},
		{name: 'tableName', 	type: 'string', mapping: 'table_name'},
		{name: 'criteria',		type: 'string'},
		{name: 'items',			type: 'auto'}
	],
	validations: [
		{type: 'length',	field: 'name',	min: 1}
	],
	proxy: {
		type: 'direct',
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