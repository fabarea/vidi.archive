Ext.ns('TYPO3.Vidi.Components.FilterBar.Item.Relation');
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
		data: {relation: {}, record: '', operator: {}},
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
				data: { record: '', relation: ''},
				tpl: '<strong>{relation.relationTitle} / {record.title}</strong>'
		}],
		editItems: [
			{
				xtype: 'select',
				fieldLabel: 'Relation',
				store: 'TYPO3.Vidi.Stores.AvailableRelations',
				listeners: {
					select: function(selectbox, currentRecords) {
						var selected = currentRecords[0];
						console.log(selectbox);
						selectbox.up('.filterBar-Item-Relation').relationStore.getProxy().extraParams.relationColum = selected.get('id');
						selectbox.up('.filterBar-Item-Relation').relationStore.getProxy().extraParams.relationTable = selected.get('relationTable');
						selectbox.ownerCt.items.getAt(2).setDisabled(false);
					}
				}
			},
			{
				xtype: 'select',
				fieldLabel: 'Record',
				store: 'TYPO3.Vidi.Stores.FilterBar.RelationOperators'
			},
			{
				xtype: 'combobox',
				name: 'searchstring',
				allowBlank: false,
				forceSelection:true,
				queryMode: 'remote',
				typeAhead: true,
				disabled: true,
				hideTrigger:true,
				queryDelay:50,
				minChars:1,
				displayField: 'title',
				valueField: 'uid',
				triggerCls: ""
		}],
		relationStore: null,
		constructor: function() {
			this.relationStore = Ext.create('Ext.data.Store', {
				fields: [{name: 'title', type: 'string'}, {name: 'uid', type: 'int'}],
				autoLoad: true,
				proxy: {
					type: 'direct',
					directFn: TYPO3.Vidi.Service.ExtDirect.GridData.getRelatedRecords,
					extraParams: {
						'moduleCode': '',
						'relationTable': '',
						'relationColum': '',
						'query': ''
					},
					reader: {
						type: 'json',
						root: 'data',
						totalProperty: 'total'
					}
				},
				listeners: {
					beforeLoad: function() {
						this.proxy.extraParams.moduleCode = TYPO3.TYPO3.Core.Registry.get('vidi/moduleCode');
					}
				}
			});
			this.editItems[2].store = this.relationStore;
			this.callParent(arguments);
		},
		applyData: function() {
			var relatedRecordSelector = this.items.getAt(1).items.getAt(2);
			var operatorSelector = this.items.getAt(1).items.getAt(1);
			var relationSelector = this.items.getAt(1).items.getAt(0);

			this.data = {
				record : relatedRecordSelector.store.findRecord('uid', relatedRecordSelector.getValue()).data,
				operator: operatorSelector.store.findRecord('id', operatorSelector.getValue()).data,
				relation : relationSelector.store.findRecord('id', relationSelector.getValue()).data
			}
			console.log(this.data);
		},
		updateInputs: function() {
			var relatedRecordSelector = this.items.getAt(1).items.getAt(2);
			var operatorSelector = this.items.getAt(1).items.getAt(1);
			var relationSelector = this.items.getAt(1).items.getAt(0);

			relationSelector.select(this.data.relation.id);
			operatorSelector.select(this.data.operator.id);
			relatedRecordSelector.select(this.data.record.uid);
		},
		serialize: function() {
			return {
				type: 'relation',
				operator: this.data.operator.id,
				relationTable: this.data.relation.relationTable,
				relationColumn: this.data.relation.id,
				record: this.data.record.uid
			};
		}
	});