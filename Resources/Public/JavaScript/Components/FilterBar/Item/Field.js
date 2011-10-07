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
	data: {field: {}, operator: {}, search: {}},
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
		data: { search: {}},
		tpl: '<strong>{search.title}</strong>'
	}],
	editItems: [
		{
			xtype: 'select',
			store: 'TYPO3.Vidi.Stores.AvailableFieldsOfCurrentTable',
			listeners: {
				select: function(field, current) {
					field.up('.filterBar-Item-Field')._selectColumn(current[0], field);
				}
			}
		},
		{
			xtype: 'select',
			queryMode: 'local',
			typeAhead:true,
			store: 'TYPO3.Vidi.Stores.FilterBar.FieldOperators'
		},{
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
				triggerCls: "",
				hidden: true
		},
		{
			xtype: 'textfield',
			name: 'searchstring',
			allowBlank: false,
			disabled: true,
			validator: function(value) {
				if (this.regex == undefined || this.disabled) return true;
				if (this.regex.test(value)) {
					return true
				} else {
					return 'error';
				}
			}
	}],
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
		var input = this.items.getAt(1).items.getAt(3);
		var comboRecord = this.items.getAt(1).items.getAt(2);
		var comboField = this.items.getAt(1).items.getAt(0);
		var comboOp = this.items.getAt(1).items.getAt(1);

		var field = comboField.store.findRecord('id', comboField.getValue()).data;
		var search;
		if (field.type == 'relation') {
			search = comboRecord.store.findRecord('uid', comboRecord.getValue()).data;
		} else {
			search = {title: input.getValue(), uid: input.getValue()};
		}
		this.data = {
			search : search,
			operator: comboOp.store.findRecord('id', comboOp.getValue()).data,
			field: field
		}
	},
	updateInputs: function() {
			var input = this.items.getAt(1).items.getAt(3);
			var comboRecord = this.items.getAt(1).items.getAt(2);
			var comboField = this.items.getAt(1).items.getAt(0);
			var comboOp = this.items.getAt(1).items.getAt(1);

			comboField.select(this.data.field.id);
			this._selectColumn(comboField.store.findRecord('id', this.data.field.id), comboField);

			comboOp.select(this.data.operator.id);

			if (this.data.field.type == 'relation') {

				input.hide();
				comboRecord.show();
				input.setDisabled(true);
				comboRecord.setDisabled(false);

				comboRecord.select(this.data.search.uid);
				comboRecord.setValue(this.data.search.uid);
			} else {
				input.show();
				comboRecord.hide();
				input.setDisabled(false);
				comboRecord.setDisabled(true);

				input.setValue(this.data.search.uid);
			}

		},
	serialize: function() {
		return {
			type: 'field',
			operator: this.data.operator.id,
			search: this.data.search.uid,
			field: this.data.field.id,
			relatedTable: this.data.field.relationTable
		};
	},
	_selectColumn: function(currentRecord, selectBox) {
		var type = currentRecord.get('type');
		var operatorField = selectBox.ownerCt.items.getAt(1);
		var inputField = selectBox.ownerCt.items.getAt(3);
		var recordField = selectBox.ownerCt.items.getAt(2);

		operatorField.store.clearFilter();
		operatorField.store.filter([{filterFn: function(item) {
			return Ext.Array.contains(item.get('types'), type);
		}}]);
		operatorField.clearValue();
		operatorField.clearInvalid();
		if (operatorField.el) {
			operatorField.getPicker();
			operatorField.picker.refresh();
		}


		recordField.setDisabled(false);
		inputField.setDisabled(false);

		if (type == 'relation') {
			inputField.hide();
			recordField.show();
			inputField.setDisabled(true);
			recordField.setDisabled(false);

			recordField.clearValue();
			recordField.clearInvalid();

			this.relationStore.getProxy().extraParams.relationColum = currentRecord.get('id');
			this.relationStore.getProxy().extraParams.relationTable = currentRecord.get('relationTable');

		} else {
			inputField.show();
			recordField.hide();
			inputField.setDisabled(false);
			recordField.setDisabled(true);


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
					inputField.regex = /^$/;
					break;
				case 'string':
				default:
					inputField.regex = undefined;
					break;
			}
			inputField.clearInvalid();
			inputField.validate();
		}
	},
	statics: {
		unserialize: function(data) {
			var tag = Ext.create('TYPO3.Vidi.Components.FilterBar.Item.Field',{
				editMode: false
			});
			return tag;
		}
	}
});
