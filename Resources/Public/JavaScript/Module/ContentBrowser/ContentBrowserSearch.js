"use strict";

Ext.ns("TYPO3.Vidi.Module.ContentBrowser");
	
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
define(['Vidi/Core/Application', 'Vidi/Components/FilterBar'], function(Application) {

	/**
	 * @class TYPO3.Vidi.Module.ContentBrowser.ContentBrowserSearch
	 * 
	 * The search element in the content browser view
	 * 
	 * @namespace TYPO3.Vidi.Module.ContentBrowser
	 * @extends Ext.Panel
	 */
	return Ext.define('TYPO3.Vidi.Module.ContentBrowser.ContentBrowserSearch', {
		
		/**
		 * The Component being extended
		 *
		 * @cfg {String}
		 */
		extend: 'Ext.container.Container',
		
		/**
		 * The store 
		 *
		 * @type {Object}
		 */
		alias: 'widget.TYPO3.Vidi.Module.ContentBrowser.ContentBrowserSearch',

		/**
		 * Initializer
		 */
		initComponent: function() {

			// Default configuration
			var config = {
				layout: 'auto',
				id: 'ContentBrowser-ContentBrowserSearch',
				items: [{
					xtype: 'filterBar'
				}, {
					xtype: 'button',
					text: 'Serialize',
					handler: function() {
					//	this.ownerCt.items.get(0).serialize();
					}
				}
				]
			};
		
			Ext.apply(this, config);
			TYPO3.Vidi.Module.ContentBrowser.ContentBrowserSearch.superclass.initComponent.call(this);
		}
	});
});
