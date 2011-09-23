Ext.ns('TYPO3.Vidi.Components.FilterBar.Item');

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


/**
 * @class TYPO3.Vidi.Components.FilterBar.Item.Field
 *
 * A concrete implementation of a FilterBar Item, for Filtering via a Matcher of Field Vidi
 *
 * @namespace TYPO3.Vidi.Components.FilterBar.Field
 * @extends TYPO3.Vidi.Components.FilterBar.Item
 */
Ext.define('TYPO3.Vidi.Components.FilterBar.Item.Field', {
	extend: 'TYPO3.Vidi.Components.FilterBar.Item',
	alias: 'widget.filterBar-Item-Field',
	componentCls: 'vidi-filterBar-Item-orange',
	data: {field: {}, operator: {}, search: ''},
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
			store: 'TYPO3.Vidi.Stores.AvailableFieldsOfCurrentTable',
			listeners: {
				select: function(field, current) {
					var type = current[0].get('type');
					var operatorField = field.ownerCt.items.getAt(1);
					operatorField.store.clearFilter();
					operatorField.store.filter([{filterFn: function(item) {
						return Ext.Array.contains(item.get('types'), type);
					}}]);

					operatorField.getPicker();
					operatorField.picker.refresh();
					operatorField.clearValue();
					operatorField.clearInvalid();

					var inputField = field.ownerCt.items.getAt(2);
					switch (type) {
						case 'int':
							inputField.regex = /^[0-9]+$/;
							break;
						case 'float':
							inputField.regex = /^[0-9]*\.[0-9]+$/;
							break;
						case 'boolean':
							inputField.regex = /^(true|false|1|0)$/;
							break;
						case 'date':
							inputField.regex = /^()$/;
							break;
						case 'string':
						default:
							inputField.regex = undefined;
							break;
					}
					inputField.clearInvalid();
					inputField.validate();
				}
			}
		},
		{
			xtype: 'select',
			queryMode: 'local',
			store: 'TYPO3.Vidi.Stores.FilterBar.FieldOperators'
		},
		{
			xtype: 'textfield',
			name: 'searchstring',
			allowBlank: false,
			validator: function(value) {
				console.log(this.regex);
				if (this.regex == undefined) return true;
				if (this.regex.test(value)) {
					return true
				} else {
					return 'error';
				}
			}
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
	},
	serialize: function() {
		return {type: 'field', operator: this.data.operator.id, search: this.data.string, field: this.data.field.id};
	}
});
