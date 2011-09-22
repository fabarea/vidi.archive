

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

	Ext.ns('TYPO3.Vidi.Components.FilterBar.Item.Relation');
	
		// Define a store which has all available Operators
	TYPO3.Vidi.Components.FilterBar.Item.Relation.Operators = Ext.create('Ext.data.Store', {
		fields: ['display', 'id'],
		data : [
			{display: "is", id: '=' },
			{display: "is not", id: '!='}
		]
	});

	/**
	 * @class TYPO3.Vidi.Components.FilterBar.Item.Relation
	 *
	 * A concrete implementation of a FilterBar Item, for Filtering via Relation
	 *
	 * @namespace TYPO3.Vidi.Components.FilterBar.Relation
	 * @extends TYPO3.Vidi.Components.FilterBar.Item
	 */
	Ext.define('TYPO3.Vidi.Components.FilterBar.Item.Relation', {
		extend: 'TYPO3.Vidi.Components.FilterBar.Item',
		alias: 'widget.filterBar-Item-Relation',
		componentCls: 'vidi-filterBar-Item-green',
		data: {record: '', operator: TYPO3.Vidi.Components.FilterBar.Item.Relation.Operators.findRecord('id', '=').data},
		displayItems: [
			{
				col: 'left',
				xtype: 'component',
				data: { operator: {}},
				tpl: '<strong>{operator.display} related to</strong>'
			},
			{
				col: 'right',
				xtype: 'component',
				data: { record: ''},
				tpl: '<strong>{record}</strong>'
		}],
		editItems: [
			{
				xtype: 'select',
				fieldLabel: 'Record',
				store: TYPO3.Vidi.Components.FilterBar.Item.Relation.Operators
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
				record : input.getValue(),
				operator: comboOp.store.findRecord('id', comboOp.getValue()).data
			}
		},
		updateInputs: function() {
			var input = this.items.getAt(1).items.getAt(1);
			var comboOp = this.items.getAt(1).items.getAt(0);

			input.setValue(this.data.record);
			comboOp.setValue(this.data.operator.id);
		},
		serialize: function() {
			return {type: 'relation', operator: this.data.operator.id, record: this.data.record.uid};
		}
	});
});