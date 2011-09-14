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

define(['Vidi/Core/Application', 'Vidi/Module/ContentBrowser/ContentBrowserGrid', 'Vidi/Components/FilterBar'], function(Application) {

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
		extend: 'Ext.tab.Panel',
		
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
				xtype: 'tabpanel',
				bodyStyle: 'padding:15px',
				bodyPadding: 0,
				margins: 0,
				padding: 0,
				plain: true,
				collapsible: false,
				region: 'center',
				activeTab: 0,
				items: [{
					title: 'Tab 1',
					cls: 'inner-tab-custom', // custom styles in layout-browser.css
					layout: 'border',
						
					// Make sure IE can still calculate dimensions after a resize when the tab is not active.
					// With display mode, if the tab is rendered but hidden, IE will mess up the layout on show:
					hideMode: Ext.isIE ? 'offsets' : 'display',
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
						xtype: 'panel',
						region:'center',
						items: [{
							xtype: 'container',
							layout: 'auto',
							items: [{
								xtype: 'filterBar'
							}, {
								xtype: 'TYPO3.Vidi.Module.ContentBrowser.ContentBrowserGrid'
							}]
						}]
					}, {
						xtype: 'panel',
						region: 'west',
						collapsible: true,
						width: 200,
						items: {
							xtype: 'TYPO3.Vidi.Module.Concept.Tree'
						}
					}]
				}]
			};
		
			Ext.apply(this, config);
			TYPO3.Vidi.Module.ContentBrowser.ContentBrowserView.superclass.initComponent.call(this);
		}
	});
});
