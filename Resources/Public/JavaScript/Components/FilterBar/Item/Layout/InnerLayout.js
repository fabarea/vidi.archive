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
		onLayout: function() {
		},
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
