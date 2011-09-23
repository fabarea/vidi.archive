Ext.ns('TYPO3.Vidi.Components.FilterBar.Item.Layout.ExtendedCardLayout');

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
 * @class TYPO3.Vidi.Components.FilterBar.Item.Layout.ExtendedCardLayout
 *
 * extends a card-layout to create a cleaner html output.
 * Additionally adds a typeswitcher and a click-sensitive area to the Element.
 *
 * @namespace TYPO3.Vidi.Components.FilterBar.Field.Layout.ExtendedCardLayout
 * @extends Ext.layout.container.Card
 */
Ext.define('TYPO3.Vidi.Components.FilterBar.Item.Layout.ExtendedCardLayout', {
	extend: 'Ext.layout.container.Card',
	alias: 'layout.filterBar-Item-ExtendedCardLayout',
	beforeLayout: function() {
		this.callParent(arguments);

		if(!this.typeMenu) {
			this.typeMenu = this.getRenderTarget().createChild({
				tag: 'ul',
				id: this.getRenderTarget().id + "-typeswitcher",
				children: [
					{tag: 'li', id: this.getRenderTarget().id + "-typeswitcher-Fulltext", cls: 'Fulltext', html: 'Fulltext', title: 'Fulltext'},
					{tag: 'li', id: this.getRenderTarget().id + "-typeswitcher-Field", cls: 'Field', html: 'Field', title: 'Field'},
					{tag: 'li', id: this.getRenderTarget().id + "-typeswitcher-Relation", cls: 'Relation', html: 'Relation', title: 'Relation'},
					{tag: 'li', id: this.getRenderTarget().id + "-typeswitcher-Operator", cls: 'Operator', html: 'Operator', title: 'Operator'},
					{tag: 'li', id: this.getRenderTarget().id + "-typeswitcher-Collection", cls: 'Collection', html: 'Collection', title: 'Collection'}
				]
			});
			this.typeMenu.select('li').addListener('click', this.owner._newType, this.owner, {stopEvent: true});
		}
		if(!this.adderArea) {
			this.adderArea = this.getRenderTarget().createChild({
				id: this.getRenderTarget().id + "-addAfter",
				cls: 'addAfter',
				html: '&nbsp;'
			});
			this.adderArea.addListener('click', this.owner.insertAfter, this.owner, {stopEvent: true});
		}
	},

	/**
	 * adds the registration of the click-to-edit handler after creating the display card
	 *
	 * @override
	 * @param item
	 * @param target
	 * @param position
	 */
	renderItem : function(item, target, position) {
		if (!item.rendered) {
			this.callParent(arguments);
			if(item.id.substr(item.id.length - 7) == 'display') {
				item.el.addListener('click', this.owner.toggleEditingMode, this.owner, {stopEvent: true});
			}
			item.ownerCt = this.owner;
		}
	},
	/**
	 * make sure, that the items are not getting any pixel height and width set,
	 * even if the parent containers LayoutManager requests to
	 *
	 * @override
	 *
	 */
	setItemSize: Ext.emptyFn		// this is really needed and not only a dummy.
});