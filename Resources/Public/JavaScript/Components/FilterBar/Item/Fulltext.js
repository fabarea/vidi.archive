Ext.ns('TYPO3.Vidi.Components.FilterBar.Item.Fulltext');

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
 * @class TYPO3.Vidi.Components.FilterBar.Item.Fulltext
 *
 * A concrete implementation of a FilterBar Item, for Filtering via a fulltext search within all textfields
 *
 * @namespace TYPO3.Vidi.Components.FilterBar.Fulltext
 * @extends TYPO3.Vidi.Components.FilterBar.Item
 */
Ext.define('TYPO3.Vidi.Components.FilterBar.Item.Fulltext', {
	extend: 'TYPO3.Vidi.Components.FilterBar.Item',
	alias: 'widget.filterBar-Item-Fulltext',
	componentCls: 'vidi-filterBar-Item-blue',

	twoCols: {
		edit: false,
		display: false
	},
	displayItems: [{
					   xtype: 'component',
					   data: { string: ''},
					   tpl: '<strong>{string}</strong>'
				   }],
	editItems: [{
					xtype: 'textfield',
					name: 'searchstring',
					allowBlank: false,
					fieldLabel: 'Fulltext'
				}],
	applyData: function() {
		var input = this.items.getAt(1).items.getAt(0);
		this.data = {
			string : input.getValue()
		}
	},
	serialize: function() {
		return {type: 'fulltext', string: this.data.string};
	},
	updateInputs: function() {
		var input = this.items.getAt(1).items.getAt(0);
		input.setValue(this.data.string);
	},
	statics: {
		unserialize: function(data) {
			var tag = Ext.create('TYPO3.Vidi.Components.FilterBar.Item.Fulltext',{
				editMode: false
			});
			tag.data.string = data.string;
			tag.refresh();
			tag.updateInputs();
			return tag;
		}
	}
});