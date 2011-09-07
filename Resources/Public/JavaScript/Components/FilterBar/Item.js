Ext.ns("TYPO3.Vidi.Components.FilterBar.Item");

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
define(['Vidi/Components/FilterBar/Item/Layout/ExtendedCardLayout', 'Vidi/Components/FilterBar/Item/Layout/InnerLayout'], function(Application) {

	Ext.define('TYPO3.Vidi.Components.FilterBar.Item', {
		extend: 'Ext.container.Container',
		alias: 'widget.filterBar.Item',
		baseCls: 'vidi-filterBar-Item',
		editMode: false,
		twoCols: {
			edit: false,
			display: true
		},
		editItems: [],
		displayItems: [],
		data: {
		},
		layout: 'filterBar-Item-ExtendedCardLayout',
		constructor: function(config) {
			config = config || {};
			Ext.apply(this, config);

			this.callParent(arguments);
			this.initConfig(config);

			if (config.editMode) {
				this.editMode = config.editMode;
			} else {
				this.editMode = true;
			}

			this.items.add(Ext.ComponentManager.create({
				xtype: 'container',
				defaultType: 'component',
				layout: {
					type: 'filterBar-Item-InnerLayout',
					twoCols: this.twoCols.display
				},
				id: this.id + '-card-display',
				items: this.displayItems
			}));

			this.items.add(Ext.ComponentManager.create({
				xtype: 'container',
				defaultType: 'component',
				id: this.id + '-card-edit',
				layout: {
					type: 'filterBar-Item-InnerLayout',
					twoCols: this.twoCols.edit
				},
				items: Ext.Array.merge(this.editItems, [{col: 'right', xtype: 'button', text: 'OK', handler: this.toggleEditingMode, scope: this}])
			}));
		},
		listeners: {
			afterRender: function() {
				var me = this;
				this.el.select('.removeButton').addListener('click', me.destroy, me, {stopEvent: true});
				this.el.addListener('click', Ext.emptyFn, this, {stopEvent: true});
				if (this.editMode) {
					this.editMode = !this.editMode;
					this.toggleEditingMode();
				}
			}
		},
		insertAfter: function() {
			this.ownerCt.insert(this.ownerCt.items.indexOf(this) + 1, Ext.widget('filterBar-Item-Fulltext'));
		},
		toggleEditingMode: function() {
			var me = this;
			if (me.editMode && me.isValid()) {
				me.applyData();
				me.refresh();
				me.quitEditing();
			} else {
				me.startEditing();
			}
		},
		quitEditing: function() {
			var me = this;
			me.getLayout().setActiveItem(0);
			me.el.removeCls(me.baseCls + '-editing');
			me.editMode = false;
		},
		startEditing: function() {
			var me = this;
			Ext.Array.each(me.ownerCt.items.items, function(obj) {if (obj != me) {obj.quitEditing();}});
			me.el.addCls(me.baseCls + '-editing');
			me.getLayout().setActiveItem(1);
			me.editMode = true;
		},
		newType: function(event, element, config) {
			var type = element.className;
			this.ownerCt.insert(this.ownerCt.items.indexOf(this) + 1, Ext.ComponentManager.create({xtype: 'filterBar-Item-' + type, editMode: true}));
			this.ownerCt.remove(this);
		},
		refresh: function() {
			var me = this;
			Ext.each(this.items.getAt(0).items.items, function(obj) {
				if (obj && obj.tpl) {
					obj.tpl.overwrite(obj.el, me.data);
				}
			});
		},
		isValid: function() {
			var errors = 0;
			Ext.each(this.items.getAt(1).items.items, function(obj) {
				if (obj && obj.isValid && !obj.isValid()) {
					errors += 1;
				}
			});
			return errors == 0;
		},
		applyData: Ext.emptyFn,
		serialize: Ext.emptyFn
	});
});