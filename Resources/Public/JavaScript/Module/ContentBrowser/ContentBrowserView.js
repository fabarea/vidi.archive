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

define(['Vidi/Core/Application', 'Vidi/Module/ContentBrowser/ContentBrowserGrid', 'Vidi/Components/FilterBar', 'Vidi/Module/ContentBrowser/TreeRegion'], function(Application) {

	/**
	 * @class TYPO3.Vidi.Module.ContentBrowser.ContentBrowserView
	 * 
	 * The outermost user interface component.
	 * 
	 * @namespace TYPO3.Vidi.Module.ContentBrowser
	 * @extends Ext.Panel
	 */
	return Ext.define('TYPO3.Vidi.Module.ContentBrowser.ContentBrowserView', {
		
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
		alias: 'widget.TYPO3.Vidi.Module.ContentBrowser.ContentBrowserView',

		/**
		 * Initializer
		 */
		initComponent: function() {

			var config = {
				layout: 'border',
				region: 'center',
				items: [{
					/*
						 * RIGHT PANEL
						 */
					xtype: 'panel',
					collapsible: true,
					collapsed: true,
					region:'east',
					split: true,
					items: [{
						xtype: 'container',
						html: 'dummy text 1'
					}]
				}, {
					/*
						 * CENTER PANEL
						 */
					xtype: 'container',
					region: 'center',
					layout: 'border',
					items: [{
						xtype: 'filterBar',
						region: 'north'
					}, {
						xtype: 'container',
						region: 'center',
						layout: 'fit',
						items: {xtype: 'TYPO3.Vidi.Module.ContentBrowser.ContentBrowserGrid'}
					}]

				}, {
					xtype: 'TYPO3.Vidi.Module.ContentBrowser.TreeRegion'
				}]
			};
		
			Ext.apply(this, config);
			TYPO3.Vidi.Module.ContentBrowser.ContentBrowserView.superclass.initComponent.call(this);
		}
	});
});
