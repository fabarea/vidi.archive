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
 * @class TYPO3.Vidi.Components.FilterBar.Item.Operator
 *
 * A concrete implementation of a FilterBar Item, implementing an logical operator
 * No Operator is equal to an AND operator, an OR operator takes higher associative preference as an AND
 *
 * @namespace TYPO3.Vidi.Components.FilterBar.Operator
 * @extends TYPO3.Vidi.Components.FilterBar.Item
 */
Ext.define('TYPO3.Vidi.Components.FilterBar.Item.Operator', {
	extend: 'TYPO3.Vidi.Components.FilterBar.Item',
	alias: 'widget.filterBar-Item-Operator',
	componentCls: 'vidi-filterBar-Item-gray',
	twoCols: {
		edit: false,
		display: false
	},
	data: { operator: {}},
	displayItems: [
		{
			xtype: 'component',
			data: { operator: {}},
			tpl: '<strong>{operator.display}</strong>'
		}
	],
	editItems: [
		{
			xtype: 'select',
			fieldLabel: 'Select Operator',
			store: 'TYPO3.Vidi.Stores.FilterBar.Operators'
		}
	],
	applyData: function() {
		var combobox = this.items.getAt(1).items.getAt(0);
		this.data = {
			operator : combobox.store.findRecord('id', combobox.getValue()).data
		};
	},
	serialize: function() {
		return {type: 'operator', value: this.data.operator.id};
	},
	updateInputs: function() {
		var combobox = this.items.getAt(1).items.getAt(0);
		combobox.setValue(this.data.operator.id);
	},
	statics: {
		unserialize: function(data) {
			var tag = Ext.create('TYPO3.Vidi.Components.FilterBar.Item.Operator',{
				editMode: false,
				virgin: false
			});
			tag.data.operator = Ext.StoreManager.get('TYPO3.Vidi.Stores.FilterBar.Operators').findRecord('id', data.value).data;
			tag.refresh();
			tag.updateInputs();
			return tag;
		}
	}
});
