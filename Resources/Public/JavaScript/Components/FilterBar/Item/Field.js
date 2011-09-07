

/*                                                                        *
 * This script is part of the TYPO3 project.                              *
 *                                                                        *
 * It is free software; you can redistribute it and/or modify it under    *
 * the terms of the GNU General Public License as published by the Free   *
 * Software Foundation, either version 3 of the License, or (at your      *
 * option) any later version.                                             *
 *                                                                        *
 * This script is distributed in the hope that it will be useful, but     *
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHAN-    *
 * TABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General      *
 * Public License for more details.                                       *
 *                                                                        *
 * You should have received a copy of the GNU General Public License      *
 * along with the script.                                                 *
 * If not, see http://www.gnu.org/licenses/gpl.html                       *
 *                                                                        *
 * The TYPO3 project - inspiring people to share!                         *
 *                                                                        */
define(['Vidi/Components/FilterBar/Item', 'Vidi/Components/FilterBar/Item/SelectBox'], function(Application) {

	Ext.ns('TYPO3.Vidi.Components.FilterBar.Item.Field');
	
	TYPO3.Vidi.Components.FilterBar.Item.Field.Operators = Ext.create('Ext.data.Store', {
		fields: ['display', 'id'],
		data : [
			{ display: "contains", id: 'l' },
			{ display: "contains not", id: '!l' },
			{ display: "equals" , id: '=' },
			{ display: "equals not" , id: '!=' }
		]
	});

	TYPO3.Vidi.Components.FilterBar.Item.Field.Fields = Ext.create('Ext.data.Store', {
		fields: ['display', 'id'],
		data : [
			{ display: "Title", id: 'title' },
			{ display: "Description", id: 'desc' },
			{ display: "Teaser" , id: 'sdesc' }
		]
	});

	Ext.define('TYPO3.Vidi.Components.FilterBar.Item.Field', {
		extend: 'TYPO3.Vidi.Components.FilterBar.Item',
		alias: 'widget.filterBar-Item-Field',
		componentCls: 'vidi-filterBar-Item-orange',
		displayItems: [
			{
				col: 'left',
				xtype: 'component',
				data: {field: {}, operator: {}},
				tpl: '<strong>{field.display} {operator.display}</strong>'
			},
			{
			col: 'right',
			xtype: 'component',
			data: { string: ''},
			tpl: '<strong>{string}</strong>'
		}],
		editItems: [
			{
				xtype: 'select',
				store: TYPO3.Vidi.Components.FilterBar.Item.Field.Fields
			},
			{
				xtype: 'select',
				store: TYPO3.Vidi.Components.FilterBar.Item.Field.Operators
			},
			{
				xtype: 'textfield',
				name: 'searchstring',
				allowBlank: false
		}],
		applyData: function() {
			var input = this.items.getAt(1).items.getAt(2);
			var comboField = this.items.getAt(1).items.getAt(0);
			var comboOp = this.items.getAt(1).items.getAt(1);

			this.data = {
				string : input.getValue(),
				operator: comboOp.store.findRecord('id', comboOp.getValue()).data,
				field: comboField.store.findRecord('id', comboField.getValue()).data
			}
		}
	});
});