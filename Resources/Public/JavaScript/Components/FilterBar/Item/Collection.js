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
 * @class TYPO3.Vidi.Components.FilterBar.Item.Collection
 *
 * A concrete implementation of a FilterBar Item, for Filtering via Collection
 *
 * @namespace TYPO3.Vidi.Components.FilterBar.Collection
 * @extends TYPO3.Vidi.Components.FilterBar.Item
 */
Ext.define('TYPO3.Vidi.Components.FilterBar.Item.Collection', {
	extend: 'TYPO3.Vidi.Components.FilterBar.Item',
	alias: 'widget.filterBar-Item-Collection',
	componentCls: 'vidi-filterBar-Item-brown',
	data: {field: {}, string: '', operator: {}},
	displayItems: [
		{
			col: 'left',
			xtype: 'component',
			data: {field: {}, operator: {}},
			tpl: '<strong>Collection {operator.display}</strong>'
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
			store: 'TYPO3.Vidi.Stores.FilterBar.CollectionOperators',
			fieldLabel: 'Selection'
		},
		{
			xtype: 'textfield',
			name: 'searchstring',
			allowBlank: false
	}],
	applyData: function() {
		var input   = this.items.getAt(1).items.getAt(1);
		var comboOp = this.items.getAt(1).items.getAt(0);

		this.data = {
			string : input.getValue(),
			operator: comboOp.store.findRecord('id', comboOp.getValue()).data
		}
	},
	serialize: function() {
		return {type: 'collection', operator: this.data.operator.id, collection: '5'};
	}
});