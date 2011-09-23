Ext.ns("TYPO3.Vidi.Components.FilterBar");

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
 * @class TYPO3.Vidi.Components.FilterBar.Item
 * @abstract
 *
 * A abstract base class for all types of filter labels within the filterbar
 *
 * @namespace TYPO3.Vidi.Components.FilterBar
 * @extends Ext.container.Container
 */
Ext.define('TYPO3.Vidi.Components.FilterBar.Item', {
	extend: 'Ext.container.Container',
	baseCls: 'vidi-filterBar-Item',
	/**
	 * Marks wether the component is in edit Mode
	 *
	 * @cfg {Boolean}
	 */
	editMode: false,

	/**
	 * Configuration object for display-style
	 * define for every mode (edit/display) wether it will be rendered one-column
	 * or with two-columns (and therefore different coloring)
	 *
	 * @cfg {Object}
	 */
	twoCols: {
		edit: false,
		display: true
	},

	/**
	 * A single item, or an array of child Components to be added to this container
	 * Components needed to edit filter-label go here
	 *
	 * @cfg {Object/Object[]} items
	 */
	editItems: [],

	/**
	 * A single item, or an array of child Components to be added to this container
	 * Components needed to display filter-label go here
	 *
	 * @cfg {Object/Object[]} items
	 */
	displayItems: [],

	/**
	 * shared data object
	 * The data, the filter-label holds is stored here,
	 * it's updated after every editing via applyData
	 *
	 * @cfg {Object}
	 */
	data: {
	},
	virgin: true,
	layout: 'filterBar-Item-ExtendedCardLayout',		// DO NOT CHANGE
	constructor: function(config) {
		config = config || {};
		Ext.apply(this, config);

		this.callParent(arguments);
		this.initConfig(config);

		if (config.editMode != undefined) {
			this.editMode = config.editMode;
		} else {
			this.editMode = true;
		}

			// add the card for Displaying the FilterLabel
		this.items.add(Ext.ComponentManager.create({
			xtype: 'container',
			defaultType: 'component',
			layout: {
				type: 'filterBar-Item-InnerLayout',
				twoCols: this.twoCols.display		// configure the layoutManager according to the settings
			},
			id: this.id + '-card-display',
			items: this.displayItems,	// add the items for Display,
		}));

			// add the card for editing the label
		this.items.add(Ext.ComponentManager.create({
			xtype: 'container',
			defaultType: 'component',
			id: this.id + '-card-edit',
			layout: {
				type: 'filterBar-Item-InnerLayout',
				twoCols: this.twoCols.edit
			},
				// add the Items for Editing mode, and always add the button, to exit the Editing Mode.
			items: Ext.Array.merge(this.editItems, [{col: 'right', xtype: 'button', text: 'OK', handler: this.toggleEditingMode, scope: this}]),
		}));
	},
	listeners: {
		afterRender: function() {
			var me = this;
				// register the action on the "close" button
			this.el.select('.removeButton').addListener('click', this.removeMyself, me, {stopEvent: true});
				// prevent a normal click anywhere within get's bubbled to the filterBar, because
				// this would create a new label within the filterbar on each click
			this.el.addListener('click', Ext.emptyFn, this, {stopEvent: true});

				// enter the mode we defined to be in, at start
			if (this.editMode) {
				this.editMode = !this.editMode;
				this.toggleEditingMode();
			}
		}
	},

	/**
	 * creates a new fulltext and inserts it between me and my successor
	 *
	 * @return void
	 */
	insertAfter: function() {
		this.ownerCt.insert(this.ownerCt.items.indexOf(this) + 1, Ext.widget('filterBar-Item-Fulltext'));
	},

	/**
	 * toggles the mode of the label between editing and displaying
	 *
	 * @return void
	 */
	toggleEditingMode: function() {
		var me = this;
		if (me.editMode) {
			me._quitEditing(true);
		} else {
			me._startEditing();
		}
	},

	/**
	 * Exits the editing mode
	 *
	 * takes care of updating data,
	 * refreshing the display mode
	 *
	 * @private
	 * @param boolean validate
	 * @return void
	 */
	_quitEditing: function(validate) {
		validate = validate || true;
		var me = this;
		var valid = me.isValid();

			// only update the display if the data is valid to prevent errors
		if (this.editMode && validate && valid) {
			me.applyData();
			me.refresh();
			me.virgin = false;
			me.ownerCt.fireEvent('VIDI_filterDataInBarChanged', me);
		}
			// close editing mode
		if (!validate || valid) {
			me.getLayout().setActiveItem(0);
			me.el.removeCls(me.baseCls + '-editing');
			me.editMode = false;
		}
	},

	/**
	 * switches the label to editing mode, also ensures that all other labels are turned back from editing mode
	 *
	 * @return void
	 */
	_startEditing: function() {
		var me = this;
		Ext.Array.each(me.ownerCt.items.items, function(obj) {if (obj != me) {obj._quitEditing(true);}});
		me.el.addCls(me.baseCls + '-editing');
		me.getLayout().setActiveItem(1);
		me.editMode = true;
	},

	/**
	 * EventHandler to process click on typeswitcher
	 * the elements class must name an existing itemtype
	 *
	 * @param event
	 * @param element
	 * @param config
	 * @return void
	 */
	_newType: function(event, element, config) {
		var type = element.className;
		this.ownerCt.insert(this.ownerCt.items.indexOf(this) + 1, Ext.ComponentManager.create({xtype: 'filterBar-Item-' + type, editMode: true}));
		this.ownerCt.remove(this);
	},

	/**
	 * updates the views with current data,
	 * call it after manually or programmatically changing label data
	 *
	 * @return void
	 */
	refresh: function() {
		var me = this;
		Ext.each(this.items.getAt(0).items.items, function(obj) {
			if (obj && obj.tpl) {
				if (typeof obj.tpl == 'object') {
					obj.tpl.overwrite(obj.el, me.data);
				} else {
					obj.data = me.data;
				}
			}
		});
	},

	/**
	 * checks wether the input in edit mode is correct
	 *
	 * @return boolean
	 */
	isValid: function() {
		var errors = 0;
		Ext.each(this.items.getAt(1).items.items, function(obj) {
			if (obj && obj.isValid && !obj.isValid()) { // check only existing object, which have declared isValid()
				errors += 1;
			}
		});
		return errors == 0;
	},

	/**
	 * updates the internal data object, with values from the input fields
	 * every label type has to implement this specifically
	 *
	 * @abstract
	 * @return void
	 */
	applyData: Ext.emptyFn,

	/**
	 * returns a serialized representation of the label
	 * every label type has to implement this specifically
	 *
	 * @abstract
	 */
	serialize: Ext.emptyFn,


	/**
	 * updates the input fields according to a programmatically data change
	 * every label type has to implent this specifically
	 */
	updateInputs: Ext.emptyFn,

	/**
	 * set's the data object with taking care of syncing the view
	 *
	 * @param option
	 * @param value
	 */
	setData: function(option, value) {
		this.data[option] = value;
		this.refresh();
		this.updateInputs();
	},
	removeMyself: function() {
		this.ownerCt.items.remove(this);
		this.destroy();
		if (!this.virgin) {
			this.ownerCt.fireEvent('VIDI_filterDataInBarChanged', this);
		}
	}
});