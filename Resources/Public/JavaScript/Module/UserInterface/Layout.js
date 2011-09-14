Ext.ns("TYPO3.Vidi.Module.UserInterface");

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

define(['Vidi/Core/Application', 'Vidi/Core/Registry', 'Vidi/Module/UserInterface/DocHeader'], function(Application, Registry) {
	
	/**
	 * @class TYPO3.Vidi.Module.UserInterface.DocHeader
	 * 
	 * The outermost user interface component.
	 * 
	 * @namespace TYPO3.Vidi.Module.UserInterface
	 * @extends Ext.Viewport
	 */
	TYPO3.Vidi.Module.UserInterface.Layout = Ext.extend(Ext.Viewport, {

		initComponent: function() {

			var config = {
				renderTo: 'typo3-mod-php',
				layout:'border',
				defaults: {
					collapsible: false,
					split: true,
					bodyStyle: 'padding:15px'
				},
				cls: 'typo3-fullDoc',
				items: [
					this._docHeader,
					{
						/*
						 * CENTER PANEL
						 */
						xtype: 'panel',
						region:'center',
						margins: '0',
						padding: '0',
						bodyPadding: 0,
						layout: 'fit',
						items: this._getItems()
					}
				]
			};

			Ext.apply(this, config);
			TYPO3.Vidi.Module.UserInterface.Layout.superclass.initComponent.call(this);
		},
		
		/**
		 * default items
		 * @private
		 */
		_docHeader: {
			region: 'north',
			xtype: 'TYPO3.Vidi.Module.UserInterface.DocHeader',
			ref: '../../docHeader'
		},
		
		/**
		 * @private
		 * @return {Array} an array items, fetched from the registry.
		 */
		_getItems: function() {
			var items, config;
			
			items = [];
			
			config = Registry.get('layout');
			Ext.each(config, function(item) {
				items.push(item);
			}, this);
			
			return items;
		}

	});
});

