Ext.ns('TYPO3.Vidi.Components.FilterBar.Item.Layout.InnerLayout');

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

define([], function(Application) {
	Ext.ns('TYPO3.Vidi.Components.FilterBar.Item.Layout.InnerLayout');

	/**
	 * @class TYPO3.Vidi.Components.FilterBar.Item.Layout.InnerLayout
	 *
	 * extends a container-layout, behaves like autolayout, but creates one or two columns depending on configuration
	 * Items added to this container will get checked for attribute "col", to be "left" or "right" and be created within
	 * the correct column. If no configuration is given, right column will be default
	 *
	 * @namespace TYPO3.Vidi.Components.FilterBar.Field.Layout.InnerLayout
	 * @extends Ext.layout.container.Container'
	 */
	Ext.define('TYPO3.Vidi.Components.FilterBar.Item.Layout.InnerLayout', {
		extend: 'Ext.layout.container.Container',
		type: 'filterBar-Item-InnerLayout',
		alias: 'layout.filterBar-Item-InnerLayout',
		targetCls: 'vidi-filterBar-Item-InnerLayout',
		leftContainer : null,
		closeButton: null,
		twoCols: false,
		configureItem: function(item) {
			this.callParent(arguments);

				// Auto layout does not manage any dimensions.
			item.layoutManagedHeight = 2;
			item.layoutManagedWidth = 2;
		},

		/**
		 * before layouting create the container's for the columns (if needed) and the close-button,
		 * so it can be filled with "items" afterwards.
		 *
		 * @override
		 */
		beforeLayout: function() {
			if (this.twoCols && !this.leftContainer) {
				this.leftContainer = this.getRenderTarget().createChild({
					tag: 'div',
					cls: 'leftSide',
					role: 'presentation'
				});
			}
			if (!this.rightContainer ) {
				this.rightContainer = this.getRenderTarget().createChild({
					tag: 'div',
					cls: this.twoCols ? 'rightSide' : 'completeSide',
					role: 'presentation'
				 });
			}

			this.callParent(arguments);

			if (!this.closeButton) {
				this.closeButton = this.rightContainer.createChild({
					tag: 'span',
					cls: 'removeButton',
					html: 'x'
				});
			}

		},

		/**
		 * Just skip the normal Layouting stuff, as we don't need it.
		 *
		 * @override
		 */
		onLayout: Ext.emptyFn,
		
		/**
		 * renderItems functionality has to be adapted, as it's not rendered to the "given" target,
		 * but the column it has been configured for
		 *
		 * @override
		 * @param items
		 * @param target
		 */
		renderItems : function(items, target) {
			var ln = items.length,
					i = 0,
					item;

			for (; i < ln; i++) {
				item = items[i];
				if (item.col && item.col == 'left' && this.twoCols) {
					target = this.leftContainer;
				} else {
					target = this.rightContainer;
				}

				if (item && !item.rendered) {
					this.renderItem(item, target, i);
				}
				else if (!this.isValidParent(item, target, i)) {
					this.moveItem(item, target, i);
				}
			}
		}
	});
});
