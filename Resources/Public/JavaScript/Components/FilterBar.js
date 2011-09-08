"use strict";

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

define(['Vidi/Core/Application', 'Vidi/Components/FilterBar/Item', 'Vidi/Components/FilterBar/Item/Fulltext',
		'Vidi/Components/FilterBar/Item/Operator' ,'Vidi/Components/FilterBar/Item/Category' ,
		'Vidi/Components/FilterBar/Item/Collection', 'Vidi/Components/FilterBar/Item/Field'
		], function(Application) {

	Ext.ns("TYPO3.Vidi.Components.FilterBar");

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

		/**
		 * A single item, or an array of child Components to be added to this container
		 * All Items should be ChildClasses of FilterBar.Item
		 *
		 * @cfg {Object/Object[]} items
		 */
		items: [{xtype: 'filterBar-Item-Fulltext'}
		],
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
			}
		}
	});
});

