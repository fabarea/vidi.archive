

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

	Ext.ns('TYPO3.Vidi.Components.FilterBar.Item.Category');
	
		// Define a store which has all available Operators
	TYPO3.Vidi.Components.FilterBar.Item.Category.Operators = Ext.create('Ext.data.Store', {
		fields: ['display', 'id'],
		data : [
			{ display: "is", id: 'is' }
		]
	});

	/**
	 * @class TYPO3.Vidi.Components.FilterBar.Item.Category
	 *
	 * A concrete implementation of a FilterBar Item, for Filtering via Category
	 *
	 * @namespace TYPO3.Vidi.Components.FilterBar.Category
	 * @extends TYPO3.Vidi.Components.FilterBar.Item
	 */
	Ext.define('TYPO3.Vidi.Components.FilterBar.Item.Category', {
		extend: 'TYPO3.Vidi.Components.FilterBar.Item',
		alias: 'widget.filterBar-Item-Category',
		componentCls: 'vidi-filterBar-Item-green',
		data: {string: '', operator: TYPO3.Vidi.Components.FilterBar.Item.Category.Operators.findRecord('id', 'is').data},
		displayItems: [
			{
				col: 'left',
				xtype: 'component',
				data: { operator: {}},
				tpl: '<strong>Category {operator.display}</strong>'
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
				fieldLabel: 'Category',
				store: TYPO3.Vidi.Components.FilterBar.Item.Category.Operators
			},
			{
				xtype: 'textfield',
				name: 'searchstring',
				allowBlank: false
		}],
		applyData: function() {
			var input = this.items.getAt(1).items.getAt(1);
			var comboOp = this.items.getAt(1).items.getAt(0);

			this.data = {
				string : input.getValue(),
				operator: comboOp.store.findRecord('id', comboOp.getValue()).data
			}
		},
		updateInputs: function() {
			var input = this.items.getAt(1).items.getAt(1);
			var comboOp = this.items.getAt(1).items.getAt(0);

			input.setValue(this.data.string);
			comboOp.setValue(this.data.operator.id);
		}
	});
});