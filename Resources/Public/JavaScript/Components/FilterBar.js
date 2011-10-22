/*
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
 * @class TYPO3.Vidi.Components.FilterBar
 *
 * A versatile filter Bar
 *
 * @namespace TYPO3.Vidi.Components
 * @extends Ext.container.Container
 */
Ext.define('TYPO3.Vidi.Components.FilterBar', {
	/**
	 * The Component being extended
	 *
	 * @cfg {String}
	*/
	extend: 'Ext.container.Container',

	/**
	 * The Alias of the Component - "xtype"
	 *
	 * @cfg {String}
	 */
	alias: 'widget.filterBar',

	/**
	 * The components css baseClass
	 *
	 * @cfg {String}
	 */
	baseCls: 'vidi-filterBar',

	presentable: true,
	
	store: null,
	/**
	 * A single item, or an array of child Components to be added to this container
	 * All Items should be ChildClasses of FilterBar.Item
	 *
	 * @cfg {Object/Object[]} items
	 */
	items: [],
	constructor: function() {
		if (TYPO3.TYPO3.Core.Registry.get('vidi/mainModule/filterBar/hidden') == true) {
			this.hidden = true;
		}
		this.callParent(arguments);
		this.store = Ext.create('Ext.data.Store', {
			storeId: 'TYPO3-Vidi-Stores-Filterbar-Elements',
			extend: 'Ext.data.Store',
			fields: [
				'xtype', 'title', 'id', 'unique'
			],
			buffered: true,
			pageSize: 20,
			idProperty: 'id',
			autoLoad: false,
			proxy: {
				type: 'direct',
				directFn: TYPO3.Vidi.Service.ExtDirect.FilterBar.getElements,
				extraParams: {
					moduleCode: ''
				},
				reader: {
					type: 'json',
					root: 'data',
					totalProperty: 'total'
				}
			},
			listeners: {
				beforeLoad: function() {
					console.log('test');
					this.proxy.extraParams.moduleCode = TYPO3.TYPO3.Core.Registry.get('vidi/moduleCode');
				}
			},
			remoteFilter: false,
			remoteSort: false
		});
		this.addEvents('VIDI_filterDataInBarChanged');
	},
	/**
	 * A config object containing one or more event handlers to be added to this object during initialization.
	 *
	 * @see http://docs.sencha.com/ext-js/4-0/#!/api/Ext.util.Observable-cfg-listeners
	 */
	listeners: {
		afterRender: function() {
				// when the FilterBar had been render attach a click handler to it
			this.el.addListener('click', function() {
				this.add(Ext.widget('filterBar-Item-Fulltext')); // add a Fulltext Label
			}, this, {stopEvent: true}); // action Scope is the FilterBar, event won't be bubbled to parent container
		},
		VIDI_filterDataInBarChanged: function() {
			var store = Ext.StoreManager.lookup('TYPO3.Vidi.Module.ContentBrowser.ContentBrowserStore');
			if (store != undefined) {
				store.getProxy().extraParams.query = this.serialize();
				store.load();
			}
		}
	},
	remove: function() {
		this.callParent(arguments);
		if (this.ownerCt != undefined && !this.suspendLayout) {
			this.ownerCt.doLayout();
		}
	},
	add: function() {
		var me = this;
		var newObject;
		if (arguments.length == 2) {
			newObject = arguments[1];
		} else {
			newObject = arguments[0];
		}
		Ext.each(this.items.items, function(item) {
			if (me._matchesUnique(item, newObject)) {
				me.remove(item);
			} 
		});

		this.callParent(arguments);
		
		if (!newObject.virgin && !newObject.editMode && !this.suspendLayout) {
			this.fireEvent('VIDI_filterDataInBarChanged');
		}
		if (me.ownerCt != undefined && !this.suspendLayout) {
			me.ownerCt.doLayout();
		}
	},
	serialize: function() {
		var items = [];
		for (var i = 0; i < this.items.length; i++) {
			items[i] = this.items.get(i).serialize();
		}
		return Ext.JSON.encode(items);
	},
	load: function(json) {
		var me = this;

		me.suspendLayout = true;
				
		me.removeAll();

		var objects = Ext.JSON.decode(json);
		Ext.Array.each(objects, function(object) {
			var type = "TYPO3.Vidi.Components.FilterBar.Item.";
			if (object.type) {
				switch(object.type) {
					case 'fulltext':
						type += 'Fulltext';
						break;
					case 'field':
						type += 'Field';
						break;
					case 'relation':
						type += 'Relation';
						break;
					case 'collection':
						type += 'Collection';
						break;
					case 'operator':
						type += 'Operator';
				}
				var filterTag = eval(type + ".unserialize")(object);
				filterTag.virgin = false;
				me.add(filterTag);
			}
		});

		me.suspendLayout = false;
		if (me.ownerCt != undefined) {
			me.ownerCt.doLayout();
		}

		this.fireEvent('VIDI_filterDataInBarChanged');
	},
	_matchesUnique: function(oldObject, newObject) {
		if (oldObject == undefined) return false;
		if (oldObject.getClassName == newObject.getClassName) {
			var elementInfo = this.store.findRecord('xtype', newObject.alias[0].replace('widget.', ''));
			if (elementInfo.data !== undefined && elementInfo.data.unique !== undefined) {
				if (Ext.isBoolean(elementInfo.data.unique)) {
					return elementInfo.data.unique == true;
				} else if (Ext.isObject(elementInfo.data.unique) &&
						oldObject.data.field !== undefined && oldObject.data.field.id !== undefined &&
						newObject.data.field !== undefined && newObject.data.field.id !== undefined &&
						oldObject.data.field.id == newObject.data.field.id &&
						(		oldObject.data.field.id == elementInfo.data.unique['*']
								|| oldObject.data.field.id ==  elementInfo.data.unique[TYPO3.TYPO3.Core.Registry.get('vidi/currentTable')]
						)
				) {
					return true;
				}
			}
		}
		return false;
	}
});